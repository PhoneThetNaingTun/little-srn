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
import { CreateQuestion } from "@/store/Slices/QuestionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewCoursePayload } from "@/types/courses";
import { NewQuestionPayload } from "@/types/questions";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus, Spline } from "lucide-react";
import { useState } from "react";

export const NewQuestionDialog = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.Questions);
  const { exercises } = useAppSelector((state) => state.Exercises);
  const { adminAppLoading } = useAppSelector((state) => state.AdminDashBoard);
  const [imageFile, setImageFile] = useState<File>();
  const [newQuestion, setNewQuestion] = useState<NewQuestionPayload>({
    questionDescription: "",
    sample: "",
    questionImage: "",
    exerciseId: "",
  });

  const handleCreateQuestion = () => {
    if (
      !newQuestion.questionDescription ||
      !newQuestion.sample ||
      !newQuestion.exerciseId
    ) {
      return toast({ title: "Pleace Fill All Field", variant: "destructive" });
    }
    if (imageFile) {
      dispatch(
        uploadAsset({
          file: imageFile,
          onSuccess: (image) => {
            newQuestion.questionImage = image;
            dispatch(
              CreateQuestion({
                ...newQuestion,
                onSuccess: (message) => {
                  toast({ title: message, variant: "default" });
                  setNewQuestion({
                    questionDescription: "",
                    sample: "",
                    questionImage: "-",
                    exerciseId: "",
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
    } else {
      dispatch(
        CreateQuestion({
          ...newQuestion,
          questionImage: "-",
          onSuccess: (message) => {
            toast({ title: message, variant: "default" });
            setNewQuestion({
              questionDescription: "",
              sample: "",
              questionImage: "-",
              exerciseId: "",
            });
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
          <Plus className="w-3 h-3 mr-1" /> Add New Question
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add New Question</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>Question Description</p>
            <Input
              placeholder="Description"
              onChange={(e) => {
                setNewQuestion({
                  ...newQuestion,
                  questionDescription: e.target.value,
                });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>
          <div>
            <p> Sample</p>
            <Input
              placeholder="Sample"
              onChange={(e) => {
                setNewQuestion({ ...newQuestion, sample: e.target.value });
              }}
              disabled={isLoading || adminAppLoading}
            />
          </div>

          <div>
            <p>Exercise </p>
            <Select
              onValueChange={(e) => {
                setNewQuestion({ ...newQuestion, exerciseId: e });
              }}
              disabled={isLoading || adminAppLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Exercise" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Exercise</SelectLabel>

                  {exercises.map((item) => {
                    return (
                      <SelectItem value={item.id} key={item.id}>
                        {item.ename}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <p>Question Image (Optional)</p>
          <UploaderImage onDrop={(files) => setImageFile(files[0])} />
          {imageFile && (
            <Badge
              className="bg-gray-300 text-black "
              onClick={() => setImageFile(undefined)}
            >
              {imageFile.name}
              <span className="ml-2">
                <Cross2Icon />
              </span>
            </Badge>
          )}
        </div>
        <Button
          disabled={isLoading || adminAppLoading}
          onClick={handleCreateQuestion}
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
