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

export const NewLectureDetailDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newLectureDetail, setNewLectureDetail] =
    useState<NewLectureDetailPayload>({
      lectureDetailName: "",
      lectureLink: "",
      lectureId: "",
    });
  const { isLoading } = useAppSelector((state) => state.LectureDetails);
  const { lectures } = useAppSelector((state) => state.Lectures);

  const handleCreateLectureDetail = () => {
    if (
      !newLectureDetail.lectureDetailName ||
      !newLectureDetail.lectureId ||
      !newLectureDetail.lectureLink
    ) {
      return toast({
        title: "Plase Fill Out All Fields",
        variant: "destructive",
      });
    }
    dispatch(
      CreateLectureDetail({
        ...newLectureDetail,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewLectureDetail({
            lectureDetailName: "",
            lectureLink: "",
            lectureId: "",
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
          <Plus className="w-3 h-3 mr-1" /> Add New Lecture Detail
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add New Lecture Detail</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <p>Lecture Detail Title</p>
        <Input
          disabled={isLoading}
          placeholder="Lecture Detail Tittle"
          onChange={(e) =>
            setNewLectureDetail({
              ...newLectureDetail,
              lectureDetailName: e.target.value,
            })
          }
        />
        <p>Lecture</p>
        <Select
          onValueChange={(e) => {
            setNewLectureDetail({ ...newLectureDetail, lectureId: e });
          }}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Lecture" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Lecture</SelectLabel>

              {lectures.map((item) => {
                return (
                  <SelectItem value={item.id} key={item.id}>
                    {item.title}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p>Lecture Video Link</p>
        <Input
          disabled={isLoading}
          placeholder="https://youtube....."
          onChange={(e) =>
            setNewLectureDetail({
              ...newLectureDetail,
              lectureLink: e.target.value,
            })
          }
        />
        <Button
          onClick={handleCreateLectureDetail}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
        >
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Add"}{" "}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
