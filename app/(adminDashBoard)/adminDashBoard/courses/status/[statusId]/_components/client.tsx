"use client";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DeleteStatus, EditStatus } from "@/store/Slices/StatusSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateStatusPayload } from "@/types/status";
import { Spline } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const StatusDetailPageClient = () => {
  const param = useParams();
  const { statusId } = param;
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, isLoading } = useAppSelector((state) => state.Status);
  const [editStatus, setEditStatus] = useState<UpdateStatusPayload>({
    id: "",
    status: "",
  });
  const stat = status.find((item) => item.id === statusId);

  useEffect(() => {
    if (stat) {
      setEditStatus(stat);
    }
  }, [status]);
  const handleEditStatus = () => {
    if (!editStatus.status) {
      return toast({
        title: "Pleace fill out all field",
        variant: "destructive",
      });
    }
    dispatch(
      EditStatus({
        ...editStatus,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/courses");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteStatus = () => {
    dispatch(
      DeleteStatus({
        id: editStatus.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/courses");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Card className="w-1/2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
            Edit Status Details
          </h3>
          <div className="">
            <DeleteDialog OnDelete={handleDeleteStatus} loading={isLoading} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <p>Level</p>
          <Input
            defaultValue={stat?.status}
            onChange={(e) => {
              setEditStatus({ ...editStatus, status: e.target.value });
            }}
          />
        </div>

        <div>
          <div className="flex justify-end">
            <Button
              onClick={handleEditStatus}
              disabled={isLoading}
              className="bg-green-500 text-white mt-3 hover:bg-green-400"
            >
              {isLoading ? (
                <Spline className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
