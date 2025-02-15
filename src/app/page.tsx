"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero-new";
import About from "@/components/about";
import Team from "@/components/collection";
import Footer from "@/components/footer";

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
        <div>Loading...</div>
      ) : (
        <>
          <Hero />
          <About />
          <Team/>
         
        </>
      )}
    </main>
  );
}
