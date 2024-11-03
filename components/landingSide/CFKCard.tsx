import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface Prop {
  image: StaticImageData;
  header: string;
  description: string;
}

const CFKCard = ({ image, header, description }: Prop) => {
  return (
    <Card className="pt-2  shadow-lg rounded-2xl">
      <CardContent className="flex flex-col w-full items-center px-3">
        <div className="rounded-2xl overflow-hidden">
          <Image src={image} alt="Course Image" className="rounded-2xl" />
        </div>
        <div className="flex flex-col gap-3 mt-2 px-2">
          <p className="text-red-600 text-lg">{header}</p>
          <p className="text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CFKCard;
