import { Request, Response, NextFunction } from 'express';
import { Contact } from '../models/Contact.js';
import { sendEmail, emailTemplates } from '../services/email.service.js';
import { createError } from '../middleware/errorHandler.js';

// Submit contact form
export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, company, subject, message } = req.body;
    console.log("req.body", req.body);

    // Create contact submission
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      subject,
      message,
    });

    // Send confirmation email to user
    const userEmail = emailTemplates.contactConfirmation(name);
    sendEmail({
      to: email,
      subject: userEmail.subject,
      html: userEmail.html,
    });

    // Send notification email to team (if admin email configured)
    const teamEmail = emailTemplates.contactNotification({
      name,
      email,
      company,
      subject,
      message,
    });
    // You can configure a team email address in env
    sendEmail({ to: 'team@ethidata.com', ...teamEmail });

    res.status(201).json({
      success: true,
      data: {
        id: contact._id,
        message: 'Thank you for contacting us. We will get back to you soon!',
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// Get all contact submissions (admin)
export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query: Record<string, unknown> = {};
    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Contact.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update contact status (admin)
export const updateContactStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      throw createError('Invalid status', 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      throw createError('Contact not found', 404);
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
