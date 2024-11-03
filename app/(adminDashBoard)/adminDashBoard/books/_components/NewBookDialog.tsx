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
import { CreateBook } from "@/store/Slices/BookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewBookPayload } from "@/types/books";
import { Cross, Plus, Spline } from "lucide-react";
import { useState } from "react";
import { UploaderImage } from "../../../../../components/adminDashBoard/uploaderImage";
import { Badge } from "@/components/ui/badge";
import { uploadAsset } from "@/store/Slices/AdminDashBoardSlice";
import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";

export const NewBookDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoading } = useAppSelector((state) => state.Books);
  const [newBook, setNewBook] = useState<NewBookPayload>({
    title: "",
    author: "",
    pages: "",
    price: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File>();
  const { adminAppLoading } = useAppSelector((state) => state.AdminDashBoard);
  const handleCreateBook = () => {
    if (!newBook.title || !newBook.author || !newBook.pages || !newBook.price) {
      return toast({ title: "Please Enter All Field", variant: "destructive" });
    }
    if (imageFile) {
      dispatch(
        uploadAsset({
          file: imageFile,
          onSuccess: (image) => {
            newBook.image = image;
            dispatch(
              CreateBook({
                ...newBook,
                onSuccess: (message) => {
                  toast({ title: message, variant: "default" });
                  setNewBook({
                    title: "",
                    author: "",
                    pages: "",
                    price: "",
                    image: "",
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
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-700">
          <Plus className="w-3 h-3 mr-1" /> Add New Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Create new book by filling all fields
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>Title</p>
            <Input
              disabled={isLoading || adminAppLoading}
              onChange={(e) => {
                setNewBook({ ...newBook, title: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Author</p>
            <Input
              disabled={isLoading || adminAppLoading}
              onChange={(e) => {
                setNewBook({ ...newBook, author: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Pages</p>
            <Input
              disabled={isLoading || adminAppLoading}
              onChange={(e) => {
                setNewBook({ ...newBook, pages: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Price</p>
            <Input
              disabled={isLoading || adminAppLoading}
              onChange={(e) => {
                setNewBook({ ...newBook, price: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Image</p>
            <UploaderImage onDrop={(files) => setImageFile(files[0])} />
            {imageFile && (
              <Badge
                className="bg-gray-300 text-black "
                onClick={() => setImageFile(undefined)}
              >
                {imageFile.name}{" "}
                <span className="ml-2">
                  <Cross2Icon />
                </span>
              </Badge>
            )}
          </div>
        </div>
        <Button
          disabled={isLoading || adminAppLoading}
          onClick={handleCreateBook}
          className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-700"
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
