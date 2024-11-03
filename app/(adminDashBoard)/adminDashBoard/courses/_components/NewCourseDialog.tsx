"use client";
import { UploaderImage } from "@/components/adminDashBoard/uploaderImage";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { uploadAsset } from "@/store/Slices/AdminDashBoardSlice";
import { CreateCourse } from "@/store/Slices/CourseSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewCoursePayload } from "@/types/courses";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus, Spline } from "lucide-react";
import { useState } from "react";

export const NewCourseDialog = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.Status);
  const { levels } = useAppSelector((state) => state.Levels);
  const { isLoading } = useAppSelector((state) => state.Courses);
  const { adminAppLoading } = useAppSelector((state) => state.AdminDashBoard);
  const [imageFile, setImageFile] = useState<File>();
  const [newCourse, setNewCourse] = useState<NewCoursePayload>({
    levelId: "",
    statusId: "",
    cName: "",
    cHour: "",
    video: "",
    zoomFee: "",
    teachYourSelfField: "",
    image: "",
    cPractice: "",
    videoLabel: "",
    description: "",
  });

  const handleCreateCourse = () => {
    if (
      !newCourse.levelId ||
      !newCourse.statusId ||
      !newCourse.cName ||
      !newCourse.cHour ||
      !newCourse.video ||
      !newCourse.videoLabel ||
      !newCourse.cPractice
    ) {
      return toast({ title: "Pleace Fill All Field", variant: "destructive" });
    }
    if (imageFile) {
      dispatch(
        uploadAsset({
          file: imageFile,
          onSuccess: (image) => {
            newCourse.image = image;
            dispatch(
              CreateCourse({
                ...newCourse,
                onSuccess: (message) => {
                  toast({ title: message, variant: "default" });
                  setNewCourse({
                    levelId: "",
                    statusId: "",
                    cName: "",
                    cHour: "",
                    video: "",
                    zoomFee: "",
                    teachYourSelfField: "",
                    image: "",
                    cPractice: "",
                    videoLabel: "",
                    description: "",
                  });
                },
                onError: (error) => {
                  toast({ title: error, variant: "destructive" });
                },
              })
            );
          },
          onError: (error) => {
            toast({ title: error, variant: "destructive" });
          },
        })
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-700">
          <Plus className="w-3 h-3 mr-1" /> Add New Course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add New Course</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>Course Name</p>
            <Input
              placeholder="Course Name"
              onChange={(e) => {
                setNewCourse({ ...newCourse, cName: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p>Course Hour</p>
            <Input
              placeholder="Course Hour"
              onChange={(e) => {
                setNewCourse({ ...newCourse, cHour: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p>Course Description</p>
            <Input
              placeholder="Course Description"
              onChange={(e) => {
                setNewCourse({ ...newCourse, description: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p>Video Link</p>
            <Input
              placeholder="https://youtube..."
              onChange={(e) => {
                setNewCourse({ ...newCourse, video: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p>Video Label</p>
            <Input
              placeholder="Video Label"
              onChange={(e) => {
                setNewCourse({ ...newCourse, videoLabel: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p>Level</p>
            <Select
              onValueChange={(e) => {
                setNewCourse({ ...newCourse, levelId: e });
              }}
              disabled={isLoading || adminAppLoading}
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
              onValueChange={(e) => {
                setNewCourse({ ...newCourse, statusId: e });
              }}
              disabled={isLoading || adminAppLoading}
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
              placeholder="Zoom fee :30000...."
              onChange={(e) => {
                setNewCourse({ ...newCourse, zoomFee: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p>Teach Yourself Fee</p>
            <Input
              placeholder="Teach Yourself fee"
              onChange={(e) => {
                setNewCourse({
                  ...newCourse,
                  teachYourSelfField: e.target.value,
                });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p>Couse Practice</p>
            <Input
              placeholder="Course Practice"
              onChange={(e) => {
                setNewCourse({ ...newCourse, cPractice: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
        </div>
        <div>
          <p>Course Image</p>
          <UploaderImage onDrop={(files) => setImageFile(files[0])} />
          {imageFile && (
            <Badge
              className="bg-gray-300 text-black "
              onClick={() => setImageFile(undefined)}
            >
              {imageFile.name}{" "}
              <span className="ml-2">
                <Cross2Icon />
              </span>
            </Badge>
          )}
        </div>
        <Button
          disabled={isLoading || adminAppLoading}
          onClick={handleCreateCourse}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
        >
          {isLoading || adminAppLoading ? (
            <Spline className="h-4 w-4 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
