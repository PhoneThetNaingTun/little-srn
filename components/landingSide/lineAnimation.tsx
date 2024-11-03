import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-r from-blue-500 via-violet-500 to-yellow-500 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Little SRN <br />
        Technology School, Mandalay
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg bg-gradient-to-r bg-clip-text  text-transparent from-blue-500 via-violet-500 to-yellow-500 text-center">
        Our mission is to provide a fun and engaging learning environment for
        kids. We believe that learning can be exciting, and our platform is
        designed to help children grow their knowledge and confidence in a safe,
        supportive environment!
      </p>
    </BackgroundLines>
  );
}
