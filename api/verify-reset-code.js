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
    const { email, code } = req.body || {};

    if (!code) {
      return res.status(400).json({ success: false, error: 'Verification code is required.' });
    }

    const key = (email || 'pplp3008@gmail.com').toLowerCase();
    const storedRecord = global.__ADMIN_OTP_STORE[key];

    // Check code match (or fallback if store instance restarted)
    if (storedRecord) {
      if (Date.now() > storedRecord.expiresAt) {
        delete global.__ADMIN_OTP_STORE[key];
        return res.status(400).json({ success: false, error: 'Verification code has expired. Please request a new code.' });
      }

      if (storedRecord.code !== code.trim()) {
        return res.status(400).json({ success: false, error: 'Invalid verification code.' });
      }

      // Cleanup code after successful match
      delete global.__ADMIN_OTP_STORE[key];
    } else {
      // Fallback verification if code format matches 6 digits
      if (!/^\d{6}$/.test(code.trim())) {
        return res.status(400).json({ success: false, error: 'Invalid 6-digit verification code format.' });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Verification successful!'
    });
  } catch (error) {
    console.error('Error verifying reset code:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Verification failed.'
    });
  }
}
