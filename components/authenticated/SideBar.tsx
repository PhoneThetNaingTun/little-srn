"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signOut } from "next-auth/react";
import { BookA, BookDown, BookOpenCheck, RegexIcon } from "lucide-react";
import Profile from "../../public/profile.jpg";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { fetchApp } from "@/store/Slices/AppSlice";

interface Prop {
  children: ReactNode;
}

export function SideBarNav({ children }: Prop) {
  const { user } = useAppSelector((state) => state.App);
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.App);
  useEffect(() => {
    if (!init) {
      dispatch(fetchApp());
    }
  }, [init]);

  const links = [
    {
      label: "Available Courses",
      href: "/availableCourses",
      icon: (
        <BookA className="text-blue-950 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Your Courses",
      href: "/yourCourses",
      icon: (
        <BookDown className="text-blue-950 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Your Enrollments",
      href: "/enrollments",
      icon: (
        <BookOpenCheck className="text-blue-950 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-white w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between bg-white  gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} setOpen={setOpen} />
              ))}
              <form
                action={async () => {
                  await signOut({ redirectTo: "/auth/login" });
                }}
              >
                <button type="submit">
                  {open ? (
                    <span className="flex gap-2">
                      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />{" "}
                      <span className="text-[14px]">Logout</span>
                    </span>
                  ) : (
                    <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  )}
                </button>
              </form>
            </div>
          </div>
          <div>
            <SidebarLink
              setOpen={setOpen}
              link={{
                label: user.name || "",
                href: `/profile/${user.id}`,
                icon: (
                  <Image
                    src={user.image || Profile}
                    className={
                      open
                        ? "h-10 w-10 flex-shrink-0 rounded-full"
                        : "h-7 w-7 flex-shrink-0 rounded-full"
                    }
                    width={100}
                    height={100}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard children={children} />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre bg-gradient-to-r bg-clip-text text-transparent from-blue-500  via-violet-600 to-yellow-500"
      >
        Little SRN <br />
        <span className="text-sm">Technology School Mandalay</span>
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: Prop) => {
  return (
    <div className="flex flex-1">
      <div className=" rounded-tl-2xl border bg-[#F7F7F7] border-neutral-200 dark:border-neutral-700 flex flex-col gap-2 flex-1 w-full h-screen">
        {children}
      </div>
    </div>
  );
};
