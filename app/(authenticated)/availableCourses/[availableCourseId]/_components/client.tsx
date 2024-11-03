"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConfirmDialog } from "./confirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const AvailableCourseDetailPageClient = () => {
  const param = useParams();
  const { availableCourseId } = param;
  const { courses } = useAppSelector((state) => state.Courses);
  const { levels } = useAppSelector((state) => state.Levels);
  const { status } = useAppSelector((state) => state.Status);
  const { students } = useAppSelector((state) => state.Students);
  const { courseReviews } = useAppSelector((state) => state.CourseReviews);

  const course = courses.find((item) => item.id === availableCourseId);
  const level = levels.find((item) => item.id === course?.levelId);
  const stat = status.find((item) => item.id === course?.statusId);
  const courseReview = courseReviews.filter((item) =>
    item.courseId === availableCourseId ? true : false
  );
  const Reviews = courseReview.map((item) => {
    const studentImage = students.find((stu) => stu.id === item.userId)?.image;
    const studentName = students.find((stu) => stu.id === item.userId)?.name;
    const studentEmail = students.find((stu) => stu.id === item.userId)?.email;
    const review = item.review;
    return { studentImage, studentName, studentEmail, review };
  });
  return (
    <div className="p-2 md:p-10 overflow-y-scroll">
      <Card className="relative ">
        <CardHeader>
          <div>
            <p className="text-2xl font-bold">Sample Video</p>
            <p className="text-2xl font-bold">Title:{course?.videoLabel}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row lg:items-start gap-5">
          <div>
            <iframe
              width=""
              height=""
              className="lg:w-[450px] lg:h-[250px]"
              src={course?.video || ""}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div>
            <div className="relative">
              <p className="text-5xl font-semibold pl-3">{course?.cName}</p>
              <div className="absolute w-2 h-full bg-violet-500 top-0 left-0"></div>
            </div>
            <p className="mt-5 font-semibold text-xl">
              Description:{" "}
              <span className="text-gray-600">{course?.description}</span>
            </p>
            <p className="mt-5 font-semibold">
              Zoom Fee:<span className="text-gray-600"> {course?.zoomFee}</span>
            </p>
            <p className="mt-5 font-semibold">
              Teach Yourself Fee:{" "}
              <span className="text-gray-600">
                {" "}
                {course?.teachYourSelfField}
              </span>
            </p>{" "}
            <p className="mt-5 font-semibold">
              Course Hours:{" "}
              <span className="text-gray-600"> {course?.cHour}</span>
            </p>{" "}
            <p className="mt-5 font-semibold">
              Practices:{" "}
              <span className="text-gray-600"> {course?.cPractice}</span>
            </p>
          </div>
          <div className="lg:absolute top-5 right-5 flex gap-3 ">
            <Badge className="bg-green-500 text-white">{level?.level}</Badge>
            <Badge className="bg-green-500 text-white ">{stat?.status}</Badge>
          </div>
          <div className="absolute bottom-5 right-5">
            <ConfirmDialog
              cname={course?.cName as string}
              courseId={course?.id as string}
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-5 pb-10">
        <p className="mb-3">
          <span className="text-3xl bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {course?.cName}
          </span>
          <br />
          <span className="font-light text-xl"> Reviews</span>
        </p>
        {courseReview.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Reviews.map((item) => {
              return (
                <Card className="rounded-md shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {" "}
                      <Avatar>
                        <AvatarImage src={item?.studentImage || ""} />
                        <AvatarFallback>{item?.studentName}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{item?.studentName}</p>
                        <p>{item?.studentEmail}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{item?.review}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-center font-semibold text-xl">No Review Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AvailableCourseDetailPageClient;
