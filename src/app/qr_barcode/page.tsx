'use client';
import React from "react";
import dynamic from 'next/dynamic';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
// const BarcodeScannerComponent = dynamic(
//   () => import("react-qr-barcode-scanner"),
//   { ssr: false }
// );

function App() {
  const [data, setData] = React.useState("Not Found");

  return (
    <>
        <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err, result) => {
                if (result) {
                    setData(result.text);
                } else {
                    setData("Not Found");
                }
            }}
        />
        <p>{data}</p>
    </>
  );
}

export default App;
