"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { UpdateCoursePayload } from "@/types/courses";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spline } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DeleteCourse, EditCourse } from "@/store/Slices/CourseSlice";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";

export const CourseDetailPageClient = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { courseId } = param;
  const { toast } = useToast();
  const { courses, isLoading } = useAppSelector((state) => state.Courses);
  const { levels } = useAppSelector((state) => state.Levels);
  const { status } = useAppSelector((state) => state.Status);
  const course = courses.find((item) => item.id === courseId);
  const [editCourse, setEditCourse] = useState<UpdateCoursePayload>({
    id: "",
    levelId: "",
    statusId: "",
    cName: "",
    image: "",
    video: "",
    videoLabel: "",
    cHour: "",
    cPractice: "",
    zoomFee: "",
    teachYourSelfField: "",
    description: "",
  });
  useEffect(() => {
    if (course) {
      setEditCourse(course);
    }
  }, [course]);
  console.log(course);
  const handleEditCourse = () => {
    if (
      !editCourse.levelId ||
      !editCourse.statusId ||
      !editCourse.cName ||
      !editCourse.cHour ||
      !editCourse.video ||
      !editCourse.videoLabel ||
      !editCourse.cPractice ||
      !editCourse.description
    ) {
      return toast({ title: "Pleace Fill All Field", variant: "destructive" });
    }
    dispatch(
      EditCourse({
        ...editCourse,
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
  const handleDeleteCourse = () => {
    dispatch(
      DeleteCourse({
        id: editCourse.id,
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
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
            Edit Course Details
          </h3>
          <div>
            <DeleteDialog loading={isLoading} OnDelete={handleDeleteCourse} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-center justify-between">
          <div className="m-auto flex flex-col gap-3 items-center">
            <Image
              src={`/uploads/${editCourse?.image}`}
              alt="Course Image"
              width={200}
              height={250}
            />
            {course?.video ? (
              <iframe
                src={course.video || ""}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className=""
              ></iframe>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4 w-1/2">
            <div>
              <p>Course Name</p>
              <Input
                defaultValue={course?.cName}
                placeholder="Course Name"
                onChange={(e) => {
                  setEditCourse({ ...editCourse, cName: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Course Hour</p>
              <Input
                defaultValue={course?.cHour}
                placeholder="Course Hour"
                onChange={(e) => {
                  setEditCourse({ ...editCourse, cHour: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Course Description</p>
              <Input
                defaultValue={course?.description || ""}
                placeholder="Course Description"
                onChange={(e) => {
                  setEditCourse({ ...editCourse, description: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Video Link</p>
              <Input
                defaultValue={course?.video || ""}
                placeholder="https://youtube..."
                onChange={(e) => {
                  setEditCourse({ ...editCourse, video: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Video Label</p>
              <Input
                defaultValue={course?.videoLabel}
                placeholder="Video Label"
                onChange={(e) => {
                  setEditCourse({ ...editCourse, videoLabel: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Level</p>
              <Select
                defaultValue={course?.levelId}
                onValueChange={(e) => {
                  setEditCourse({ ...editCourse, levelId: e });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>

                    {levels.map((item) => {
                      return (
                        <SelectItem value={item.id} key={item.id}>
                          {item.level}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p>Status</p>
              <Select
                defaultValue={course?.statusId}
                onValueChange={(e) => {
                  setEditCourse({ ...editCourse, statusId: e });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>

                    {status.map((item) => {
                      return (
                        <SelectItem value={item.id} key={item.id}>
                          {item.status}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p>Zoom Fee</p>
              <Input
                defaultValue={course?.zoomFee || ""}
                placeholder="Zoom fee :30000...."
                onChange={(e) => {
                  setEditCourse({ ...editCourse, zoomFee: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Teach Yourself Fee</p>
              <Input
                defaultValue={course?.teachYourSelfField || ""}
                placeholder="Teach Yourself fee"
                onChange={(e) => {
                  setEditCourse({
                    ...editCourse,
                    teachYourSelfField: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p>Couse Practice</p>
              <Input
                defaultValue={course?.cPractice}
                placeholder="Course Practice"
                onChange={(e) => {
                  setEditCourse({ ...editCourse, cPractice: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="bg-green-500 text-white mt-3 hover:bg-green-400"
            onClick={handleEditCourse}
            disabled={isLoading}
          >
            {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Update"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
