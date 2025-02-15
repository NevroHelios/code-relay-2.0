declare module "react-qr-scanner" {
    import { Component } from "react";
  
    interface QrReaderProps {
      delay?: number;
      onError?: (error: any) => void;
      onScan?: (data: string | null) => void;
      style?: React.CSSProperties;
    }
  
    class QrReader extends Component<QrReaderProps> {}
  
    export default QrReader;
  }