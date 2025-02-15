"use client";
import { useState, useEffect, useCallback } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

interface ScanResult {
  rawValue: string;
  format: string;
  boundingBox: DOMRectReadOnly;
  cornerPoints: { x: number; y: number }[];
}

const BarcodeScannerPage = () => {
  const [scanResult, setScanResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isScanning, setIsScanning] = useState(true);

  // Audio handling
  const playBeep = useCallback(() => {
    const audio = new Audio(
      "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"
    );
    audio.play().catch(() => {});
  }, []);

  // Debounced scan handler
  const handleScan = useCallback(
    (result: ScanResult | null) => {
      if (result && isScanning) {
        try {
          playBeep();
          setScanResult(result.rawValue);
          setIsScanning(false);
          setTimeout(() => setIsScanning(true), 1000); // 1s cooldown
        } catch (err) {
          setError("Failed to process scan result");
        }
      }
    },
    [isScanning, playBeep]
  );

  // Error handler
  const handleError = useCallback((error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    setError(errorMessage);
    setIsScanning(false);
    setTimeout(() => setIsScanning(true), 2000);
  }, []);

  return (
    <div className="scanner-container">
      <Scanner
        constraints={{
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }}
        formats={[
          "code_128",
          "code_39",
          "code_93",
          "codabar",
          "ean_13",
          "ean_8",
          "itf",
          "upc_a",
          "upc_e",
        ]}
        onFound={handleScan}
        onError={handleError}
        options={{
          delayBetweenScanSuccess: 1000,
          delayBetweenScanAttempts: 300,
        }}
        components={{
          tracker: true,
          torch: true,
        }}
      />

      <div className="scan-results">
        {scanResult && (
          <div className="result-box">
            <h3>Scanned Code:</h3>
            <code>{scanResult}</code>
          </div>
        )}
        {error && <div className="error-box">{error}</div>}
      </div>

      <style jsx>{`
        .scanner-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .scan-results {
          padding: 1rem;
          background: #f8f9fa;
          border-top: 2px solid #e9ecef;
        }

        .result-box {
          padding: 1rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .error-box {
          padding: 1rem;
          background: #ffe3e3;
          color: #dc3545;
          border-radius: 8px;
          margin-top: 1rem;
        }

        code {
          font-family: "Fira Code", monospace;
          word-break: break-all;
          background: #f8f9fa;
          padding: 0.25rem;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default BarcodeScannerPage;
