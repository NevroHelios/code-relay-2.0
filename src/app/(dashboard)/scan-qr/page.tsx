import QrScanner from '@/components/qr/QrScanner';
import { submitContribution } from '@/lib/api/contributions';

export default function ScanQRPage() {
  const handleScan = async (qrData: string) => {
    try {
      const contribution = await submitContribution({
        qrCode: qrData,
        location: await getGeoLocation(),
        photo: await takePhoto()
      });
      // Show success feedback
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Scan Cleanup QR Code</h1>
      <div className="bg-card rounded-xl p-4 shadow-sm">
        <QrScanner 
          onScan={handleScan}
          overlay={
            <div className="absolute inset-0 border-4 border-primary rounded-xl" />
          }
        />
        <p className="mt-4 text-muted-foreground text-center">
          Point your camera at a cleanup location QR code
        </p>
      </div>
    </div>
  );
}