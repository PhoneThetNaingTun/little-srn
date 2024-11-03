import { ReactNode } from "react";
import { MenuBar } from "./_components/menuBar";
import { ReviewBox } from "./_components/ReviewBox";

interface Prop {
  children: ReactNode;
}

const YourCourseLayout = ({ children }: Prop) => {
  return (
    <div className="p-1 lg:p-5 overflow-y-scroll h-screen">
      <div className="relative flex flex-col lg:flex-row justify-around items-center h-full">
        <div className=""> {children}</div>
        <div className="absolute top-10 left-20">
          <MenuBar />
        </div>
        <div className="w-full lg:w-1/2 lg:m-auto">
          <ReviewBox />
        </div>
      </div>
    </div>
  );
};
export default YourCourseLayout;
