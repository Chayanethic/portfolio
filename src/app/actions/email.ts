'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // 1. Safety Check: Verify environment variables exist
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error("❌ CRITICAL ERROR: GMAIL_USER or GMAIL_PASS is missing from .env.local");
    return { success: false, error: "Missing credentials" };
  }

  // 2. Configure Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // 3. Send the Email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Sends to yourself
      subject: `New Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email as string,
    });
    
    console.log("✅ Email transmitted successfully.");
    return { success: true };
    
  } catch (error) {
    console.error("❌ SMTP Error:", error);
    return { success: false };
  }
}