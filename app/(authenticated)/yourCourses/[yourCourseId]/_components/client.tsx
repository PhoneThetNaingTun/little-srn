"use client";

import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

export const CourseDetailClient = () => {
  const param = useParams();
  const { yourCourseId } = param;
  const { courses } = useAppSelector((state) => state.Courses);

  const course = courses.find((item) => item.id === yourCourseId);

  //   const exercise = exercises.map((item) =>
  //     item.courseId === yourCourseId ? item : undefined
  //   );
  //   const question = exercise.map((item) =>
  //     questions.find((quest) => quest.exerciseId === item?.id)
  //   );
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <div>
        <p className="text-3xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-violet-500 to-blue-500">
          {course?.cName}
        </p>
        <iframe
          width="560"
          className="m-auto w-[100%] h-[300px] lg:w-[650px] lg:h-[400px] rounded-lg"
          height="315"
          src={course?.video || ""}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>

      <div>
        <p className="text-sm md:text-xl lg:text-2xl font-semibold">
          Video Label : {course?.videoLabel}
        </p>
        <p className="text-sm md:text-lg lg:text-xl  font-semibold text-gray-500">
          Description:{course?.description}
        </p>
      </div>
    </div>
  );
};
