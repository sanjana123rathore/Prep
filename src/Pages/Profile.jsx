import { useContext, useMemo } from "react";
import {
  UserRound,
  Mail,
  Layers3,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";
import { AuthStore } from "../context/AuthContext.jsx";



export default function Profile() {



  const {user}=useContext(AuthStore);

  const {questions}=useContext(AuthStore);

  const name = user.name ||  "User";
  const email = user.email ||  "Email not available";

  const completed = questions.filter(
    (q) => q.status?.toLowerCase() === "completed"
  ).length;

  const inProgress = questions.filter(
    (q) => q.status?.toLowerCase() === "in progress"
  ).length;

  const total = questions.length;
  const percentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stats = [
    {
      title: "All Questions",
      value: total,
      description: "Total questions in your tracker",
      icon: Layers3,
      color: "text-violet-300",
      bg: "bg-violet-500/15",
    },
    {
      title: "Completed",
      value: completed,
      description: "Questions you've completed",
      icon: CheckCircle2,
      color: "text-emerald-300",
      bg: "bg-emerald-500/15",
    },
    {
      title: "In Progress",
      value: inProgress,
      description: "Questions you're working on",
      icon: Clock3,
      color: "text-amber-300",
      bg: "bg-amber-500/15",
    },
  ];



  return (
    <main className="min-h-screen bg-[#07111f] p-4 text-slate-100 sm:p-6 lg:p-8">
      {/* Page heading */}
      <header className="mb-7 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your account and track your preparation.
          </p>
        </div>

        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
          <UserRound size={21} />
        </div>
      </header>

      {/* Profile card */}
      <section className="mb-7 overflow-hidden rounded-2xl border border-[#1b304a] bg-[#0b192b]">


        <div className="flex  flex-wrap items-center gap-5 px-5 pb-6 sm:px-7">
          <div className="mt-9  grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-[#0b192b] bg-gradient-to-br from-violet-400 to-violet-700 text-2xl font-bold shadow-lg shadow-violet-950/40">
            {initials}
          </div>

          <div className="min-w-0 pt-3">
            <h2 className="break-words text-xl font-semibold">
              {name}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              PrepTrack Member
            </p>
          </div>
        </div>

        {/* Personal information */}
        <div className="px-5 pb-7 sm:px-7">
          <div className="mb-5">
            <h3 className="font-semibold">Personal Information</h3>
            <p className="mt-1 text-xs text-slate-400">
              Your registered account details
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={UserRound}
              label="Full Name"
              value={name}
            />
            <InfoItem
              icon={Mail}
              label="Email Address"
              value={email}
            />
          </div>
        </div>
      </section>

      {/* Question statistics */}
      <section className="mb-7">
        <div className="mb-5">
          <h3 className="font-semibold">Question Statistics</h3>
          <p className="mt-1 text-xs text-slate-400">
            Your interview preparation at a glance
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-[#1b304a] bg-gradient-to-br from-[#0d1b2e] to-[#091626] p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-500/40"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-xl ${stat.bg} ${stat.color}`}
                  >
                    <Icon size={21} />
                  </div>
                  <span className="text-sm text-slate-400">
                    {stat.title}
                  </span>
                </div>

                <p className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Progress card */}
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
              {completed} of {total} questions
            </span>
            <span className="font-semibold text-violet-300">
              {percentage}%
            </span>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-label="Question completion"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div
          className="mx-auto grid h-32 w-32 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#8b5cf6 ${percentage}%, #1e293b ${percentage}%)`,
          }}
        >
          <div className="flex h-[108px] w-[108px] flex-col items-center justify-center rounded-full bg-[#0b192b]">
            <strong className="text-2xl font-bold">{percentage}%</strong>
            <span className="mt-1 text-xs text-slate-400">Completed</span>
          </div>
        </div>
      </section>
    </main>
  );
}


function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-xl border border-[#1b304a] bg-[#091626] p-4 transition hover:border-violet-500/40 hover:bg-[#102139]">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon size={20} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}
