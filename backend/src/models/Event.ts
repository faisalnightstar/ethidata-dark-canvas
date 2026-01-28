import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  type: 'webinar' | 'workshop' | 'conference';
  date: Date;
  time: string;
  duration: string;
  speakers: Array<{
    name: string;
    role: string;
    avatar?: string;
  }>;
  registrationUrl?: string;
  recordingUrl?: string;
  maxAttendees?: number;
  currentAttendees: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
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
      enum: ['webinar', 'workshop', 'conference'],
      required: [true, 'Event type is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    speakers: [{
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      avatar: String,
    }],
    registrationUrl: String,
    recordingUrl: String,
    maxAttendees: Number,
    currentAttendees: {
      type: Number,
      default: 0,
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
eventSchema.index({ isActive: 1, date: 1 });
eventSchema.index({ type: 1, isActive: 1 });

export const Event = mongoose.model<IEvent>('Event', eventSchema);
