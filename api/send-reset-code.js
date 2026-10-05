import nodemailer from 'nodemailer';

// In-memory OTP store (shared across serverless instance lifecycles or fallback)
// For persistent verification across multiple function calls, we can store OTPs in memory or send directly
global.__ADMIN_OTP_STORE = global.__ADMIN_OTP_STORE || {};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email } = req.body || {};

    const smtpUser = process.env.SMTP_USER || 'pplp3008@gmail.com';
    const smtpPass = process.env.SMTP_PASSWORD || 'hdrh rvgr jits avtb';
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpFrom = process.env.SMTP_FROM || `"PP LANDS & PLOTS" <${smtpUser}>`;

    // Generate 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP code with 15 minute expiry
    global.__ADMIN_OTP_STORE[email?.toLowerCase()] = {
      code: otpCode,
      expiresAt: Date.now() + 15 * 60 * 1000
    };

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
        <div style="background-color: #1e1b4b; padding: 24px; text-align: center; border-bottom: 1px solid #312e81;">
          <h1 style="color: #f43f5e; margin: 0; font-size: 24px; font-weight: 800; tracking-tight: -0.05em;">PP LANDS & PLOTS</h1>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Admin Portal Security</p>
        </div>
        
        <div style="padding: 32px 24px; text-align: center;">
          <div style="display: inline-block; padding: 8px 16px; background-color: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 9999px; color: #fb7185; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">
            🔒 Password Reset Request
          </div>

          <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; margin-bottom: 12px;">Your Admin Verification Code</h2>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            You requested to reset your admin portal password for <strong>PP LANDS & PLOTS</strong>. Use the 6-digit verification code below:
          </p>

          <div style="background-color: #020617; border: 2px dashed #f43f5e; border-radius: 12px; padding: 20px; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #fb7185; display: inline-block; margin-bottom: 24px;">
            ${otpCode}
          </div>

          <p style="color: #94a3b8; font-size: 12px; margin-top: 16px;">
            This verification code is valid for <strong>15 minutes</strong>. If you did not request this code, please ignore this email or secure your account.
          </p>
        </div>

        <div style="background-color: #020617; padding: 16px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
          &copy; ${new Date().getFullYear()} PP LANDS & PLOTS Admin Security. All rights reserved.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: email || smtpUser,
      subject: `🔑 Admin Password Reset Code: ${otpCode} - PP LANDS & PLOTS`,
      html: htmlTemplate
    });

    return res.status(200).json({
      success: true,
      message: 'Verification code sent to email successfully!'
    });
  } catch (error) {
    console.error('Error sending reset email:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send verification email. Please check SMTP settings.'
    });
  }
}
