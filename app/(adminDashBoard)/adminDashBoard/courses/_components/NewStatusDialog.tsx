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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateStatus } from "@/store/Slices/StatusSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewStatusPayload } from "@/types/status";

import { Plus, Spline } from "lucide-react";
import { useState } from "react";

export const NewStatusDialog = () => {
  const [newStatus, setNewStatus] = useState<NewStatusPayload>({ status: "" });
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.Status);
  const { toast } = useToast();
  const handleCreateStatus = () => {
    if (!newStatus) {
      return toast({
        title: "Please Fill Out ALL field",
        variant: "destructive",
      });
    }
    dispatch(
      CreateStatus({
        ...newStatus,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewStatus({ status: "" });
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
          <Plus className="w-3 h-3 mr-1" /> Add New Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add Status Level</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <p>Status</p>
        <Input
          disabled={isLoading}
          placeholder="Status"
          onChange={(e) =>
            setNewStatus({ ...newStatus, status: e.target.value })
          }
        />
        <Button
          onClick={handleCreateStatus}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
        >
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Add"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
