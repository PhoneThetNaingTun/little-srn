"use client";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme/theme-toggle";
import { adminFetchApp } from "@/store/Slices/AdminDashBoardSlice";

const AdminNavBar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.AdminDashBoard);
  const { init } = useAppSelector((state) => state.AdminDashBoard);

  useEffect(() => {
    if (!init) {
      dispatch(adminFetchApp());
    }
  }, [init]);
  const Nav = [
    {
      id: 1,
      name: "Overview",
      href: "/adminDashBoard/",
      isActive: pathname.endsWith("adminDashBoard"),
    },
    {
      id: 2,
      name: "Books",
      href: "/adminDashBoard/books",
      isActive: pathname.endsWith("/books"),
    },
    {
      id: 3,
      name: "Courses",
      href: "/adminDashBoard/courses",
      isActive: pathname.endsWith("/courses"),
    },
    {
      id: 4,
      name: "Reviews",
      href: "/adminDashBoard/reviews",
      isActive: pathname.endsWith("/reviews"),
    },
    {
      id: 5,
      name: "Documents",
      href: "/adminDashBoard/documents",
      isActive: pathname.endsWith("/documents"),
    },
    {
      id: 5,
      name: "Enrollments",
      href: "/adminDashBoard/courseEnrollments",
      isActive: pathname.endsWith("/courseEnrollments"),
    },
  ];
  return (
    <div className="flex p-5 pb-3 w-full justify-between items-center border-b-2 font-sans font-semibold">
      <nav className="flex gap-3">
        {Nav.map((item) => {
          return (
            <Link
              key={item.id}
              href={item.href}
              className={
                item.isActive
                  ? "text-white dark:text-black bg-black dark:bg-white pt-1 pb-2 px-2 rounded-lg"
                  : "text-gray-500 pt-1 pb-2 px-2"
              }
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Avatar>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default AdminNavBar;
