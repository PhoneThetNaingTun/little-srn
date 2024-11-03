import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsPara() {
  const words = ["Future", "Education", "Learning", "Guidance"];

  return (
    <div className="">
      <div className="text-3xl md:text-4xl lg:text-7xl  mx-auto font-light  dark:text-white">
        Better
        <FlipWords words={words} /> <br />
        For Your Kids
      </div>
    </div>
  );
}
