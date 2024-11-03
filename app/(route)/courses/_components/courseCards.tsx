import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

interface Prop {
  header: string;
  image: StaticImageData;
}

const CourseDetailCards = ({ header, image }: Prop) => {
  return (
    <Card>
      <CardHeader className="text-center text-3xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-blue-500  via-violet-600 to-yellow-500">
        {header}
      </CardHeader>
      <CardContent>
        <Image src={image} alt="" className="" />
      </CardContent>
    </Card>
  );
};
export default CourseDetailCards;
