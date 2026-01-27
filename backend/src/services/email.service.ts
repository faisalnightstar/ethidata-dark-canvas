import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

// Create transporter (configure based on environment)
const createTransporter = () => {
  if (env.nodeEnv === 'development' && !env.smtp.host) {
    // Use ethereal for development if no SMTP configured
    return null;
  }

  return nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });
};

let transporter = createTransporter();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    if (!transporter) {
      console.log('[Email Service] No transporter configured, logging email:');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('---');
      return true;
    }

    await transporter.sendMail({
      from: env.smtp.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    return true;
  } catch (error) {
    console.error('[Email Service] Error sending email:', error);
    return false;
  }
};

// Email templates
export const emailTemplates = {
  contactConfirmation: (name: string) => ({
    subject: 'Thank you for contacting Ethidata',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Thank You for Reaching Out</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and appreciate you taking the time to contact us.</p>
        <p>Our team will review your inquiry and get back to you within 1-2 business days.</p>
        <p>Best regards,<br>The Ethidata Team</p>
      </div>
    `,
  }),

  contactNotification: (data: { name: string; email: string; company?: string; subject: string; message: string }) => ({
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          ${data.company ? `<tr><td><strong>Company:</strong></td><td>${data.company}</td></tr>` : ''}
          <tr><td><strong>Subject:</strong></td><td>${data.subject}</td></tr>
        </table>
        <h3>Message:</h3>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
      </div>
    `,
  }),

  applicationConfirmation: (name: string, jobTitle: string) => ({
    subject: `Application Received: ${jobTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Application Received</h2>
        <p>Hi ${name},</p>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Ethidata.</p>
        <p>We've received your application and our hiring team will review it carefully. If your qualifications match our requirements, we'll be in touch to schedule an interview.</p>
        <p>Best of luck,<br>The Ethidata Recruiting Team</p>
      </div>
    `,
  }),

  eventRegistrationConfirmation: (name: string, eventTitle: string, eventDate: string, eventTime: string) => ({
    subject: `Registration Confirmed: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Registration Confirmed!</h2>
        <p>Hi ${name},</p>
        <p>You're registered for <strong>${eventTitle}</strong>.</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Date:</strong> ${eventDate}</p>
          <p><strong>Time:</strong> ${eventTime}</p>
        </div>
        <p>We'll send you a reminder before the event.</p>
        <p>See you there!<br>The Ethidata Team</p>
      </div>
    `,
  }),

  resourceDownloadLink: (name: string | undefined, resourceTitle: string, downloadUrl: string) => ({
    subject: `Your Download: ${resourceTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Your Download is Ready</h2>
        ${name ? `<p>Hi ${name},</p>` : '<p>Hello,</p>'}
        <p>Thank you for your interest in <strong>${resourceTitle}</strong>.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Download Now</a>
        </p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The Ethidata Team</p>
      </div>
    `,
  }),
};
