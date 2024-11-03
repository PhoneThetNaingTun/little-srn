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
import { UpdateExercisePayload } from "@/types/exercise";
import { DeleteExercise, EditExercise } from "@/store/Slices/ExerciseSlice";

export const ExerciseDetailPageClient = () => {
  const param = useParams();
  const { exerciseId } = param;
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { exercises, isLoading } = useAppSelector((state) => state.Exercises);
  const { courses } = useAppSelector((state) => state.Courses);
  const exercise = exercises.find((exc) => exc.id === exerciseId);
  const [editExercise, setEditExercise] = useState<UpdateExercisePayload>({
    id: "",
    ename: "",
    courseId: "",
  });
  useEffect(() => {
    if (exercise) {
      setEditExercise(exercise);
    }
  }, [exercise]);
  const handleEditExercise = () => {
    if (!editExercise.ename || !editExercise.courseId) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      EditExercise({
        ...editExercise,
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
  const handleDeleteExercise = () => {
    dispatch(
      DeleteExercise({
        id: editExercise.id,
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
            <DeleteDialog OnDelete={handleDeleteExercise} loading={isLoading} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <p>Exercise Title</p>
          <Input
            defaultValue={exercise?.ename}
            onChange={(e) => {
              setEditExercise({ ...editExercise, ename: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Course</p>
          <Select
            defaultValue={exercise?.courseId}
            onValueChange={(e) => {
              setEditExercise({ ...editExercise, courseId: e });
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
              onClick={handleEditExercise}
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
