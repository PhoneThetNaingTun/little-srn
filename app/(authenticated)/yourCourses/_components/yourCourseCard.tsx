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

export const YourCourseCard = ({ image, header, description, id }: Prop) => {
  const router = useRouter();
  return (
    <Card className="shadow-lg rounded-xl overflow-hidden p-3">
      <CardContent className="relative flex  pb-0  gap-2  px-0">
        <div className="rounded-2xl z-[2]">
          <Image
            src={`/uploads/${image}` || ""}
            alt="Course Image"
            className="rounded-2xl  w-48 h-60"
            width={100}
            height={500}
          />
        </div>
        <div className=" flex flex-col gap-1 md:gap-10  mt-2 px-3 z-[2] w-1/3">
          <p className="text-red-600 text-2xl font-semibold">{header}</p>
          <div>
            <p className="text-[10px] md:text-[13px] font-bold">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 lg:-translate-x-[50%] lg:-translate-y-[50%] flex justify-end z-[2]">
          <Button
            onClick={() => {
              router.push(`/yourCourses/${id}`);
            }}
            className="bg-purple-600 text-white"
          >
            Watch Videos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
