"use client";
import { LatestUserCard } from "@/app/(adminDashBoard)/adminDashBoard/_components/LatestUserCard";
import { OverviewCard } from "@/app/(adminDashBoard)/adminDashBoard/_components/OverviewCards";
import { LatestMessageCard } from "./LatestMessageCard";
import { useAppSelector } from "@/store/hooks";

const OverViewPageClient = () => {
  const { books } = useAppSelector((state) => state.Books);
  const { students } = useAppSelector((state) => state.Students);
  const { courses } = useAppSelector((state) => state.Courses);
  const { userCourse } = useAppSelector((state) => state.UserCourses);
  return (
    <div>
      <p className="font-semibold text-3xl font-roboto">OverViews</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3 mb-3">
        <OverviewCard title={"Total Books"} content={books.length} />
        <OverviewCard
          title={"Total Students Login"}
          content={students.length}
        />{" "}
        <OverviewCard title={"Total Courses"} content={courses.length} />
        <OverviewCard title={"Enrollemnts"} content={userCourse.length} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <LatestUserCard />
        <LatestMessageCard />
      </div>
    </div>
  );
};

export default OverViewPageClient;
