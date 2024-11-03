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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateLevel } from "@/store/Slices/LevelSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewLecturePayload } from "@/types/lectrues";
import { NewLevelPayload } from "@/types/level";
import { Plus, Spline } from "lucide-react";
import { useState } from "react";
import { CreateLecture } from "@/store/Slices/LectureSlice";
import { NewLectureDetailPayload } from "@/types/lectureDetail";
import { CreateLectureDetail } from "@/store/Slices/LectureDetailSlice";
import { NewExercisePayload } from "@/types/exercise";
import { CreateExercise } from "@/store/Slices/ExerciseSlice";

export const NewExerciseDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newExercise, setNewExercise] = useState<NewExercisePayload>({
    courseId: "",
    ename: "",
  });
  const { isLoading } = useAppSelector((state) => state.Exercises);
  const { courses } = useAppSelector((state) => state.Courses);

  const handleCreateExercise = () => {
    if (!newExercise.courseId || !newExercise.ename) {
      return toast({
        title: "Plase Fill Out All Fields",
        variant: "destructive",
      });
    }
    dispatch(
      CreateExercise({
        ...newExercise,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewExercise({
            courseId: "",
            ename: "",
          });
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
          <Plus className="w-3 h-3 mr-1" /> Add New Exercise
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add New Exercise</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <p>Exercise Title</p>
        <Input
          disabled={isLoading}
          placeholder="Exercise Tittle"
          onChange={(e) =>
            setNewExercise({
              ...newExercise,
              ename: e.target.value,
            })
          }
        />
        <p>Course</p>
        <Select
          onValueChange={(e) => {
            setNewExercise({ ...newExercise, courseId: e });
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

        <Button
          onClick={handleCreateExercise}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
        >
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Add"}{" "}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
