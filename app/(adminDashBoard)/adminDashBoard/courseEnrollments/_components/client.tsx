"use client";
import { DataTable } from "@/components/ui/data-table";
import { useAppSelector } from "@/store/hooks";
import { pendingColumns } from "./pending-columns";

export const CourseEnrollmentsPageClient = () => {
  const { userCourse } = useAppSelector((state) => state.UserCourses);
  const { courses } = useAppSelector((state) => state.Courses);
  const { students } = useAppSelector((state) => state.Students);
  const pendingUserCourse = userCourse.filter(
    (item) => item.isConfirm === false
  );
  const userCourseData = pendingUserCourse.map((item) => {
    const uname = students.find((stu) => stu.id === item.userId)?.name;
    const uemail = students.find((stu) => stu.id === item.userId)?.email;
    const uphone = students.find((stu) => stu.id === item.userId)?.phone;
    const ctitle = courses.find((cor) => cor.id === item.courseId)?.cName;
    const id = item.id;
    return { uname, uemail, uphone, ctitle, id };
  });
  return (
    <div>
      <DataTable
        //@ts-ignore
        columns={pendingColumns}
        data={userCourseData}
        filterKey="uemail"
      />
    </div>
  );
};
