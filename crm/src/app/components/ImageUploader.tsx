'use client';

import { useState } from 'react';

export default function ImageUploader() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [details, setDetails] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setMessage('Please select an image.');
      return;
    }

    setUploading(true);
    setMessage('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await fetch('/api/admin-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64Image, details }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Image uploaded successfully!');
        setImageFile(null);
        setDetails('');
        setPreview(null);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }

      setUploading(false);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Upload Admin Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="h-40 object-contain border" />}

      <textarea
        placeholder="Details (optional)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full border rounded p-2"
      />

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </div>
  );
}
