import { Request, Response, NextFunction } from 'express';
import { Event } from '../models/Event.js';
import { EventRegistration } from '../models/EventRegistration.js';
import { sendEmail, emailTemplates } from '../services/email.service.js';
import { createError } from '../middleware/errorHandler.js';

// Get all events (public)
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type, upcoming } = req.query;

    const query: Record<string, unknown> = { isActive: true };

    if (type) {
      query.type = type;
    }

    // Filter by upcoming or past
    const now = new Date();
    if (upcoming === 'true') {
      query.date = { $gte: now };
    } else if (upcoming === 'false') {
      query.date = { $lt: now };
    }

    const events = await Event.find(query)
      .select('-__v')
      .sort({ date: upcoming === 'false' ? -1 : 1 });

    res.json({
      success: true,
      data: {
        events,
        filters: {
          types: ['webinar', 'workshop', 'conference'],
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get event by slug (public)
export const getEventBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug, isActive: true }).select('-__v');

    if (!event) {
      throw createError('Event not found', 404);
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// Register for event (public)
export const registerForEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, company } = req.body;

    // Check if event exists and is active
    const event = await Event.findById(id);
    if (!event || !event.isActive) {
      throw createError('Event not found or no longer accepting registrations', 404);
    }

    // Check if event is in the future
    if (new Date(event.date) < new Date()) {
      throw createError('This event has already passed', 400);
    }

    // Check capacity
    if (event.maxAttendees && event.currentAttendees >= event.maxAttendees) {
      throw createError('This event is at full capacity', 400);
    }

    // Check if already registered
    const existingRegistration = await EventRegistration.findOne({
      eventId: id,
      email,
    });
    if (existingRegistration) {
      throw createError('You are already registered for this event', 400);
    }

    // Create registration
    await EventRegistration.create({
      eventId: id,
      name,
      email,
      company,
    });

    // Update attendee count
    await Event.findByIdAndUpdate(id, {
      $inc: { currentAttendees: 1 },
    });

    // Send confirmation email
    const confirmationEmail = emailTemplates.eventRegistrationConfirmation(
      name,
      event.title,
      event.date.toLocaleDateString(),
      event.time
    );
    sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
    });

    res.status(201).json({
      success: true,
      data: {
        message: 'Successfully registered for the event!',
        eventTitle: event.title,
        eventDate: event.date,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Create event (admin)
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// Update event (admin)
export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      throw createError('Event not found', 404);
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// Delete event (admin)
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      throw createError('Event not found', 404);
    }

    // Also delete registrations
    await EventRegistration.deleteMany({ eventId: id });

    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get event registrations (admin)
export const getEventRegistrations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const registrations = await EventRegistration.find({ eventId: id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};
