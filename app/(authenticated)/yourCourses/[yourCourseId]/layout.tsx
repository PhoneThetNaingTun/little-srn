import { ReactNode } from "react";
import { MenuBar } from "./_components/menuBar";
import { ReviewBox } from "./_components/ReviewBox";
import { DocumentsCourse } from "./_components/documents";
import Image from "next/image";
import Yellow from "../../../../public/course yellow.svg";
import { ExerciseButton } from "./_components/ExerciseButton";
interface Prop {
  children: ReactNode;
}

const YourCourseLayout = ({ children }: Prop) => {
  return (
    <div className="relative h-screen">
      <div className="relative flex flex-col lg:flex-row justify-around items-center h-full z-[2]">
        <div className="m-auto"> {children}</div>

        <div className="fixed top-11 md:top-10 flex gap-3 items-center flex-wrap">
          <MenuBar /> <DocumentsCourse /> <ExerciseButton />
          <ReviewBox />
        </div>
      </div>
      <Image
        src={Yellow}
        alt="wave"
        className="absolute bottom-0 left-0 w-full z-[1]"
      />
    </div>
  );
};
export default YourCourseLayout;
