"use client";

import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookType } from "lucide-react";

export const ExerciseButton = () => {
  const param = useParams();
  const { yourCourseId } = param;

  return (
    <Link href={`/yourCourses/${yourCourseId}/exercises`}>
      <Button className="text-white">
        <BookType />
        Exercises
      </Button>
    </Link>
  );
};
