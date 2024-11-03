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
import { CreateLevel } from "@/store/Slices/LevelSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewLevelPayload } from "@/types/level";
import { Plus, Spline } from "lucide-react";
import { useState } from "react";

export const NewLevelDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newLevel, setNewLevel] = useState<NewLevelPayload>({ level: "" });
  const { isLoading } = useAppSelector((state) => state.Levels);
  const handleLevelCreate = () => {
    if (!newLevel.level) {
      return toast({ title: "Please Enter All Field", variant: "destructive" });
    }
    dispatch(
      CreateLevel({
        ...newLevel,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewLevel({ level: "" });
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
          <Plus className="w-3 h-3 mr-1" /> Add New Level
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add New Level</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <p>Level</p>
        <Input
          disabled={isLoading}
          placeholder="Level"
          onChange={(e) => setNewLevel({ ...newLevel, level: e.target.value })}
        />
        <Button
          onClick={handleLevelCreate}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
        >
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Add"}{" "}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
