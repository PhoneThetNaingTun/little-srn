import CoursePhoto from "../../public/oxford9.jpg";
import CFKCard from "./CFKCard";

const CodingForKids = () => {
  return (
    <div>
      <p className="text-center text-2xl font-semibold mb-3">Coding For kids</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-28 gap-4">
        <CFKCard
          header="အသက် 6 နှစ်ခွဲနှင့် အထက်"
          description="Scratch နဲ့ game တွေ animation တွေ ဖန်တီးကြမယ်။ pre-starter, starter, mover,flyer ဆိုပြီး level(4) ခုရှိပါသည်။"
          image={CoursePhoto}
        />{" "}
        <CFKCard
          header="အသက် 8 နှစ်ခွဲနှင့် အထက်"
          description="HTML,CSS,Javascript ဖြင့် website design တွေ ဖန်တီးကြမယ်။ level (3) ခုရှိပါတယ်။"
          image={CoursePhoto}
        />{" "}
        <CFKCard
          header="အသက် 9 နှစ်ခွဲနှင့် အထက်"
          description="IT Field ကိုစိတ်ဝင်စားလို့ programming ကို အခြေခံခိုင်လိုလျှင် တက်ရောက်သင့်သော အတန်းဖြစ်ပါသည်။ Level(2) ရှိပါသည်။

          "
          image={CoursePhoto}
        />
      </div>
    </div>
  );
};

export default CodingForKids;
