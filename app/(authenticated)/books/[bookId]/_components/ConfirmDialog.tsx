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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateBookOrder } from "@/store/Slices/BookOrderSlice";
import { CreateUserCourse } from "@/store/Slices/UserCourseSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spline } from "lucide-react";
import { useState } from "react";
interface Prop {
  bname: string;
  bId: string;
}

export const ConfirmDialog = ({ bname, bId }: Prop) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.App);
  const { isLoading } = useAppSelector((state) => state.BookOrders);
  const [address, setAddress] = useState<string>("");
  const handleCreateOrder = () => {
    if (!address) {
      return toast({ title: "Fill Your Address", variant: "destructive" });
    }
    dispatch(
      CreateBookOrder({
        userId: user.id,
        bookId: bId,
        address,
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
          Order Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Order
            <span className="font-bold text-2xl bg-gradient-to-r bg-clip-text text-transparent bg-yellow-400 via-purple-600 to-blue-500">
              {bname}
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
                <p>Address</p>
                <Input
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className=" text-red-500 text-sm font-bold mt-3">
          <ol className="list-decimal flex flex-col gap-3">
            <li>
              <p>Cash down (အိမ်အရောက်ငွေချေ)</p>
            </li>
            <li>
              <p>ဖုန်းနံပတ်နှင့် လိပ်စာ မှန်ကန်အောင် ထည့်ပြီးမှ order တင်ရန်</p>
              <p>Order Confirm ပြီးပါက Cancel ၍မရတော့ပါ။</p>
            </li>
          </ol>
        </div>
        <Button disabled={isLoading} onClick={handleCreateOrder}>
          {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Order"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
