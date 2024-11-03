"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateUserCourse } from "@/store/Slices/UserCourseSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spline } from "lucide-react";
interface Prop {
  cname: string;
  courseId: string;
}

export const ConfirmDialog = ({ cname, courseId }: Prop) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.App);
  const { isLoading } = useAppSelector((state) => state.UserCourses);
  const handleCreateEnrollment = () => {
    dispatch(
      CreateUserCourse({
        userId: user.id,
        courseId,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-violet-500 text-white text-sm md:text-lg">
          Enroll Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Enroll{" "}
            <span className="font-bold text-2xl bg-gradient-to-r bg-clip-text text-transparent bg-yellow-400 via-purple-600 to-blue-500">
              {cname}
            </span>{" "}
            ?
          </DialogTitle>
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
        </DialogHeader>
        <div className=" text-red-500 text-sm font-bold mt-3">
          <ol className="list-decimal flex flex-col gap-3">
            <li>
              <p>
                သင်တန်း Fee ကို kpay - 09797207374 Daw Myat Mon Aye account
                သို့သင်တန်းကြေးသွင်းပါ။
              </p>
            </li>
            <li>
              <p>
                သင်တန်းကြေးသွင်းထားသော အထောက်ထားကို StudyRightnow ရဲ့ page
                messenger ကိုပေးပို့ပေးပါ။
              </p>
            </li>
            <li>
              <p>
                Admin Approve ရလျှင် Your Courses အောက်ကနေ မိမိအပ်နှံထားသော
                အတန်းကို ရွေးချယ်ပြီး လေ့လာနိုင်ပြီဖြစ်ပါသည်။
              </p>
            </li>
          </ol>
        </div>
        <Button disabled={isLoading} onClick={handleCreateEnrollment}>
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Enroll"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
