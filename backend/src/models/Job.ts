import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract'],
      required: [true, 'Job type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    requirements: [{
      type: String,
    }],
    responsibilities: [{
      type: String,
    }],
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
jobSchema.index({ slug: 1 });
jobSchema.index({ isActive: 1, department: 1 });
jobSchema.index({ isActive: 1, location: 1 });

export const Job = mongoose.model<IJob>('Job', jobSchema);
