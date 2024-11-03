import CourseDetailCards from "./courseCards";
import Test from "../../../../public/kids.png";
import Link from "next/link";
import form from "../../.././../public/register form.png";

const CourseClient = () => {
  return (
    <div>
      <div className="my-10">
        <p className="text-center font-bold text-4xl text-yellow-400">
          Explore Our Courses
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 mb-10">
        <Link href="/courses/sampleCourse" className="hover:scale-105">
          <CourseDetailCards image={Test} header="Sample Course" />
        </Link>
        <Link href="/courses/availableCourses" className="hover:scale-105">
          <CourseDetailCards image={Test} header="Register For New Courses" />
        </Link>
      </div>
    </div>
  );
};

export default CourseClient;
