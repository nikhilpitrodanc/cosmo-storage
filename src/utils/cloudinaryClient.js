const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Immediate Connection Test Log
if (cloudName && uploadPreset && cloudName !== 'YOUR_CLOUD_NAME') {
  console.log(`🚀 [Cosmo-Cloudinary] Ready. Cloud: ${cloudName}, Preset: ${uploadPreset}`);
} else {
  console.warn('⚠️ [Cosmo-Cloudinary] Not configured. Using simulation mode.');
}

export const uploadToCloudinary = async (file) => {
  if (!cloudName || !uploadPreset || cloudName === 'YOUR_CLOUD_NAME') {
    console.warn('⚠️ Cloudinary not configured. Simulation mode only.');
    return { url: 'https://via.placeholder.com/150', public_id: 'sim_123' };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || 'Cloudinary upload failed');
  }

  return await response.json();
};
