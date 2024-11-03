"use client";

import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
export const EnrollmentsPageClient = () => {
  const { userCourse } = useAppSelector((state) => state.UserCourses);
  const { courses } = useAppSelector((state) => state.Courses);
  const { user } = useAppSelector((state) => state.App);
  const pendingEnrollments = userCourse.filter(
    (item) => item.isConfirm === false && item.userId === user.id
  );
  const enrollments = pendingEnrollments.map((item) => {
    const userName = user.name;
    const userEmail = user.email;
    const userImage = user.image;
    const course = courses.find((cour) => cour.id === item.courseId)?.cName;
    const courseId = courses.find((cour) => cour.id === item.courseId)?.id;
    return { userName, userEmail, userImage, course, courseId };
  });
  return (
    <div className="p-10">
      <p className="text-2xl font-semibold mb-5">Your Enrollments</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {enrollments.map((item) => {
          return (
            <Link href={`/availableCourses/${item.courseId}`}>
              {" "}
              <Card className="rounded-md shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {" "}
                    <Avatar>
                      <AvatarImage src={item?.userImage || ""} />
                      <AvatarFallback>{item?.userName}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{item?.userName}</p>
                      <p>{item?.userEmail}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center gap-2 font-semibold">
                    Course Title :
                    <span className="text-xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-purple-500 to-blue-500">
                      {item?.course}
                    </span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
