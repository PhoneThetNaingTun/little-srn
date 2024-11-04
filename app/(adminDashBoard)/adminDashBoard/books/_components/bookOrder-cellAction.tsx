"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookColum } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Spline, Trash } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { BookOrderColumn } from "./bookOrder-columns";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CancleBookOrder,
  ConfirmBookOrder,
} from "@/store/Slices/BookOrderSlice";
import { BoookOrders } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

interface Prop {
  data: BookOrderColumn;
}

export const BookOrderCellAction = ({ data }: Prop) => {
  const dispatch = useAppDispatch();
  const { bookOrders, isLoading } = useAppSelector((state) => state.BookOrders);
  const bookorder = bookOrders.find(
    (item) => item.id === data.id
  ) as BoookOrders;
  const { toast } = useToast();
  return (
    <>
      {bookorder.orderConfirm ? (
        <p>Confirmed</p>
      ) : (
        <div className="flex gap-3">
          <Button
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-700 text-white"
            onClick={() => {
              dispatch(
                ConfirmBookOrder({
                  ...bookorder,
                  onSuccess: (message) => {
                    toast({ title: message, variant: "default" });
                  },
                  onError: (error) => {
                    toast({ title: error, variant: "destructive" });
                  },
                })
              );
            }}
          >
            {isLoading ? (
              <Spline className="h-4 w-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
          <Button
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-700 text-white"
            onClick={() => {
              dispatch(
                CancleBookOrder({
                  id: data.id,
                  onSuccess: (message) => {
                    toast({ title: message, variant: "default" });
                  },
                  onError: (error) => {
                    toast({ title: error, variant: "destructive" });
                  },
                })
              );
            }}
          >
            {isLoading ? <Spline className="h-4 w-4 animate-spin" /> : "Cancel"}
          </Button>
        </div>
      )}
    </>
  );
};
