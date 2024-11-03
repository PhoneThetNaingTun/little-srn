"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const MenuBar = () => {
  const param = useParams();
  const { yourCourseId } = param;
  const { courses } = useAppSelector((state) => state.Courses);
  const { lectures } = useAppSelector((state) => state.Lectures);

  const { lectureDetails } = useAppSelector((state) => state.LectureDetails);
  const course = courses.find((item) => item.id === yourCourseId);
  const lecture = lectures.map((item) =>
    item.courseId === yourCourseId ? item : undefined
  );

  return (
    <Card>
      <CardHeader>
        <p>Lectures</p>
      </CardHeader>
      <CardContent>
        {" "}
        <Accordion type="single" collapsible>
          {lecture.map((item, index) => {
            const lectureDetail = lectureDetails.filter(
              (ld) => ld.lectureId === item?.id
            );

            return (
              <AccordionItem value={String(index)}>
                <AccordionTrigger>
                  {index + 1} <span className="pl-1"> {item?.title}</span>
                </AccordionTrigger>
                {lectureDetail.map((ld, ind) => {
                  return (
                    <Link
                      href={`/yourCourses/${course?.id}/lectureDetails/${ld?.id}`}
                    >
                      <AccordionContent>
                        {ind + 1}
                        <span className="pl-1"> {ld.lectureDetailName}</span>
                      </AccordionContent>
                    </Link>
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};
