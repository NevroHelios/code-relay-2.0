"use client"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PaymentPage() {
  const [cart, setCart] = useState<any>(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState<string>("");

  return (
    <PayPalScriptProvider options={{ 
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
    }}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Payment</h2>
          
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                  purchase_units: [
                      {
                          amount: {
                              currency_code: "USD",
                              value: "10.00" // Replace with actual amount
                          },
                      },
                  ],
                  intent: "CAPTURE"
              });
            }}
            onApprove={(data, actions) => {
              return actions.order!.capture().then((details) => {
                console.log("Payment completed:", details);
                // Handle successful payment
              });
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}