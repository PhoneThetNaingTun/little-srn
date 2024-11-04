import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface Prop {
  description: string;
  image: string;
  sample: string;
}

export const QuestionCard = ({ description, image, sample }: Prop) => {
  return (
    <Card>
      <CardHeader className="max-w-md">
        <p className="text-base leading-relaxed break-words">{description}</p>
      </CardHeader>
      <CardContent>
        <Image
          src={`/uploads/${image}`}
          alt="question Image"
          width={300}
          height={200}
        />
        <p className="text-sm mt-2">{sample}</p>
      </CardContent>
    </Card>
  );
};
