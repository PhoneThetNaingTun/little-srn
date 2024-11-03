"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spline, Trash2 } from "lucide-react";

interface Prop {
  OnDelete: () => void;
  loading: boolean;
}

export const DeleteDialog = ({ OnDelete, loading }: Prop) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={loading}
          className="bg-red-600 hover:bg-red-500 text-white"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you sure you want to delete?</DialogHeader>
        <DialogDescription>This action cannt be undone!</DialogDescription>
        <div className="flex justify-between">
          <Button
            disabled={loading}
            className="bg-red-600 hover:bg-red-500 text-white"
            onClick={OnDelete}
          >
            {loading ? <Spline className="h-4 w-4 animate-spin" /> : "Delete"}
          </Button>
          <DialogClose>
            <Button disabled={loading} variant="ghost">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
