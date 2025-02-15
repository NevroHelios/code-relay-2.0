'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-barcode-reader to avoid SSR issues
const BarcodeReader = dynamic<{ onError: (err: any) => void; onScan: (data: string | null) => void }>(() => import('react-barcode-reader').then(mod => mod.default), { ssr: false })

export default function ScanBarcodePage() {
  const [barcode, setBarcode] = useState<string | null>(null)

  const handleScan = (data: string | null) => {
    if (data) {
      setBarcode(data)
    }
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Scan Barcode</h2>
      <div className="w-full max-w-md mx-auto">
        <BarcodeReader
          onError={handleError}
          onScan={handleScan}
          // You can pass additional props if needed
        />
      </div>
      {barcode && (
        <div className="mt-4">
          <p className="text-lg">Scanned Barcode: {barcode}</p>
        </div>
      )}
    </div>
  )
}