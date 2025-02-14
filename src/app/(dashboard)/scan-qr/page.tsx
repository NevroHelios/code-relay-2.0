import { useState } from "react";
import dynamic from "next/dynamic";

const QrReader = dynamic(() => import("react-qr-scanner"), { ssr: false });

export default function ScanQRPage() {
  const [result, setResult] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Scan QR Code</h2>
      <div className="w-full max-w-md mx-auto">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>
      {result && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          <p>Scanned Data:</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}