"use client";
import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Prop {
  image: StaticImageData;
  header: string;
  description: string;
}

const CourseCard = ({ image, header, description }: Prop) => {
  const router = useRouter();
  return (
    <Card className="pt-2  shadow-lg rounded-2xl">
      <CardContent className="flex flex-col w-full items-center px-3">
        <div className="rounded-2xl overflow-hidden">
          <Image src={image} alt="Course Image" className="rounded-2xl" />
        </div>
        <div className="flex flex-col gap-3 mt-2 px-2">
          <p className="text-red-600 text-lg">{header}</p>
          <p className="text-sm">{description}</p>
          <Button
            onClick={() => {
              router.push("/availableCourses");
            }}
          >
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
