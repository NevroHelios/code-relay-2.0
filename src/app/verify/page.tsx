"use client";

import { useState, useRef } from "react";

export default function GarbageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/vision/verify", {
        method: "POST",
        body: formData,
      });

      // Check if the response status is OK
      if (!response.ok) {
        const text = await response.text();
        console.error("Server responded with error:", response.status, text);
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult("success");
      } else {
        setResult("fail");
      }
    } catch (error) {
      console.error("Error calling Google Vision API", error);
      setResult("fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-green-200">Verify Your Waste</h1>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
          className="mb-4 border-2 border-dashed border-green-300 rounded p-6 text-center cursor-pointer"
        >
          {file ? (
            <p className="text-green-200">{file.name}</p>
          ) : (
            <p className="text-green-200">
              Drag and drop an image here, or click to select a file
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded disabled:opacity-20"
        >
          {loading ? "Processing..." : "Upload and Verify"}
        </button>
        {result === "success" && (
          <div className="mt-4 text-green-600 flex items-center">
            <span className="mr-2 text-2xl">✔️</span>
            <span>Waste verified successfully!</span>
          </div>
        )}
        {result === "fail" && (
          <div className="mt-4 text-red-600">
            Verification failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}