import { CameraEnhancer } from "dynamsoft-camera-enhancer";
import { PlayCallbackInfo } from "dynamsoft-camera-enhancer";
import { TextResult, BarcodeReader } from "dynamsoft-javascript-barcode";
import React from "react";
import { ReactNode } from "react";

export interface ScannerProps {
  isActive?: boolean;
  children?: ReactNode;
  interval?: number;
  license?: string;
  onInitialized?: (enhancer: CameraEnhancer, reader: BarcodeReader) => void;
  onScanned?: (results: TextResult[]) => void;
  onPlayed?: (playCallbackInfo: PlayCallbackInfo) => void;
  onClosed?: () => void;
}

const BarcodeScanner = (props: ScannerProps): React.ReactElement => {
  const mounted = React.useRef(false);
  const container = React.useRef(null);
  const enhancer = React.useRef<CameraEnhancer>();
  const reader = React.useRef<BarcodeReader>();
  const interval = React.useRef<any>(null);
  const decoding = React.useRef(false);

  React.useEffect(() => {
    const init = async () => {
      try {
        if (BarcodeReader.isWasmLoaded() === false) {
          // Update to version 9.6.20 which is more stable
          BarcodeReader.engineResourcePath =
            "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.20/dist/";

          BarcodeReader.license =
            props.license ||
            "t01908AUAAKwP4L/n3DiecN7YkRA/fSN5iTex8e34jVkSEktqfLQVwxHbh6LmFvXk4fcWDiRpZLafjLXf5+0EMaSiOQC4BBq0xy8nOzi1vVOlvRMdnLzlFAlrOG2n7dZ5ywQm4LkCelyHA0AObLkUwGvYc4MF0ALUANTKARZwuYp68yllgeR//znQxckOTm3vzAukjRMdnLzljAXiJ3FzXO28FQjym3MCaAF6CWB/yKoCkRKgBWgFuOAZQ34BpRMr8A==";

          // Initialize the reader first
          await BarcodeReader.loadWasm();
        }

        reader.current = await BarcodeReader.createInstance();
        enhancer.current = await CameraEnhancer.createInstance();

        if (container.current) {
          await enhancer.current.setUIElement(container.current);
        }

        enhancer.current.on("played", (playCallbackInfo: PlayCallbackInfo) => {
          if (props.onPlayed) {
            props.onPlayed(playCallbackInfo);
          }
          startScanning();
        });

        enhancer.current.on("cameraClose", () => {
          if (props.onClosed) {
            props.onClosed();
          }
        });

        enhancer.current.setVideoFit("cover");

        if (props.onInitialized) {
          props.onInitialized(enhancer.current, reader.current);
        }

        toggleCamera();
      } catch (error) {
        console.error("Failed to initialize barcode scanner:", error);
      }
    };

    if (mounted.current === false) {
      init();
    }
    mounted.current = true;
  }, []);

  const toggleCamera = () => {
    if (mounted.current === true) {
      if (props.isActive === true) {
        enhancer.current?.open(true);
      } else {
        stopScanning();
        enhancer.current?.close();
      }
    }
  };

  React.useEffect(() => {
    toggleCamera();
  }, [props.isActive]);

  const startScanning = () => {
    const decode = async () => {
      if (decoding.current === false && reader.current && enhancer.current) {
        decoding.current = true;
        const results = await reader.current.decode(
          enhancer.current.getFrame()
        );
        if (props.onScanned) {
          props.onScanned(results);
        }
        decoding.current = false;
      }
    };
    interval.current = setInterval(decode, props.interval || 40);
  };

  const stopScanning = () => {
    clearInterval(interval.current);
  };

  return (
    <div
      ref={container}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible", // Add this to ensure children are visible
      }}
    >
      <div className="dce-video-container" style={{ zIndex: 1 }}></div>
      <div style={{ position: "relative", zIndex: 2 }}>{props.children}</div>
    </div>
  );
};

export default BarcodeScanner;
