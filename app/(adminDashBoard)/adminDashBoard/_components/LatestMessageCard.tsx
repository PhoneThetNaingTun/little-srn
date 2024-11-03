"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { MessageCircleHeart } from "lucide-react";

export const LatestMessageCard = () => {
  const { messages } = useAppSelector((state) => state.Messages);
  const { students } = useAppSelector((state) => state.Students);

  const studentMessages = messages.map((item) => {
    const studentName = students.find((stu) => stu.id === item.userId)?.name;
    const studentEmail = students.find((stu) => stu.id === item.userId)?.email;
    const studentImage = students.find((stu) => stu.id === item.userId)?.image;
    const id = item.id;
    const message = item.message;
    return { studentEmail, studentName, id, message, studentImage };
  });
  const tenStuMessages = studentMessages.slice(0, 10);
  return (
    <Card className="font-roboto">
      <CardHeader>
        <p className="font-semibold text-2xl flex items-center gap-3">
          <MessageCircleHeart /> Latest Message
        </p>
        <p className="text-sm opacity-50">
          You Have {studentMessages.length} Messages Right Now
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 max-h-[300px] overflow-y-scroll">
        {tenStuMessages.map((item) => {
          return (
            <div className="flex items-center gap-5">
              <Avatar>
                <AvatarImage src={item.studentImage || ""} />
                <AvatarFallback>{item.studentName}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{item.studentName}</p>
                <p className="opacity-75">{item.studentEmail}</p>
              </div>
              <div>
                <p>"{item.message}"</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
