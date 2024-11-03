"use client";
import { DataTable } from "@/components/ui/data-table";
import { levelColumn } from "./level-column";
import { NewLevelDialog } from "./NewLevelDialog";
import { useAppSelector } from "@/store/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { statusColumn } from "./status-column";
import { NewStatusDialog } from "./NewStatusDialog";
import { courseColumn } from "./course-columns";
import { NewCourseDialog } from "./NewCourseDialog";
import { BookA, MoveUp, PencilLine, Receipt, Route } from "lucide-react";
import { lectureColumn } from "./lecture-columns";
import { NewLectureDialog } from "./NewLectureDialog";
import { NewLectureDetailDialog } from "./NewLectureDetailDialog";
import { lectureDetailColumn } from "./lectureDetail-colums";
import { NewExerciseDialog } from "./NewExerciseDialog";
import { exerciseColumn } from "./exercise-columns";
import { questionColumn } from "./question-columns";
import { NewQuestionDialog } from "./NewQuestionDialog";

export const CoursePageClient = () => {
  const { levels } = useAppSelector((state) => state.Levels);
  const { status } = useAppSelector((state) => state.Status);
  const { courses } = useAppSelector((state) => state.Courses);
  const { lectures } = useAppSelector((state) => state.Lectures);
  const { lectureDetails } = useAppSelector((state) => state.LectureDetails);
  const { exercises } = useAppSelector((state) => state.Exercises);
  const { questions } = useAppSelector((state) => state.Questions);
  const CoursesData = courses.map((item) => {
    const level = levels.find((level) => level.id === item.levelId)?.level;
    const stat = status.find((status) => status.id === item.statusId)?.status;
    const cName = item.cName;
    const zoom = item.zoomFee;
    const teachYourself = item.teachYourSelfField;
    const id = item.id;
    return { level, stat, cName, zoom, teachYourself, id };
  });
  const LectureData = lectures.map((item) => {
    const cName = courses.find((cour) => cour.id === item.courseId)?.cName;
    const title = item.title;
    const id = item.id;
    return { cName, title, id };
  });
  const LectureDetailData = lectureDetails.map((item) => {
    const lectureName = lectures.find(
      (lec) => lec.id === item.lectureId
    )?.title;
    const lectureLink = item.lectureLink;
    const lectureDetailName = item.lectureDetailName;
    const id = item.id;
    return { lectureDetailName, lectureLink, id, lectureName };
  });
  const ExerciseData = exercises.map((item) => {
    const ename = item.ename;
    const cName = courses.find((course) => course.id === item.courseId)?.cName;
    const id = item.id;
    return { ename, cName, id };
  });
  const QuestionData = questions.map((item) => {
    const ename = exercises.find((exe) => exe.id === item.exerciseId)?.ename;
    const questionDescription = item.questionDescription;
    const sample = item.sample;
    const id = item.id;
    return { ename, questionDescription, sample, id };
  });
  return (
    <div>
      {/* Course Table */}
      <Card className="mb-3">
        <CardHeader>
          <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
            <BookA /> Courses({courses.length})
          </p>
          <div className="flex justify-end">
            <NewCourseDialog />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            //@ts-ignore
            columns={courseColumn}
            data={CoursesData}
            filterKey="cName"
          />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <Card className="mb-3">
          <CardHeader>
            <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
              <BookA /> Exercises({exercises.length})
            </p>
            <div className="flex justify-end">
              <NewExerciseDialog />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              //@ts-ignore
              columns={exerciseColumn}
              data={ExerciseData}
              filterKey="ename"
            />
          </CardContent>
        </Card>
        <Card className="mb-3">
          <CardHeader>
            <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
              <BookA /> Questions({questions.length})
            </p>
            <div className="flex justify-end">
              <NewQuestionDialog />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              //@ts-ignore
              columns={questionColumn}
              data={QuestionData}
              filterKey="questionDescription"
            />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {" "}
        {/* Lecture Table */}
        <Card>
          <CardHeader>
            {" "}
            <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
              <PencilLine /> Lectures({lectures.length})
            </p>
            <div className="flex justify-end">
              <NewLectureDialog />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              //@ts-ignore
              columns={lectureColumn}
              data={LectureData}
              filterKey="title"
            />
          </CardContent>
        </Card>
        {/* Lecture Detail Table */}
        <Card>
          <CardHeader>
            <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
              <PencilLine /> Lecture Detail({lectures.length})
            </p>
            <div className="flex justify-end">
              <NewLectureDetailDialog />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              //@ts-ignore
              columns={lectureDetailColumn}
              data={LectureDetailData}
              filterKey="lectureDetailName"
            />
          </CardContent>
        </Card>
      </div>

      {/* Level and Status Table */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
              <MoveUp /> Levels({levels.length})
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex justify-end">
              <NewLevelDialog />
            </div>
            <DataTable columns={levelColumn} data={levels} filterKey="level" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
              <Route /> Status({status.length})
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex justify-end">
              <NewStatusDialog />
            </div>
            <DataTable
              columns={statusColumn}
              data={status}
              filterKey="status"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
