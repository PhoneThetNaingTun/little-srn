"use client";
import { PersonStanding } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { Separator } from "@/components/ui/separator";

export const LatestUserCard = () => {
  const { students } = useAppSelector((state) => state.Students);
  const LastFiveStudents = students.slice(0, 5);
  return (
    <Card className="font-roboto">
      <CardHeader>
        <p className="font-semibold text-2xl flex items-center gap-3">
          <PersonStanding /> Latest Users
        </p>
        <p className="text-sm opacity-50">
          You Have {students.length} Users Logged
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {LastFiveStudents.map((item) => {
          return (
            <div key={item.id}>
              <div className="flex items-center gap-5">
                <Avatar>
                  <AvatarImage src={item.image || ""} />
                  <AvatarFallback>{item.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="opacity-75">{item.email}</p>
                </div>
              </div>

              <Separator className="my-3" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
