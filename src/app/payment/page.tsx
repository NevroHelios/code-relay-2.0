"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalButton } from "@/components/paypal/PayPalButton";

import { FaSpinner } from "react-icons/fa";

const PaypalPage = () => {
    const router = useRouter();
    
    const [cart, setCart] = useState<any>(null);
    const [cartLoading, setCartLoading] = useState(true);
    const [cartError, setCartError] = useState<string>("");

    useEffect(() => {
        async function fetchCart() {
          
            // try {
            //     const res = await fetch(`/api/cart?clerkId=${user.id}`);
            //     const data = await res.json();
            //     if (data.success && data.cart) {
            //         setCart(data.cart);
            //     } else {
            //         setCartError(data.message || "Error fetching cart");
            //     }
            // } catch (error) {
            //     setCartError("Error fetching cart");
            // } finally {
            //     setCartLoading(false);
            // }
        }
        fetchCart();
    }, []);

    const handleSuccess = (order: any) => {
        console.log("Payment successful", order);
        // after payment, redirect user to order confirmation page
        router.push("/history");
    };

    

    // if (cartLoading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <FaSpinner className="h-8 w-8 animate-spin" />
    //         </div>
    //     );
    // }

    // if (cartError) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <p className="text-red-500">{cartError}</p>
    //         </div>
    //     );
    // }

    // Calculate the actual amount from the cart.
    // Use totalAfterDiscount if available, otherwise use the cartTotal.
    const amount = cart ? cart.cartTotal.toFixed(2) : "0.00";

    return (
        <div className="container mx-auto pt-36 font-play">
            <h1 className="text-4xl text-center text-[#646464] font-bold mb-6">
                PayPal Payment
            </h1>
            <PayPalButton amount={amount} onSuccess={handleSuccess} />
        </div>
    );
};

export default PaypalPage;