"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateCourseReview } from "@/store/Slices/CourseReviewSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MessageCirclePlus, Spline } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const ReviewBox = () => {
  const param = useParams();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [reviewMessage, setReviewMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.App);
  const { isLoading } = useAppSelector((state) => state.CourseReviews);
  const { yourCourseId } = param;
  const handleSubmitReview = () => {
    dispatch(
      CreateCourseReview({
        userId: user.id,
        courseId: String(yourCourseId),
        review: reviewMessage,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setReviewMessage("");
          setOpen(false);
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="text-white bg-purple-500 hover:bg-purple-700"
        >
          <MessageCirclePlus />
          Give Reviews
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Give Review About This Course</p>
        </DialogHeader>
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmitReview();
            }
          }}
          defaultValue={reviewMessage}
          placeholder="Message Here"
          onChange={(e) => setReviewMessage(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitReview} disabled={isLoading}>
            {isLoading ? (
              <Spline className="h-4 w-4 animate-spin" />
            ) : (
              "Submint"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
