import  { useContext } from "react";
import { AuthStore } from "../context/AuthContext";
import { Target } from "lucide-react";

const Progress = () => {


 const {questions,totalCompletedques,dsaArr,CompletedQues,gitQues,completedGitQues,
  TechQues,completedTechQues,dsaPercentage,gitPercentage,TechPercentage,totalPercentage
 }=useContext(AuthStore);

  return (
    <div className="min-h-screen bg-[#0b111a] p-6 text-white ">
      <h1 className="text-3xl font-bold">Progress</h1>
      <p className="mt-2 text-slate-400">
        Track your overall performance and improvement
      </p>

      <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-2">

        
{/* <div className="rounded-xl border border-slate-800 bg-[#111c2b] p-6">
  <div
    className="mx-auto grid h-32 w-32 place-items-center rounded-full"
    style={{
      background: `conic-gradient(
        #8b5cf6 ${Math.min(100, Math.max(0, totalPercentage))}%,
        #1e293b ${Math.min(100, Math.max(0, totalPercentage))}% 100%
      )`,
    }}
  >
    <div className="grid h-24 w-24 place-items-center rounded-full bg-[#111c2b]">
      <h2 className="text-2xl font-bold">
        {totalPercentage}%
      </h2>
    </div>
  </div>

  <div className="mt-6 text-center">
    <h2 className="text-lg font-semibold">
      Overall Completion
    </h2>

    <p className="mt-1 text-sm text-slate-400">
      {totalCompletedques.length}/{questions.length} questions
    </p>
  </div>
</div> */}







     <section className="flex flex-col gap-7 rounded-2xl border border-[#1b304a] bg-gradient-to-br from-[#0d1b2e] to-[#091626] p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-7 flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
              <Target size={22} />
            </div>
            <div>
              <h3 className="font-semibold">Overall Completion</h3>
              <p className="mt-1 text-xs text-slate-400">
                Keep practising to reach your goals.
              </p>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-300">
              {CompletedQues.length} of {questions.length} questions
            </span>
            <span className="font-semibold text-violet-300">
              {totalPercentage}%
            </span>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-label="Question completion"
            aria-valuenow={totalPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500"
              style={{ width: `${totalPercentage}%` }}
            />
          </div>
        </div>

        <div
          className="mx-auto grid h-32 w-32 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#8b5cf6 ${totalPercentage}%, #1e293b ${totalPercentage}%)`,
          }}
        >
          <div className="flex h-[108px] w-[108px] flex-col items-center justify-center rounded-full bg-[#0b192b]">
            <strong className="text-2xl font-bold">{totalPercentage}%</strong>
            <span className="mt-1 text-xs text-slate-400">Completed</span>
          </div>
        </div>
      </section>









        {/* DSA Progress */}
        <div className="rounded-xl border  border-slate-800 bg-[#111c2b] p-6">
          <h2 className="text-lg font-semibold">DSA Progress</h2>
          <p className="mt-2 text-sm text-slate-400">
            Your problem-solving journey
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-slate-300">Questions Solved</span>
            <span className="font-semibold">{CompletedQues.length}/{dsaArr.length}</span>
          </div>

           <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
             <div
               className="h-full rounded-full bg-violet-500"
               style={{ width: `${dsaPercentage}%` }}
              />
            </div>
          
          <p className="mt-3 text-sm text-violet-400">{dsaPercentage}% completed </p>
          </div>

        

        {/* Interview Questions */}
        <div className="rounded-xl mt-4 mb-4 border border-slate-800 bg-[#111c2b] p-6">
          <h2 className="text-lg font-semibold">
            Interview Preparation
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Track your technical interview readiness
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-slate-300">Questions Completed</span>
            <span className="font-semibold">{completedTechQues.length}/{TechQues.length}</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full  rounded-full bg-cyan-400"
             style={{width:`${TechPercentage}%`}}
            />
          </div>

          <p className="mt-3 text-sm text-cyan-400">{TechPercentage}% completed</p>
        </div>

        {/* Git Ques */}
        <div className="rounded-xl border border-slate-800 bg-[#111c2b] p-6">
          <h2 className="text-lg font-semibold">Git Status</h2>
          <p className="mt-2 text-sm text-slate-400">
            Your practical coding practice
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-slate-300">Projects Completed</span>
            <span className="font-semibold">{completedGitQues.length}/{gitQues.length}</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-emerald-400" 
            style={{ width:`${gitPercentage}%`}}
            />
          </div>

          <p className="mt-3 text-sm text-emerald-400">{gitPercentage}% completed</p>
        </div>
      </div>
      </div>
   
  );
};

export default Progress;