"use client";

import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Captions } from "lucide-react";

export const DocumentsCourse = () => {
  const param = useParams();
  const { yourCourseId } = param;
  const { courseDocuments } = useAppSelector((state) => state.CourseDocuments);
  const { documents } = useAppSelector((state) => state.Documents);
  const courseDocument = courseDocuments.filter((cd) =>
    cd.courseId === yourCourseId ? true : false
  );
  const document = courseDocument.map((item) =>
    documents.find((doc) => doc.id === item?.documentId)
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white">
          <Captions />
          Documents
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-purple-500 text-white">
        <DropdownMenuLabel>Documents</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {document.map((item, index) => {
          return (
            <Link href={item?.dlink || ""} key={item?.id}>
              <DropdownMenuItem>
                {index + 1}: {item?.dname}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
