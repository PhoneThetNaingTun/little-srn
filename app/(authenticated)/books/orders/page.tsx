"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CancleBookOrder } from "@/store/Slices/BookOrderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spline } from "lucide-react";
import Image from "next/image";

const OrderPage = () => {
  const { bookOrders, isLoading } = useAppSelector((state) => state.BookOrders);
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.Books);
  const { toast } = useToast();
  const orders = bookOrders.map((item) => {
    const bookName = books.find((book) => book.id === item.bookId)?.title;
    const author = books.find((book) => book.id === item.bookId)?.author;
    const price = books.find((book) => book.id === item.bookId)?.price;
    const image = books.find((book) => book.id === item.bookId)?.image;
    const id = item.id;
    const confirm = item.orderConfirm;
    const address = item.address;
    return { bookName, author, price, id, image, address, confirm };
  });
  const handleCancleOrder = (id: string) => {
    dispatch(
      CancleBookOrder({
        id,
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
    <div className="p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-transparent">
      <p className="text-violet-500 font-semibold text-3xl mb-5">Book Orders</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {orders.map((item) => {
          return (
            <Card>
              <CardHeader className="text-2xl font-semibold">
                Title:{item.bookName}
              </CardHeader>
              <CardContent className="flex relative items-start gap-4">
                <div>
                  <Image
                    src={`/uploads/${item.image}` || ""}
                    alt="image"
                    width={200}
                    height={250}
                  />
                </div>
                <div>
                  <p className="font-semibold text-xl">Author:{item.author}</p>
                  <p>Price:{item.price}</p>
                  <p>Address:{item.address}</p>
                </div>
                <div className="absolute right-4 bottom-3">
                  {item.confirm ? (
                    <p className="text-xl text-purple-500">Order Confirmed</p>
                  ) : (
                    <Button
                      className=" bg-red-500 text-white"
                      onClick={() => {
                        handleCancleOrder(item.id);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spline className="h-4 w-4 animate-spin" />
                      ) : (
                        "Cancel Order"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
