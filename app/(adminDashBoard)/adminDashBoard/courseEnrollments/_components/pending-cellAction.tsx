"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Spline, Trash } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { PendingColumn } from "./pending-columns";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ConfirmUserCourse,
  DeleteUserCourse,
} from "@/store/Slices/UserCourseSlice";
import { useToast } from "@/hooks/use-toast";

interface Prop {
  data: PendingColumn;
}

export const PendingCellAction = ({ data }: Prop) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoading } = useAppSelector((state) => state.UserCourses);
  const handleConfirmEnrollment = () => {
    dispatch(
      ConfirmUserCourse({
        id: data.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteEnrollment = () => {
    dispatch(
      DeleteUserCourse({
        id: data.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className="flex gap-3">
      <Button
        disabled={isLoading}
        className="bg-green-500 text-white hover:bg-green-700"
        onClick={handleConfirmEnrollment}
      >
        {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Confirm"}
      </Button>
      <Button
        disabled={isLoading}
        className="bg-red-500 text-white hover:bg-red-700"
        onClick={handleDeleteEnrollment}
      >
        {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Cancel"}
      </Button>
    </div>
  );
};
