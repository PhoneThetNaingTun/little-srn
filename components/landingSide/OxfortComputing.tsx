import CourseCard from "./CourseCard";
import CoursePhoto from "../../public/oxford9.jpg";
const OxfortComputing = () => {
  return (
    <div>
      <p className="text-center text-2xl lg:text-4xl font-semibold my-10">
        International Oxford Computing
      </p>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-7">
        <CourseCard
          header="အသက် 6 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 7 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 8 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 9 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 10 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 11 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 12 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 13 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
        <CourseCard
          header="အသက် 14 နှစ်ခွဲနှင့် အထက်"
          description="International Course တွေနဲ့ ICT ကိုသင်ယူကြမယ်။"
          image={CoursePhoto}
        />
      </div>
    </div>
  );
};

export default OxfortComputing;
