import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/card";

interface Prop {
  title: string;
  content: number;
}

export const OverviewCard = ({ title, content }: Prop) => {
  return (
    <Card className="font-roboto">
      <CardHeader>{title}</CardHeader>
      <CardContent className="text-2xl font-semibold">{content}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
