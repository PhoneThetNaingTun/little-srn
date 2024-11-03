"use client";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spline } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { UpdateCourseDocumentPayload } from "@/types/courseDocuments";
import {
  DeleteCourseDocument,
  EditCourseDocument,
} from "@/store/Slices/CourseDocumentSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CourseDocumentDetailPageClient = () => {
  const param = useParams();
  const { courseDocumentId } = param;
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { courses } = useAppSelector((state) => state.Courses);
  const { documents } = useAppSelector((state) => state.Documents);
  const { courseDocuments, isLoading } = useAppSelector(
    (state) => state.CourseDocuments
  );
  const courseDocument = courseDocuments.find(
    (cdoc) => cdoc.id === courseDocumentId
  );
  const [editCourseDocument, setEditCourseDocument] =
    useState<UpdateCourseDocumentPayload>({
      id: "",
      courseId: "",
      documentId: "",
    });
  useEffect(() => {
    if (courseDocument) {
      setEditCourseDocument(courseDocument);
    }
  }, [courseDocument]);
  const handleEditCourseDocument = () => {
    if (!editCourseDocument.courseId || !editCourseDocument.documentId) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      EditCourseDocument({
        ...editCourseDocument,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/documents");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteCourseDocument = () => {
    dispatch(
      DeleteCourseDocument({
        id: editCourseDocument.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/documents");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Card className="w-1/2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
            Edit Document Details
          </h3>
          <div className="">
            <DeleteDialog
              OnDelete={handleDeleteCourseDocument}
              loading={isLoading}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div>
            <p>Course Name</p>
            <Select
              defaultValue={courseDocument?.courseId}
              onValueChange={(e) => {
                setEditCourseDocument({ ...editCourseDocument, courseId: e });
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course</SelectLabel>

                  {courses.map((item) => {
                    return (
                      <SelectItem value={item.id} key={item.id}>
                        {item.cName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p>Document Name</p>
            <Select
              defaultValue={courseDocument?.documentId}
              onValueChange={(e) => {
                setEditCourseDocument({ ...editCourseDocument, documentId: e });
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Document" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Document</SelectLabel>

                  {documents.map((item) => {
                    return (
                      <SelectItem value={item.id} key={item.id}>
                        {item.dname}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <div className="flex justify-end">
            <Button
              className="bg-green-500 text-white mt-3 hover:bg-green-400"
              onClick={handleEditCourseDocument}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spline className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
