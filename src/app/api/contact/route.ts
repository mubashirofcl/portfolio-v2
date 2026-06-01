import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, projectType, budget, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpSecure = smtpPort === 465;
    
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const toEmail = process.env.TO_EMAIL || 'mubashirppofcl@gmail.com';

    // If credentials are not set, simulate a successful submission with a warning
    if (!emailUser || !emailPass) {
      console.warn('SMTP credentials (EMAIL_USER / EMAIL_PASS) are not configured. Simulating successful mail dispatch.');
      return NextResponse.json({
        success: true,
        message: 'Message received (Simulated send since SMTP credentials are not configured).'
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `Project Inquiry: ${projectType} (${name})`,
      text: `Hi Mubashir,\n\nYou have received a new project inquiry from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nEstimated Budget: ${budget}\n\nMessage:\n${message}\n\nBest regards,\nPortfolio System`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #ffffff; color: #333333;">
          <h2 style="color: #000000; background: #c8f542; padding: 15px; margin-top: 0; border-radius: 5px; text-align: center; font-size: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">New Project Inquiry</h2>
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Project Type:</strong> ${projectType}</p>
          <p style="margin: 10px 0;"><strong>Estimated Budget:</strong> ${budget}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px; line-height: 1.6; border: 1px solid #eee; color: #555555; margin-top: 5px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully.'
    });
  } catch (error) {
    console.error('Nodemailer sendMail failed:', error as Error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
