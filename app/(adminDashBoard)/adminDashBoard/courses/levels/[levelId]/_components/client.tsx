"use client";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DeleteLevel, EditLevel } from "@/store/Slices/LevelSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateLevelPayload } from "@/types/level";
import { Spline } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LevelDetailPageClient = () => {
  const param = useParams();
  const { levelId } = param;
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { levels, isLoading } = useAppSelector((state) => state.Levels);
  const level = levels.find((lvl) => lvl.id === levelId);
  const [editLevel, setEditLevel] = useState<UpdateLevelPayload>({
    id: "",
    level: "",
  });
  useEffect(() => {
    if (level) {
      setEditLevel(level);
    }
  }, [level]);
  const handleEditLevel = () => {
    if (!editLevel.level) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      EditLevel({
        ...editLevel,
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
  const handleDeleteLevel = () => {
    dispatch(
      DeleteLevel({
        id: editLevel.id,
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
            Edit Level Details
          </h3>
          <div className="">
            <DeleteDialog OnDelete={handleDeleteLevel} loading={isLoading} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {" "}
          <p>Level</p>
          <Input
            defaultValue={level?.level}
            onChange={(e) => {
              setEditLevel({ ...editLevel, level: e.target.value });
            }}
          />
        </div>

        <div>
          <div className="flex justify-end">
            <Button
              className="bg-green-500 text-white mt-3 hover:bg-green-400"
              onClick={handleEditLevel}
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
  );
};
