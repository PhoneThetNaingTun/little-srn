"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateBookReviews } from "@/store/Slices/BookReviewSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { MessageCircle, Spline } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const ReviewDialog = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { bookId } = param;
  const { toast } = useToast();
  const { books } = useAppSelector((state) => state.Books);
  const { user } = useAppSelector((state) => state.App);
  const { isLoading } = useAppSelector((state) => state.BookReview);
  const [review, setReview] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const book = books.find((item) => item.id === bookId);
  const handleSubmitReview = () => {
    if (!review) {
      return toast({ title: "Fill Your Address", variant: "destructive" });
    }
    dispatch(
      CreateBookReviews({
        userId: user.id,
        bookId: bookId as string,
        review,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setReview("");
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
        <Button className="text-white">
          <MessageCircle />
          Give Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p className="text-2xl  font-semibold bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-violet-500 to-blue-500">
            <span className="text-black">Title: </span>
            {book?.title}
          </p>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Message Here"
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="flex justify-end">
            {" "}
            <Button
              disabled={isLoading}
              onClick={handleSubmitReview}
              className="bg-purple-500 text-white"
            >
              <PaperPlaneIcon />
              {isLoading ? (
                <Spline className="h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
