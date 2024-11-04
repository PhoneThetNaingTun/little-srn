"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExerciseCard } from "./ExerciseCards";

export const ExercisePageClient = () => {
  const param = useParams();
  const { yourCourseId } = param;
  const { exercises } = useAppSelector((state) => state.Exercises);
  const exercise = exercises.filter((item) =>
    item.courseId === yourCourseId ? true : false
  );

  return (
    <div className="h-[500px]  md:h-[50%]  overflow-y-scroll  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500 bg-white p-3 lg:p-7 rounded-md shadow-lg">
      <p className="p-5 text-xl text-purple-500 font-bold">Exercises</p>
      <div className="w-full  grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4 ">
        {exercise.map((exe) => {
          return (
            <Link href={`/yourCourses/${yourCourseId}/exercises/${exe.id}`}>
              <ExerciseCard etitle={exe.ename} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
