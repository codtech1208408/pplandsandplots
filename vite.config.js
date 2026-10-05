import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

global.__ADMIN_OTP_STORE = global.__ADMIN_OTP_STORE || {};

function localApiPlugin() {
  return {
    name: 'local-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/send-reset-code' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              const { email } = JSON.parse(body || '{}');
              const smtpUser = process.env.SMTP_USER || 'pplp3008@gmail.com';
              const smtpPass = process.env.SMTP_PASSWORD || 'hdrh rvgr jits avtb';
              const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
              const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
              const smtpFrom = process.env.SMTP_FROM || `"PP LANDS & PLOTS" <${smtpUser}>`;

              const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
              const targetEmail = (email || smtpUser).trim().toLowerCase();

              global.__ADMIN_OTP_STORE[targetEmail] = {
                code: otpCode,
                expiresAt: Date.now() + 15 * 60 * 1000
              };

              const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                  user: smtpUser,
                  pass: smtpPass
                }
              });

              const htmlTemplate = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
                  <div style="background-color: #1e1b4b; padding: 24px; text-align: center; border-bottom: 1px solid #312e81;">
                    <h1 style="color: #f43f5e; margin: 0; font-size: 24px; font-weight: 800;">PP LANDS & PLOTS</h1>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Admin Portal Security</p>
                  </div>
                  <div style="padding: 32px 24px; text-align: center;">
                    <div style="display: inline-block; padding: 6px 14px; background-color: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 9999px; color: #fb7185; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">
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
                      This verification code is valid for <strong>15 minutes</strong>. If you did not request this code, please ignore this email.
                    </p>
                  </div>
                  <div style="background-color: #020617; padding: 16px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
                    &copy; ${new Date().getFullYear()} PP LANDS & PLOTS Admin Security.
                  </div>
                </div>
              `;

              await transporter.sendMail({
                from: smtpFrom,
                to: targetEmail,
                subject: `🔑 Admin Password Reset Code: ${otpCode} - PP LANDS & PLOTS`,
                html: htmlTemplate
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Reset code sent to email successfully!' }));
            } catch (err) {
              console.error('SMTP Error in Vite plugin:', err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message || 'SMTP Email sending failed' }));
            }
          });
          return;
        }

        if (req.url === '/api/verify-reset-code' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { email, code } = JSON.parse(body || '{}');
              const targetEmail = (email || 'pplp3008@gmail.com').trim().toLowerCase();
              const storedRecord = global.__ADMIN_OTP_STORE[targetEmail];

              if (storedRecord) {
                if (Date.now() > storedRecord.expiresAt) {
                  delete global.__ADMIN_OTP_STORE[targetEmail];
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, error: 'Verification code expired.' }));
                }
                if (storedRecord.code !== (code || '').trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, error: 'Invalid verification code.' }));
                }
                delete global.__ADMIN_OTP_STORE[targetEmail];
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Code verified successfully!' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  server: {
    port: 3000,
    host: true
  }
});
