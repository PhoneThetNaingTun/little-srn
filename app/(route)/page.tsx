import Image from "next/image";
import Kids from "../../public/kids.png";
import { Button } from "@/components/ui/button";
import { FlipWordsPara } from "@/components/landingSide/flipWordsPara";
import rocket from "../../public/Rocket.png";
import OxfortComputing from "@/components/landingSide/OxfortComputing";
import { BackgroundLinesDemo } from "@/components/landingSide/lineAnimation";
import CodingForKids from "@/components/landingSide/CodingForKids";

export default function Home() {
  return (
    <div className="h-full  pt-16">
      <div className="relative flex justify-around   items-center pb-10 ">
        <div className="flex-1 flex flex-col gap-5">
          <FlipWordsPara />
          <p className="opacity-50">
            Let Children be the diractor and actior in his own play
          </p>
          <div>
            <Button className="text-white">Enroll Now</Button>
          </div>
        </div>
        <div className="flex-1  justify-center items-center hidden md:flex">
          <Image src={Kids} alt="Two Kids reading" className="w-[80%]" />
        </div>
      </div>
      <div className="w-full h-[30px]"></div>
      <div className="relative bg-yellow-400 gap-11  text-white w-full p-10 lg:px-52 grid grid-cols-2 md:grid-col-2 lg:grid-cols-3 text-center rounded-md ">
        <Image
          src={rocket}
          alt="rocket"
          className="hidden lg:flex absolute size-36 top-[50%] left-0 -translate-y-[50%] rotate-45"
        />
        <Image
          src={rocket}
          alt="rocket"
          className="hidden lg:flex absolute size-36 top-[50%] right-0 -translate-y-[50%]"
        />
        <div className="flex flex-col    m-auto">
          <p className="font-semibold  text-lg lg:text-2xl">
            Logical <br /> Thinking
          </p>
          <p className="  bg-gradient-to-r bg-clip-text text-transparent from-blue-700 via-violet-700 to-red-700  opacity-80  text-[10px] md:text-[10px] lg:text-[15px]">
            Helping kids develop structured reasoning and analytical skills.
          </p>
        </div>{" "}
        <div className="flex flex-col   m-auto ">
          <p className="font-semibold  text-lg lg:text-2xl">
            Creative <br /> Thinking
          </p>
          <p className=" bg-gradient-to-r bg-clip-text text-transparent from-blue-700 via-violet-700 to-red-700 opacity-80  text-[10px] md:text-[10px] lg:text-[15px] ">
            Encouraging kids to think outside the box and innovate.
          </p>
        </div>{" "}
        <div className="flex flex-col   m-auto ">
          <p className="font-semibold  text-lg lg:text-2xl">
            Problem <br /> Solving
          </p>
          <p className=" bg-gradient-to-r bg-clip-text text-transparent from-blue-700 via-violet-700 to-red-700 opacity-80  text-[10px] md:text-[10px] lg:text-[15px] ">
            Guiding kids to approach challenges with effective solutions.
          </p>
        </div>
      </div>
      <div className="mt-5">
        <OxfortComputing />
      </div>
      <div className="relative">
        <BackgroundLinesDemo />
      </div>
      <div className="mt-5 mb-10 mx-auto">
        <CodingForKids />
      </div>
    </div>
  );
}
