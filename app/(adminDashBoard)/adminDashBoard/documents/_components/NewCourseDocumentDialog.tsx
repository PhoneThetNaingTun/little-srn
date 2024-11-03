"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Plus, Spline } from "lucide-react";
import { useState } from "react";
import { NewDocumentPayload } from "@/types/documents";
import { CreateDocument } from "@/store/Slices/DocumentSlice";
import { NewCourseDocumentPayload } from "@/types/courseDocuments";
import { CreateCourseDocument } from "@/store/Slices/CourseDocumentSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const NewCourseDocumentDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { courses } = useAppSelector((state) => state.Courses);
  const { documents } = useAppSelector((state) => state.Documents);
  const [newCourseDocument, setNewCourseDocument] =
    useState<NewCourseDocumentPayload>({
      documentId: "",
      courseId: "",
    });
  const { isLoading } = useAppSelector((state) => state.CourseDocuments);

  const handleCreateCourseDocument = () => {
    if (!newCourseDocument.documentId || !newCourseDocument.courseId) {
      return toast({
        title: "Plase Fill Out All Fields",
        variant: "destructive",
      });
    }
    dispatch(
      CreateCourseDocument({
        ...newCourseDocument,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewCourseDocument({ documentId: "", courseId: "" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-700">
          <Plus className="w-3 h-3 mr-1" /> Add New Course Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add New Course Document</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Course Name</p>
          <Select
            onValueChange={(e) => {
              setNewCourseDocument({ ...newCourseDocument, courseId: e });
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
            onValueChange={(e) => {
              setNewCourseDocument({ ...newCourseDocument, documentId: e });
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
        <Button
          onClick={handleCreateCourseDocument}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
        >
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Add"}{" "}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
