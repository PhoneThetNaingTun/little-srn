"use client";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DeleteLevel, EditLevel } from "@/store/Slices/LevelSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateLecturePayload } from "@/types/lectrues";
import { UpdateLevelPayload } from "@/types/level";
import { Spline } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteLecture, EditLecture } from "@/store/Slices/LectureSlice";

export const LectureDetailPageClient = () => {
  const param = useParams();
  const { lectureId } = param;
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { lectures, isLoading } = useAppSelector((state) => state.Lectures);
  const { courses } = useAppSelector((state) => state.Courses);
  const lecture = lectures.find((lec) => lec.id === lectureId);
  const [editLecture, setEditLecture] = useState<UpdateLecturePayload>({
    id: "",
    title: "",
    courseId: "",
  });
  useEffect(() => {
    if (lecture) {
      setEditLecture(lecture);
    }
  }, [lecture]);
  const handleEditLecture = () => {
    if (!editLecture.title || !editLecture.courseId) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      EditLecture({
        ...editLecture,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/courses");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteLecture = () => {
    dispatch(
      DeleteLecture({
        id: editLecture.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/courses");
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
            Edit Lecture Details
          </h3>
          <div className="">
            <DeleteDialog OnDelete={handleDeleteLecture} loading={isLoading} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {" "}
          <p>Lecture Title</p>
          <Input
            defaultValue={lecture?.title}
            onChange={(e) => {
              setEditLecture({ ...editLecture, title: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Course</p>
          <Select
            defaultValue={lecture?.courseId || ""}
            onValueChange={(e) => {
              setEditLecture({ ...editLecture, courseId: e });
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
          <div className="flex justify-end">
            <Button
              className="bg-green-500 text-white mt-3 hover:bg-green-400"
              onClick={handleEditLecture}
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
