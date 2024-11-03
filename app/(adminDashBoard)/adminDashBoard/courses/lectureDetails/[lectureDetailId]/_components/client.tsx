"use client";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spline } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateLectureDetailPayload } from "@/types/lectureDetail";
import {
  DeleteLectureDetail,
  EditLectureDetail,
} from "@/store/Slices/LectureDetailSlice";

export const LectureDetailDetailPageClient = () => {
  const param = useParams();
  const { lectureDetailId } = param;
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { lectureDetails, isLoading } = useAppSelector(
    (state) => state.LectureDetails
  );
  const { lectures } = useAppSelector((state) => state.Lectures);
  const lectureDetail = lectureDetails.find(
    (lec) => lec.id === lectureDetailId
  );
  const [editLectureDetail, setEditLectureDetail] =
    useState<UpdateLectureDetailPayload>({
      id: "",
      lectureDetailName: "",
      lectureLink: "",
      lectureId: "",
    });
  useEffect(() => {
    if (lectureDetail) {
      setEditLectureDetail(lectureDetail);
    }
  }, [lectureDetail]);
  const handleEditLectureDetail = () => {
    if (
      !editLectureDetail.lectureDetailName ||
      !editLectureDetail.lectureId ||
      !editLectureDetail.lectureLink
    ) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      EditLectureDetail({
        ...editLectureDetail,
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
  const handleDeleteLectureDetatil = () => {
    dispatch(
      DeleteLectureDetail({
        id: editLectureDetail.id,
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
    <div className="flex items-center justify-around">
      <div>
        <iframe
          src={lectureDetail?.lectureLink || ""}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className=""
        ></iframe>
      </div>
      <Card className="w-1/2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
              Edit Lecture Details Details
            </h3>
            <div className="">
              <DeleteDialog
                OnDelete={handleDeleteLectureDetatil}
                loading={isLoading}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {" "}
            <div className="flex flex-col gap-3">
              <p>Lecture Detail Name</p>
              <Input
                defaultValue={lectureDetail?.lectureDetailName}
                onChange={(e) => {
                  setEditLectureDetail({
                    ...editLectureDetail,
                    lectureDetailName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Lecture Video</p>
              <Input
                defaultValue={lectureDetail?.lectureLink}
                onChange={(e) => {
                  setEditLectureDetail({
                    ...editLectureDetail,
                    lectureLink: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p>Lecture Title</p>
              <Select
                defaultValue={lectureDetail?.lectureId}
                onValueChange={(e) => {
                  setEditLectureDetail({ ...editLectureDetail, lectureId: e });
                }}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Lecture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Lecture</SelectLabel>

                    {lectures.map((item) => {
                      return (
                        <SelectItem value={item.id} key={item.id}>
                          {item.title}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex justify-end">
              <Button
                className="bg-green-500 text-white mt-3 hover:bg-green-400"
                onClick={handleEditLectureDetail}
                disabled={isLoading}
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
    </div>
  );
};
