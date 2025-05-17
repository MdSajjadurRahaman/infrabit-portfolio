import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

// Process contact form submission
export const contactSubmission = async (req, res) => {
  try {
    const { name, email, message, company, phone } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    
    // Save the contact form submission to database
    const newContact = new Contact({
      name,
      email,
      message,
      company,
      phone,
      status: 'new'
    });
    
    await newContact.save();
    
    // Create a nodemailer transporter (configure with actual email service in production)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Email content
    const mailOptions = {
      from: `InfraBit Contact Form <${process.env.EMAIL_FROM || 'contact@infrabit.io'}>`,
      to: process.env.EMAIL_TO || 'admin@infrabit.io',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        ${company ? `Company: ${company}\n` : ''}
        ${phone ? `Phone: ${phone}\n` : ''}
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Only send email if not in test mode
    if (process.env.NODE_ENV !== 'test') {
      await transporter.sendMail(mailOptions);
    }
    
    // Log submission
    console.log('Contact form submission:', { name, email, company, phone });
    
    // Send success response
    res.status(200).json({ 
      message: 'Thank you for your message! We will get back to you shortly.',
      success: true,
      contact: newContact,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing contact form', error: error.message });
  }
};

// Get all contact form submissions (for admin purposes)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact submissions', error: error.message });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact status', error: error.message });
  }
};
