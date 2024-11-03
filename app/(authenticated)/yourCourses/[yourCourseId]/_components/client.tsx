"use client";

import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

export const CourseDetailClient = () => {
  const param = useParams();
  const { yourCourseId } = param;
  const { courses } = useAppSelector((state) => state.Courses);

  const course = courses.find((item) => item.id === yourCourseId);
  //   const lecture = lectures.map((item) =>
  //     item.courseId === yourCourseId ? item : undefined
  //   );
  //   const lectureDetail = lecture.map((item) =>
  //     lectureDetails.find((ld) => ld.lectureId === item?.id)
  //   );
  //   const courseDocument = courseDocuments.map((cd) =>
  //     cd.courseId === yourCourseId ? cd : undefined
  //   );
  //   const document = courseDocument.map((item) =>
  //     documents.find((doc) => doc.id === item?.documentId)
  //   );
  //   const exercise = exercises.map((item) =>
  //     item.courseId === yourCourseId ? item : undefined
  //   );
  //   const question = exercise.map((item) =>
  //     questions.find((quest) => quest.exerciseId === item?.id)
  //   );
  return (
    <div className="p-5">
      <p className="text-3xl font-semibold">{course?.cName}</p>
    </div>
  );
};
