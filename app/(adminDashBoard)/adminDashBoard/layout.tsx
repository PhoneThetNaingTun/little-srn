"use client";
import AdminNavBar from "@/components/adminDashBoard/AdminNavBar";
import { adminFetchApp } from "@/store/Slices/AdminDashBoardSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

const AdminLayout = ({ children }: Prop) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.AdminDashBoard);

  if (!user) {
    return (
      <div className="flex justify-center items-center text-5xl font-bold h-screen">
        <p>You Dont Have Access</p>
      </div>
    );
  } else {
    if (user.role === "User") {
      router.push("/");
      return (
        <div className="flex justify-center items-center text-5xl font-bold h-screen">
          <p>You Dont Have Access</p>{" "}
        </div>
      );
    }
    return (
      <div>
        <AdminNavBar />
        <div className="p-5 px-9"> {children}</div>
      </div>
    );
  }
};

export default AdminLayout;
