"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { PencilLine } from "lucide-react";
import { NewDocumentDialog } from "./NewDocumentDialog";
import { DataTable } from "@/components/ui/data-table";
import { documentColumn } from "./document-columns";
import { NewCourseDocumentDialog } from "./NewCourseDocumentDialog";
import { courseDocumentColumn } from "./courseDocument-columns";

export const DocumentPageClient = () => {
  const { documents } = useAppSelector((state) => state.Documents);
  const { courses } = useAppSelector((state) => state.Courses);
  const { courseDocuments } = useAppSelector((state) => state.CourseDocuments);
  const courseDocumentData = courseDocuments.map((item) => {
    const dname = documents.find((doc) => doc.id === item.documentId)?.dname;
    const cname = courses.find((cours) => cours.id === item.courseId)?.cName;
    const id = item.id;
    return { dname, cname, id };
  });
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Card>
        <CardHeader>
          {" "}
          <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
            <PencilLine /> Document ({documents.length})
          </p>
          <div className="flex justify-end">
            <NewDocumentDialog />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={documentColumn}
            data={documents}
            filterKey="dname"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          {" "}
          <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
            <PencilLine /> Course Document ({courseDocuments.length})
          </p>
          <div className="flex justify-end">
            <NewCourseDocumentDialog />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            //@ts-ignore
            columns={courseDocumentColumn}
            data={courseDocumentData}
            filterKey="dname"
          />
        </CardContent>
      </Card>
    </div>
  );
};
