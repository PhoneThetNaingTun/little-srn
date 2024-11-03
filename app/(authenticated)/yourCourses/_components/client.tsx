"use client";

import { useAppSelector } from "@/store/hooks";
import { YourCourseCard } from "./yourCourseCard";

export const YourCoursesPageClient = () => {
  const { userCourse } = useAppSelector((state) => state.UserCourses);
  const { courses } = useAppSelector((state) => state.Courses);
  const { user } = useAppSelector((state) => state.App);
  const yourCourses = userCourse.filter(
    (item) => item.isConfirm === true && item.userId === user.id
  );
  const ConfirmCourses = yourCourses.map((item) => {
    const image = courses.find((cour) => cour.id === item.courseId)?.image;
    const header = courses.find((cour) => cour.id === item.courseId)?.cName;
    const description = courses.find(
      (cour) => cour.id === item.courseId
    )?.description;
    const id = courses.find((cour) => cour.id === item.courseId)?.id;

    return { image, header, description, id };
  });

  return (
    <div className="p-10">
      <p className="text-xl font-semibold mb-5">Your Courses</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ConfirmCourses.map((item) => {
          return (
            <YourCourseCard
              image={item.image || ""}
              header={item.header || ""}
              id={item.id || ""}
              description={item.description || ""}
            />
          );
        })}
      </div>
    </div>
  );
};
