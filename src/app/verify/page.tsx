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

    try {
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            // Get everything after the comma to remove data:image/jpeg;base64,
            const base64 = reader.result.split(",")[1];
            resolve(base64);
          } else {
            reject(new Error("Failed to read file as base64"));
          }
        };
        reader.onerror = reject;
      });

      console.log("Sending request to backend...");
      const requestBody = {
        image: base64String,
      };
      console.log("Request body structure:", JSON.stringify(requestBody));

      const response = await fetch(
        "https://detect-fastapi.azurewebsites.net/detect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(errorText);
      }

      const data = await response.json();
      setResult(data.plastic_garbage === "YES" ? "success" : "fail");
    } catch (error) {
      console.error("Upload error:", error);
      setResult("fail");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6">
      <h1 className="text-3xl font-bold mb-6">Verify Your Waste</h1>
      <div className="p-8 rounded shadow-md w-full max-w-md bg-green-50/30 backdrop-blur-sm">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
          className="mb-4 border-2 border-dashed border-gray-300 rounded p-6 text-center cursor-pointer"
        >
          {file ? (
            <p className="text-gray-700">{file.name}</p>
          ) : (
            <p className="text-gray-900">
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
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
