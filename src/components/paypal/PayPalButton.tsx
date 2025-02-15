"use client";
import { useEffect, useRef } from "react";

type PayPalButtonProps = {
  amount: string;
  onSuccess: (order: any) => void;
};

export const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    // script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      if ((window as any).paypal) {
        (window as any).paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount
                }
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            onSuccess(order);
          },
          onError: (err: any) => {
            console.error("PayPal Error:", err);
          }
        }).render(paypalRef.current);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Only remove the script if it is still attached to a parent node.
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [amount, onSuccess]);

  return <div ref={paypalRef} />;
};