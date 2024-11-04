"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NotebookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const MenuBar = () => {
  const param = useParams();
  const { yourCourseId } = param;
  const [open, setOpen] = useState<boolean>(false);
  const { courses } = useAppSelector((state) => state.Courses);
  const { lectures } = useAppSelector((state) => state.Lectures);
  const { lectureDetails } = useAppSelector((state) => state.LectureDetails);
  const course = courses.find((item) => item.id === yourCourseId);
  const lecture = lectures.filter((item) =>
    item.courseId === yourCourseId ? true : false
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="text-white"
        >
          <span>Lectures</span> <NotebookText />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll bg-purple-400 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Lectures</SheetTitle>
          <SheetDescription></SheetDescription>

          <Accordion type="single" collapsible>
            {lecture.map((item, index) => {
              const lectureDetail = lectureDetails.filter(
                (ld) => ld.lectureId === item?.id
              );

              return (
                <AccordionItem value={String(index)} key={item.id}>
                  <AccordionTrigger>
                    {index + 1} <span className="pl-1"> {item?.title}</span>
                  </AccordionTrigger>
                  {lectureDetail.map((ld, ind) => {
                    return (
                      <Link
                        href={`/yourCourses/${course?.id}/lectureDetails/${ld?.id}`}
                        key={ld.id}
                        onClick={() => {
                          setOpen(false);
                        }}
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
        </SheetHeader>
      </SheetContent>
    </Sheet>
    // <Card className="h-screen overflow-y-scroll w-[300px]">
    //   <CardHeader>
    //     <p>Lectures</p>
    //   </CardHeader>
    //   <CardContent>
    //     <Accordion type="single" collapsible>
    //       {lecture.map((item, index) => {
    //         const lectureDetail = lectureDetails.filter(
    //           (ld) => ld.lectureId === item?.id
    //         );

    //         return (
    //           <AccordionItem value={String(index)}>
    //             <AccordionTrigger>
    //               {index + 1} <span className="pl-1"> {item?.title}</span>
    //             </AccordionTrigger>
    //             {lectureDetail.map((ld, ind) => {
    //               return (
    //                 <Link
    //                   href={`/yourCourses/${course?.id}/lectureDetails/${ld?.id}`}
    //                 >
    //                   <AccordionContent>
    //                     {ind + 1}
    //                     <span className="pl-1"> {ld.lectureDetailName}</span>
    //                   </AccordionContent>
    //                 </Link>
    //               );
    //             })}
    //           </AccordionItem>
    //         );
    //       })}
    //     </Accordion>
    //   </CardContent>
    // </Card>
  );
};
