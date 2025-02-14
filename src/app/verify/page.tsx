"use client"

import { useState } from 'react';

export default function GarbageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    // Prepare the file to be sent to the backend which calls Google Vision API
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/vision/verify', { // Ensure you have implemented an API route to process this request
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();

      // Assuming the API returns { success: boolean }
      if (data.success) {
        setResult('success');
      } else {
        setResult('fail');
      }
    } catch (error) {
      console.error("Error calling Google Vision API", error);
      setResult('fail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Verify Your Waste</h1>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mb-4"
        />
        <button 
          onClick={handleUpload} 
          disabled={!file || loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Upload and Verify'}
        </button>
        {result === 'success' && (
          <div className="mt-4 text-green-600 flex items-center">
            <span className="mr-2 text-2xl">✔️</span>
            <span>Waste verified successfully!</span>
          </div>
        )}
        {result === 'fail' && (
          <div className="mt-4 text-red-600">
            Verification failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
