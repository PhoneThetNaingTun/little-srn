"use client";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DeleteQuestion, EditQuestion } from "@/store/Slices/QuestionSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateQuestionPayload } from "@/types/questions";
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
import Image from "next/image";

export const QuestionDetailPageClient = () => {
  const param = useParams();
  const { questionId } = param;
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { questions, isLoading } = useAppSelector((state) => state.Questions);
  const { exercises } = useAppSelector((state) => state.Exercises);
  const question = questions.find((quest) => quest.id === questionId);
  const [editQuestion, setEditQuestion] = useState<UpdateQuestionPayload>({
    id: "",
    questionDescription: "",
    sample: "",
    questionImage: "",
    exerciseId: "",
  });
  useEffect(() => {
    if (question) {
      setEditQuestion(question);
    }
  }, [question]);
  const handleEditQuestion = () => {
    if (
      !editQuestion.questionDescription ||
      !editQuestion.sample ||
      !editQuestion.exerciseId
    ) {
      return toast({ title: "Pleace Fill All Field", variant: "destructive" });
    }
    dispatch(
      EditQuestion({
        ...editQuestion,
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
  const handleDeleteQuestion = () => {
    dispatch(
      DeleteQuestion({
        id: editQuestion.id,
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
    <div className="grid grid-cols-2">
      <Card className="">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
              Edit Level Details
            </h3>
            <div className="">
              <DeleteDialog
                OnDelete={handleDeleteQuestion}
                loading={isLoading}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            {" "}
            <div className="flex flex-col gap-3">
              {" "}
              <p>Quest Description</p>
              <Input
                defaultValue={editQuestion.questionDescription}
                onChange={(e) => {
                  setEditQuestion({
                    ...editQuestion,
                    questionDescription: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              {" "}
              <p>Quest Sample</p>
              <Input
                defaultValue={editQuestion.sample}
                onChange={(e) => {
                  setEditQuestion({
                    ...editQuestion,
                    sample: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p>Exercise </p>
              <Select
                defaultValue={question?.exerciseId}
                onValueChange={(e) => {
                  setEditQuestion({ ...editQuestion, exerciseId: e });
                }}
                disabled={isLoading}
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
            <div>
              <div className="flex justify-end">
                <Button
                  className="bg-green-500 text-white mt-3 hover:bg-green-400"
                  onClick={handleEditQuestion}
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
          </div>
        </CardContent>
      </Card>
      <div className="m-auto">
        {question?.questionImage ? (
          <Image
            src={`/uploads/${question.questionImage}` || ""}
            alt=""
            width={300}
            height={300}
          />
        ) : null}
      </div>
    </div>
  );
};
