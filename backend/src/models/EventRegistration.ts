import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEventRegistration extends Document {
  eventId: Types.ObjectId;
  name: string;
  email: string;
  company?: string;
  createdAt: Date;
}

const eventRegistrationSchema = new Schema<IEventRegistration>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
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
    company: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
eventRegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });
eventRegistrationSchema.index({ email: 1 });

export const EventRegistration = mongoose.model<IEventRegistration>('EventRegistration', eventRegistrationSchema);
