"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Profile from "../../../../public/profile.jpg";
import { useEffect, useState } from "react";
import { UpdateUserPayload } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { UpdateProfile } from "@/store/Slices/AppSlice";
import { useParams } from "next/navigation";
import PurpleWave from "../../../../public/purple Profile Wave.svg";
import { Spline } from "lucide-react";

const ProfilePageClientSide = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const param = useParams();
  const { profileId } = param;
  const { user, userAppLoading } = useAppSelector((state) => state.App);

  if (!user) {
    return null;
  }
  const [updateProfile, setUpdateProfile] = useState<UpdateUserPayload>({
    id: profileId as string,
    phone: user.phone || "",
    dob: user.dateOfBirth || "",
  });
  useEffect(() => {
    //@ts-ignore
    setUpdateProfile(user);
  }, [user]);
  const handleUpdateProfile = () => {
    if (!updateProfile.phone && !updateProfile.dob) {
      return toast({
        title: "Please Enter Phone Number And Date Of Birth",
        variant: "destructive",
      });
    }
    dispatch(
      UpdateProfile({
        ...updateProfile,
        onSuccess: (message) => {
          toast({
            title: message,
            variant: "default",
          });
        },
        onError: (error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        },
      })
    );
  };
  return (
    <div className="relative h-screen p-2 md:pt-10 md:pl-10 md:pb-0 md:pr-0">
      <div className="flex flex-col text-center md:flex-row md:text-start gap-3 items-center">
        <Image
          src={user.image || Profile}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-sm md:text-lg">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 bg-white lg:w-[50%] p-5 mt-4 rounded-lg">
        <div className="mt-4 flex gap-3 items-center ">
          <p className="text-lg flex-1 ">Phone</p>
          <Input
            defaultValue={user.phone || ""}
            className="flex-1 bg-white rounded-md"
            disabled={userAppLoading}
            min={9}
            onChange={(e) => {
              setUpdateProfile({ ...updateProfile, phone: e.target.value });
            }}
          />
        </div>
        <div className="mt-4 flex gap-3 items-center ">
          <p className="text-lg flex-1 ">Date Of Birth</p>
          <Input
            defaultValue={user.dateOfBirth || ""}
            className="flex-1 bg-white rounded-md"
            type="date"
            disabled={userAppLoading}
            onChange={(e) => {
              setUpdateProfile({ ...updateProfile, dob: e.target.value });
            }}
          />
        </div>
        <div className="flex justify-end ">
          <Button
            disabled={userAppLoading}
            onClick={handleUpdateProfile}
            className="bg-violet-500 text-white"
          >
            {userAppLoading ? (
              <Spline className="h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
      <Image
        src={PurpleWave}
        alt="svg"
        className="w-full absolute bottom-0 right-0"
      />
    </div>
  );
};

export default ProfilePageClientSide;
