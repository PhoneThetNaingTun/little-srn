"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import PurpleSquares from "../../../../public/purple squares.svg";
interface Prop {
  image: string;
  header: string;
  description: string;
  id: string;
}

export const AvailableCourseCard = ({
  image,
  header,
  description,
  id,
}: Prop) => {
  const router = useRouter();
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <Image
        src={`/uploads/${image}` || ""}
        alt="Course Image"
        className="w-full h-48 object-cover"
        width={100}
        height={500}
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{header}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <Button
          onClick={() => {
            router.push(`/availableCourses/${id}`);
          }}
          className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          Learn More
        </Button>
      </div>
    </div>
    // <Card className="shadow-lg rounded-xl overflow-hidden p-3">
    //   <CardContent className="relative flex  pb-0  gap-2  px-0">
    //     <div className="rounded-2xl z-[2]">
    //       <Image
    //         src={`/uploads/${image}` || ""}
    //         alt="Course Image"
    //         className="rounded-2xl  w-48 h-60"
    //         width={100}
    //         height={500}
    //       />
    //     </div>
    //     <div className=" flex flex-col gap-1 md:gap-10  mt-2 px-3 z-[2] w-1/3">
    //       <p className="text-red-600 text-2xl font-semibold">{header}</p>
    //       <div>
    //         <p className="text-[10px] md:text-[13px] font-bold">
    //           {description}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="absolute bottom-2 right-2 lg:-translate-x-[50%] lg:-translate-y-[50%] flex justify-end z-[2]">
    //       <Button
    //         onClick={() => {
    //           router.push(`/availableCourses/${id}`);
    //         }}
    //         className="bg-purple-600 text-white"
    //       >
    //         Learn More
    //       </Button>
    //     </div>
    //   </CardContent>
    // </Card>
  );
};
