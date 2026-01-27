import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
  linkedIn?: string;
  status: 'new' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume is required'],
    },
    coverLetter: {
      type: String,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'interview', 'offer', 'rejected'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ email: 1 });
applicationSchema.index({ status: 1, createdAt: -1 });

export const Application = mongoose.model<IApplication>('Application', applicationSchema);
