"use client";
import Link from "next/link";
import { Book, BookA, CircleUser, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/theme/theme-toggle";
const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const nav = [
    {
      id: 1,
      name: "Home ",
      to: "/",
      isActive: pathname.endsWith("/"),
      icon: <Home />,
    },
    {
      id: 2,
      name: "Courses ",
      to: "/courses",
      isActive: pathname.startsWith("/courses"),
      icon: <BookA />,
    },
  ];
  return (
    <header className="flex h-14 items-center gap-4   px-4 lg:h-[60px] lg:px-6 justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <div className=" md:hidden flex justify-between w-full">
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-slate-50">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/home"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="bg-gradient-to-r bg-clip-text text-transparent from-blue-500  via-violet-600 to-yellow-500">
                Little SRN <br />{" "}
                <span className="text-sm">Technology School Mandalay</span>
              </span>
            </Link>
            {nav.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary "
                >
                  <div
                    className={
                      item.isActive
                        ? "flex gap-2 text-yellow-300"
                        : "flex gap-2"
                    }
                  >
                    {item.icon} {item.name}
                  </div>
                </Link>
              );
            })}
            <div>
              <Button
                className="text-white bg-violet-700"
                onClick={() => {
                  router.push("/auth/register");
                }}
              >
                Register
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/auth/login");
                }}
              >
                Login
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden w-full flex-1 md:flex justify-between items-center  pt-5 ">
        <Link href={"/home"}>
          <div>
            <p className="text-xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-blue-500  via-violet-600 to-yellow-500">
              Little SRN <br />
              <span className="text-sm">Technology School Mandalay</span>
            </p>
          </div>
        </Link>
        <div className="flex justify-between gap-5 ">
          {nav.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.to}
                className="flex gap-2 items-center "
              >
                <Button
                  variant={item.isActive ? "default" : "ghost"}
                  className={
                    item.isActive ? "text-white text-xl font-bold" : ""
                  }
                >
                  {item.icon} {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
        <div className="flex gap-5">
          <ModeToggle />
          <div>
            <Button
              className="text-white bg-violet-700"
              onClick={() => {
                router.push("/auth/register");
              }}
            >
              Register
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
