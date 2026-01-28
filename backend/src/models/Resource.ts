import mongoose, { Document, Schema } from 'mongoose';

export interface IResource extends Document {
  title: string;
  slug: string;
  description: string;
  type: 'whitepaper' | 'ebook' | 'template' | 'guide';
  fileUrl: string;
  thumbnailUrl?: string;
  isGated: boolean;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResourceDownload extends Document {
  resourceId: Schema.Types.ObjectId;
  email: string;
  name?: string;
  downloadedAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    type: {
      type: String,
      enum: ['whitepaper', 'ebook', 'template', 'guide'],
      required: [true, 'Resource type is required'],
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
    },
    thumbnailUrl: String,
    isGated: {
      type: Boolean,
      default: false,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const resourceDownloadSchema = new Schema<IResourceDownload>(
  {
    resourceId: {
      type: Schema.Types.ObjectId,
      ref: 'Resource',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Indexes
resourceSchema.index({ type: 1 });
resourceDownloadSchema.index({ resourceId: 1, email: 1 });
resourceDownloadSchema.index({ email: 1 });

export const Resource = mongoose.model<IResource>('Resource', resourceSchema);
export const ResourceDownload = mongoose.model<IResourceDownload>('ResourceDownload', resourceDownloadSchema);
