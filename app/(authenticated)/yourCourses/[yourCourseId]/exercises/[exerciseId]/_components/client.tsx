"use client";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import { QuestionCard } from "./QuestionCards";

export const QuestionPageClient = () => {
  const param = useParams();
  const { exerciseId } = param;
  const { questions } = useAppSelector((state) => state.Questions);
  const question = questions.filter((item) => item.exerciseId === exerciseId);
  return (
    <div className="w-screen md:w-full h-[500px] flex flex-col gap-5  overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-transparent ">
      <p className="text-4xl font-semibold text-purple-500">Questions</p>
      {question.map((item) => {
        return (
          <QuestionCard
            description={item.questionDescription}
            image={item.questionImage || ""}
            sample={item.sample}
          />
        );
      })}
    </div>
  );
};
