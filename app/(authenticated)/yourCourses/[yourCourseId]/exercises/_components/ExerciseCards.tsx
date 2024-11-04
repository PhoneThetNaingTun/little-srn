"use client";
import { Card, CardHeader } from "@/components/ui/card";

interface Prop {
  etitle: string;
}

export const ExerciseCard = ({ etitle }: Prop) => {
  return (
    <Card>
      <CardHeader>
        <p>{etitle}</p>
      </CardHeader>
    </Card>
  );
};
