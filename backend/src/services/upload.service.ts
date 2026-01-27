import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env.js';
import { createError } from '../middleware/errorHandler.js';

// Ensure upload directory exists
const uploadDir = path.resolve(process.cwd(), env.upload.uploadDir);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Resume upload directory
const resumeDir = path.join(uploadDir, 'resumes');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, resumeDir);
  },
  filename: (_req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// File filter for resumes
const resumeFileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(createError('Invalid file type. Only PDF, DOC, and DOCX files are allowed.', 400));
  }
};

// Resume upload middleware
export const uploadResume = multer({
  storage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: env.upload.maxFileSize, // 5MB default
  },
}).single('resume');

// Helper to get file URL
export const getFileUrl = (filename: string): string => {
  return `/uploads/resumes/${filename}`;
};

// Delete file helper
export const deleteFile = async (filepath: string): Promise<void> => {
  try {
    const fullPath = path.resolve(process.cwd(), filepath.replace(/^\//, ''));
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
