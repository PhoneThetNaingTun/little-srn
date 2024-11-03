"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateCourseReview } from "@/store/Slices/CourseReviewSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spline } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const ReviewBox = () => {
  const param = useParams();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [reviewMessage, setReviewMessage] = useState<string>("");
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
        <p>Give Review About This Course</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 ">
        <Input
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
      </CardContent>
    </Card>
  );
};
