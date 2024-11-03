import { ReactNode } from "react";
import { MenuBar } from "./_components/menuBar";

interface Prop {
  children: ReactNode;
}

const YourCourseLayout = ({ children }: Prop) => {
  return (
    <div className="flex h-screen items-center justify-between p-5 gap-10">
      <div className="flex-1"> {children}</div>
      <div className="flex-1">
        <MenuBar />
      </div>
    </div>
  );
};
export default YourCourseLayout;
