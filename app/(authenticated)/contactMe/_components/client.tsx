"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateMessage } from "@/store/Slices/MessageSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Spline } from "lucide-react";
import { useState } from "react";

export const ContactMePageClient = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string>("");
  const { user } = useAppSelector((state) => state.App);
  const { isLoading } = useAppSelector((state) => state.Messages);
  const handleMessageSend = () => {
    if (!message) {
      toast({ title: "Fill Out Message", variant: "destructive" });
    }
    dispatch(
      CreateMessage({
        message,
        userId: user.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setMessage("");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className="p-5">
      <Card>
        <CardHeader>
          <p className="font-semibold text-xl">Send Me Message</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input
            placeholder="Message Here"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-violet-500 text-white">
                  <PaperPlaneIcon /> Send
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <p>Message</p>
                </DialogHeader>
                <DialogDescription>
                  <div className="flex flex-col gap-3 ">
                    <Avatar>
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3">
                      <p>Name: {user.name}</p>
                      <p>Email: {user.email}</p>
                      <p>Phone Number: {user.phone}</p>
                      <p>Date Of Birth: {user.dateOfBirth}</p>
                    </div>
                  </div>
                </DialogDescription>
                <div>
                  <p>Message:"{message}"</p>
                </div>
                <Button
                  onClick={handleMessageSend}
                  className="bg-violet-500 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spline className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <PaperPlaneIcon /> Send
                    </>
                  )}
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
