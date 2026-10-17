import  { useContext } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  TrendingUp,
  ArrowRight,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router";
import { AuthStore } from "../context/AuthContext";

const Dashboard = () => {
  const {
    user,
    questions = [],
    totalCompletedques = [],
    dsaArr = [],
    CompletedQues = [],
    gitQues = [],
    completedGitQues = [],
    TechQues = [],
    completedTechQues = [],
    dsaPercentage = 0,
    gitPercentage = 0,
    TechPercentage = 0,
  } = useContext(AuthStore);

  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const completedCount = totalCompletedques.length;

  const inProgressCount = questions.filter(
    (q) => q.status === "In Progress"
  ).length;

  const overallPercentage = totalQuestions
    ? Math.round((completedCount / totalQuestions) * 100)
    : 0;

  const stats = [
    {
      title: "Total Questions",
      value: totalQuestions,
      icon: BookOpen,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      title: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "In Progress",
      value: inProgressCount,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "DSA Questions",
      value: dsaArr.length,
      icon: Code2,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  const categories = [
    {
      name: "DSA",
      count: dsaArr.length,
      percent: dsaPercentage,
      color: "bg-violet-500",
    },
    {
      name: "Technical",
      count: TechQues.length,
      percent: TechPercentage,
      color: "bg-cyan-400",
    },
    {
      name: "Git",
      count: gitQues.length,
      percent: gitPercentage,
      color: "bg-emerald-400",
    },
  ];

  const recentQuestions = [...questions].slice(-5).reverse();

  return (
    <div className="min-h-screen bg-[#0b111a] p-5 text-white sm:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Track your preparation and achieve your goals.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111c2b] px-4 py-3">
          <p className="text-xs text-slate-400">Your progress</p>
          <p className="mt-1 font-semibold">
            <span className="text-violet-400">
              {completedCount} / {totalQuestions}
            </span>{" "}
            questions completed
          </p>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="relative mt-8 overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/70 to-[#111c2b] p-6 sm:p-8">
        <div className="relative z-10 max-w-xl">
          <span className="text-sm font-medium text-violet-300">
            YOUR LEARNING JOURNEY
          </span>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Welcome back{user?.name ? `, ${user.name}` : ""}! 👋
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Keep practicing, stay consistent, and make progress
            every day. Your next opportunity starts with what
            you learn today.
          </p>

          <button
            onClick={() => navigate("/main/problems")}
            className="mt-6 flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
          >
            Continue Learning
            <ArrowRight size={17} />
          </button>
        </div>

        <Target
          size={150}
          className="absolute -right-5 -top-3 hidden text-violet-400/10 sm:block"
        />
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-800 bg-[#111c2b] p-5 transition hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>

              <h3 className="mt-5 text-3xl font-bold">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                Based on your questions
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress Section */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Overall Progress */}
        <div className="rounded-xl border border-slate-800 bg-[#111c2b] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Overall Progress
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Your completion summary
              </p>
            </div>

            <TrendingUp className="text-violet-400" size={22} />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <div
              className="grid h-28 w-28 shrink-0 place-items-center rounded-full"
              style={{
                background: `conic-gradient(#8b5cf6 ${overallPercentage}%, #1e293b ${overallPercentage}%)`,
              }}
            >
              <div className="grid h-20 w-20 place-items-center rounded-full bg-[#111c2b]">
                <span className="text-2xl font-bold">
                  {overallPercentage}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-300">
                Questions completed
              </p>
              <p className="mt-2 text-2xl font-bold">
                {completedCount}
                <span className="text-sm text-slate-500">
                  {" "}/ {totalQuestions}
                </span>
              </p>
              <p className="mt-2 text-xs text-emerald-400">
                Keep up the good work!
              </p>
            </div>
          </div>
        </div>

        {/* Practice Categories */}
        <div className="rounded-xl border border-slate-800 bg-[#111c2b] p-6">
          <h2 className="text-lg font-semibold">
            Practice Categories
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Your learning areas
          </p>

          {categories.map((item) => (
            <div key={item.name} className="mt-6">
              <div className="mb-2 flex justify-between gap-3 text-sm">
                <span className="text-slate-300">
                  {item.name}
                </span>
                <span className="text-slate-400">
                  {item.count} questions · {item.percent}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{
                    width: `${item.percent}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Questions */}
      <div className="mt-8 rounded-xl border border-slate-800 bg-[#111c2b] p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Recent Questions
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Your latest practice questions
            </p>
          </div>

          <button
            onClick={() => navigate("/main/problems")}
            className="cursor-pointer flex items-center gap-2 self-start text-sm font-medium text-violet-400 hover:text-violet-300"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-4 font-medium">Question</th>
                <th className="pb-4 font-medium">Category</th>
                <th className="pb-4 font-medium">Difficulty</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentQuestions.length > 0 ? (
                recentQuestions.map((question) => (
                  <tr
                    key={question.id}
                    className="border-b border-slate-800/70 last:border-0"
                  >
                    <td className="py-4 font-medium text-slate-200">
                      {question.title}
                    </td>

                    <td className="py-4 text-slate-400">
                      {question.category}
                    </td>

                    <td className="py-4">
                      <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">
                        {question.difficulty}
                      </span>
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          question.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : question.status === "In Progress"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-slate-700/50 text-slate-400"
                        }`}
                      >
                        {question.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-8 text-center text-slate-500"
                  >
                    No questions added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
