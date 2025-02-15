"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero-new";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {isLoading ? (
        <div></div>
      ) : (
        <Hero />
      )}
    </main>
  );
}
