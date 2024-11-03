"use client";
import { useAppSelector } from "@/store/hooks";
import { AvailableCourseCard } from "./availableCourseCard";
const AvailableCoursesClientPage = () => {
  const { userAppLoading } = useAppSelector((state) => state.App);
  const { courses } = useAppSelector((state) => state.Courses);
  return (
    <div className="p-2 md:p-10 overflow-y-scroll">
      <p className="font-bold text-3xl my-5 font-mono">Available Courses</p>
      {userAppLoading ? (
        <div className="text-8xl ">
          <p>Loading</p>
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 md:gap-5 gap-3 mt-3  ">
          {courses.map((item) => {
            return (
              <AvailableCourseCard
                image={item.image || ""}
                header={item.cName}
                description={item.description || ""}
                id={item.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AvailableCoursesClientPage;
