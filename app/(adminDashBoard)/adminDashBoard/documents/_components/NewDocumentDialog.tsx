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
import { NewDocumentPayload } from "@/types/documents";
import { CreateDocument } from "@/store/Slices/DocumentSlice";

export const NewDocumentDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newDocument, setNewDocument] = useState<NewDocumentPayload>({
    dname: "",
    dlink: "",
  });
  const { isLoading } = useAppSelector((state) => state.Documents);

  const handleCreateDocument = () => {
    if (!newDocument.dname || !newDocument.dlink) {
      return toast({
        title: "Plase Fill Out All Fields",
        variant: "destructive",
      });
    }
    dispatch(
      CreateDocument({
        ...newDocument,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewDocument({ dname: "", dlink: "" });
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
          <Plus className="w-3 h-3 mr-1" /> Add New Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p>Add New Document</p>
          <DialogDescription>
            <p>Please Fill All Fields</p>
          </DialogDescription>
        </DialogHeader>
        <p>Document Name</p>
        <Input
          disabled={isLoading}
          placeholder="Document Name"
          onChange={(e) =>
            setNewDocument({ ...newDocument, dname: e.target.value })
          }
        />
        <p>Document Link</p>
        <Input
          disabled={isLoading}
          placeholder="Document Link "
          onChange={(e) =>
            setNewDocument({ ...newDocument, dlink: e.target.value })
          }
        />
        <Button
          onClick={handleCreateDocument}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800"
        >
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Add"}{" "}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
