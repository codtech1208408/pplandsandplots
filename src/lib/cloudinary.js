/**
 * Helper function to generate SHA-1 signature for Cloudinary Signed Upload
 */
async function generateSHA1Signature(timestamp, apiSecret) {
  const stringToSign = `timestamp=${timestamp}${apiSecret}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Utility function to upload an image to Cloudinary using API Key & API Secret (Signed Upload).
 * Completely bypasses the need for an upload preset.
 * @param {File|Blob} file - The file object to upload
 * @returns {Promise<{url: string, public_id: string, raw: object}>}
 */
export async function uploadImageToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'wgjinfwl';
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || '981982275525762';
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET || '4HiJhsO88rPOxJRCILxQ_Scgnbw';

  // 1. Try Signed Upload using API Key & Secret (No preset needed)
  if (cloudName && apiKey && apiSecret) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = await generateSHA1Signature(timestamp, apiSecret);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          url: data.secure_url || data.url,
          public_id: data.public_id,
          raw: data,
        };
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.warn('Cloudinary Signed Upload warning:', errorData);
      }
    } catch (err) {
      console.warn('Cloudinary Signed Upload error:', err);
    }
  }

  // 2. Backup Fallback: Local Data URL if network or API credentials fail
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result,
        public_id: `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        raw: { local: true }
      });
    };
    reader.onerror = (err) => reject(new Error('Failed to read image file locally.'));
    reader.readAsDataURL(file);
  });
}

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'wgjinfwl',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '981982275525762',
};
