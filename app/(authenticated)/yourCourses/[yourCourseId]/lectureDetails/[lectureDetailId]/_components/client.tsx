"use client";

import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

export const LectureDetailsPageUserClient = () => {
  const param = useParams();
  const { lectureDetailId } = param;
  const { lectureDetails } = useAppSelector((state) => state.LectureDetails);
  const lectureDetail = lectureDetails.find(
    (item) => item.id === lectureDetailId
  );
  console.log(lectureDetails);
  return (
    <div>
      <p className="mb-3 bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-purple-500 to-blue-500 text-3xl text-center font-semibold">
        {lectureDetail?.lectureDetailName}
      </p>
      <iframe
        width="560"
        className="m-auto w-full h-[300px] lg:w-[650px] lg:h-[400px]"
        height="315"
        src={lectureDetail?.lectureLink}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
