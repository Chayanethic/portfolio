import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'gmail' or your specific SMTP host
      auth: {
        user: process.env.SMTP_EMAIL, // Your email address
        pass: process.env.SMTP_PASSWORD, // Your App Password (NOT your regular password)
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Sending to yourself
      replyTo: email, // So you can hit "Reply" directly to the client
      subject: `🚨 New Portfolio Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #111; color: #fff; border-radius: 10px;">
          <h2 style="color: #3b82f6;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <p><strong>Project Vision:</strong></p>
          <p style="background: #222; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}