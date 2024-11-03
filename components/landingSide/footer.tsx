"use client";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Footer = () => {
  const pathname = usePathname();
  const nav = [
    {
      id: 1,
      name: "Home ",
      to: "/",
      isActive: pathname.startsWith("/"),
    },
    {
      id: 2,
      name: "Courses ",
      to: "/courses",
      isActive: pathname.startsWith("/courses"),
    },
    {
      id: 3,
      name: "Books ",
      to: "/",
      isActive: pathname.startsWith("/asf"),
    },
  ];
  const courseNav = [
    {
      id: 2,
      name: "Sample Courses ",
      to: "/courses/sampleCourses",
      isActive: pathname.includes("/sampleCourses"),
    },
    {
      id: 3,
      name: "Register for new class ",
      to: "#",
      isActive: pathname.includes("/yourCourses"),
    },
  ];
  return (
    <div>
      <div className="bg-yellow-400 rounded-t-xl flex flex-wrap  lg:flex-row justify-center px-20  gap-10 lg:gap-44 pt-28 pb-24 text-black">
        <div>
          <Link href={"/home"}>
            <div className="">
              <p className="text-4xl font-semibold mb-1">Little SRN</p>
              <p>Technology School, Mandalay</p>
            </div>
          </Link>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2 ">
            <p className="text-lg font-semibold">Navigation</p>
            {nav.map((item) => {
              return (
                <Link
                  href={item.to}
                  className={
                    item.isActive ? "font-bold text-sm mt-3" : "  text-sm mt-3"
                  }
                  key={item.id}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 ">
            <p className="text-lg font-semibold">Useful Links</p>
            {courseNav.map((item) => {
              return (
                <Link
                  href={item.to}
                  className={
                    item.isActive ? "font-bold text-sm mt-3" : "  text-sm mt-3"
                  }
                  key={item.id}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-semibold text-2xl">Contact Us</p>
          <p className="flex items-center gap-2">
            <Phone />
            09-966809800
          </p>
          <p className="flex items-center gap-2">
            <Mail /> info@studyrightnow-mdy.com
          </p>
          <div className="flex gap-10 ">
            <Button className="text-white bg-violet-700 font-bold text-lg">
              Register
            </Button>
            <Button variant="ghost" className="text-white font-bold text-lg">
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-yellow-600 text-center pt-2">
        <p>&copy; copyright by littleSrn & StudyRightNow</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
