
// import { useContext, useState } from "react";
// import {
//   Search,
//   Plus,
//   SlidersHorizontal,
//   Code2,
//   GitBranch,
//   BookOpen,
//   MoreHorizontal,
//   X,
//   CalendarDays,
//   CircleHelp,
//   Pencil,
//   Trash,
// } from "lucide-react";
// import { AuthStore } from "../context/AuthContext";

// const categoryStyles = {
//   DSA: "bg-violet-500/10 text-violet-300 border-violet-400/20",
//   Git: "bg-orange-500/10 text-orange-300 border-orange-400/20",
//   Technical: "bg-blue-500/10 text-blue-300 border-blue-400/20",
// };

// const statusStyles = {
//   Pending: "bg-amber-500/10 text-amber-300",
//   "In Progress": "bg-blue-500/10 text-blue-300",
//   Completed: "bg-emerald-500/10 text-emerald-300",
// };

// const difficultyStyles = {
//   Easy: "text-emerald-400",
//   Medium: "text-amber-400",
//   Hard: "text-rose-400",
// };

// const emptyTask = {
//   title: "",
//   description: "",
//   category: "DSA",
//   difficulty: "Easy",
//   status: "Pending",
// };

// const categories = [
//   { name: "All", icon: BookOpen },
//   { name: "DSA", icon: Code2 },
//   { name: "Git", icon: GitBranch },
//   { name: "Technical", icon: CircleHelp },
// ];

// const Problems = () => {
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [difficultyFilter, setDifficultyFilter] = useState("All");
//   const [showModal, setShowModal] = useState(false);
//   const [task, setTask] = useState({ ...emptyTask });
//   const [editId, setEditId] = useState(null);

//   const { questions, setQuestions } = useContext(AuthStore);

//   const filteredQuestions = questions.filter((question) => {
//     const matchesSearch =
//       question.title.toLowerCase().includes(search.toLowerCase()) ||
//       question.description.toLowerCase().includes(search.toLowerCase());

//     const matchesCategory =
//       categoryFilter === "All" || question.category === categoryFilter;

//     const matchesStatus =
//       statusFilter === "All" || question.status === statusFilter;

//     const matchesDifficulty =
//       difficultyFilter === "All" ||
//       question.difficulty === difficultyFilter;

//     return (
//       matchesSearch &&
//       matchesCategory &&
//       matchesStatus &&
//       matchesDifficulty
//     );
//   });

//   const completedCount = questions.filter(
//     (question) => question.status === "Completed"
//   ).length;

//   // Add and edit task
//   const handleAddTask = (e) => {
//     e.preventDefault();

//     let updatedQues;

//     if (editId !== null) {
//       updatedQues = questions.map((ques) =>
//         ques.id === editId ? { ...task, id: editId } : ques
//       );
//     } else {
//       const newTask = {
//         ...task,
//         id: Date.now(),
//         date: new Date().toLocaleDateString("en-US", {
//           month: "short",
//           day: "2-digit",
//           year: "numeric",
//         }),
//       };

//       updatedQues = [newTask, ...questions];
//     }

//     setQuestions(updatedQues);
//     localStorage.setItem("ques", JSON.stringify(updatedQues));

//     setTask({ ...emptyTask });
//     setEditId(null);
//     setShowModal(false);
//   };

//   const EditFunction = (id) => {
//     const match = questions.find((question) => question.id === id);

//     if (!match) return;

//     setEditId(id);
//     setTask({ ...match });
//     setShowModal(true);
//   };

//   const DeleteFunction = (id) => {
//     const updatedQues = questions.filter((ques) => ques.id !== id);

//     setQuestions(updatedQues);
//     localStorage.setItem("ques", JSON.stringify(updatedQues));
//   };

//   return (
//     <div className="w-full min-w-0 overflow-x-hidden bg-[#0b111a] p-3 text-slate-200 sm:p-4 lg:p-6 xl:p-8">
//       <div className="mx-auto w-full min-w-0 max-w-7xl space-y-6 sm:space-y-7">

//         {/* Page Heading */}
//         <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div className="min-w-0">
//             <p className="mb-2 text-sm text-violet-400">
//               Your preparation workspace
//             </p>

//             <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//               Questions & Tasks
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-slate-400">
//               Organize your practice and keep your interview preparation on track.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               setTask({ ...emptyTask });
//               setEditId(null);
//               setShowModal(true);
//             }}
//             className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 sm:w-auto"
//           >
//             <Plus size={19} />
//             Add New Task
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
//           <StatCard
//             label="Total Questions"
//             value={questions.length}
//             detail="Questions in your tracker"
//             icon={BookOpen}
//           />

//           <StatCard
//             label="Completed"
//             value={completedCount}
//             detail="Questions finished"
//             icon={Code2}
//           />

//           <StatCard
//             label="Remaining"
//             value={questions.length - completedCount}
//             detail="Still to work on"
//             icon={CalendarDays}
//           />
//         </div>

//         {/* Category Cards */}
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//           {categories.map(({ name, icon: Icon }) => {
//             const count =
//               name === "All"
//                 ? questions.length
//                 : questions.filter((q) => q.category === name).length;

//             const isActive = categoryFilter === name;

//             return (
//               <button
//                 key={name}
//                 type="button"
//                 onClick={() => setCategoryFilter(name)}
//                 className={`min-w-0 rounded-xl border p-3 text-left transition sm:p-4 ${
//                   isActive
//                     ? "border-violet-500/50 bg-violet-500/10"
//                     : "border-white/[0.07] bg-[#111a27] hover:border-white/15"
//                 }`}
//               >
//                 <div className="flex items-center justify-between gap-2">
//                   <Icon
//                     size={19}
//                     className={isActive ? "text-violet-400" : "text-slate-400"}
//                   />

//                   <span className="text-lg font-bold text-white">{count}</span>
//                 </div>

//                 <p className="mt-3 break-words text-sm text-slate-400">
//                   {name === "All" ? "All Questions" : name}
//                 </p>
//               </button>
//             );
//           })}
//         </div>

//         {/* Search and Filters */}
//         <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111a27] p-3 sm:p-5">
//           <div className="flex min-w-0 flex-col gap-4 xl:flex-row">
//             <div className="relative min-w-0 flex-1">
//               <Search
//                 size={19}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
//               />

//               <input
//                 type="text"
//                 placeholder="Search questions or descriptions..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full min-w-0 rounded-xl border border-white/[0.08] bg-[#0b111a] py-3 pl-11 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60 sm:pr-4"
//               />
//             </div>

//             <div className="flex shrink-0 items-center gap-2 text-slate-400">
//               <SlidersHorizontal size={18} />
//               <span className="text-sm">Filters</span>
//             </div>

//             <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3 xl:w-[540px] xl:shrink-0">
//               <FilterSelect
//                 value={categoryFilter}
//                 onChange={setCategoryFilter}
//                 options={[
//                   { value: "All", label: "All Categories" },
//                   { value: "DSA", label: "DSA" },
//                   { value: "Git", label: "Git" },
//                   { value: "Technical", label: "Technical" },
//                 ]}
//               />

//               <FilterSelect
//                 value={statusFilter}
//                 onChange={setStatusFilter}
//                 options={[
//                   { value: "All", label: "All Status" },
//                   { value: "Pending", label: "Pending" },
//                   { value: "In Progress", label: "In Progress" },
//                   { value: "Completed", label: "Completed" },
//                 ]}
//               />

//               <FilterSelect
//                 value={difficultyFilter}
//                 onChange={setDifficultyFilter}
//                 options={[
//                   { value: "All", label: "All Difficulty" },
//                   { value: "Easy", label: "Easy" },
//                   { value: "Medium", label: "Medium" },
//                   { value: "Hard", label: "Hard" },
//                 ]}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Questions Table and Mobile Cards */}
//         <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111a27]">
//           <div className="flex flex-col justify-between gap-2 border-b border-white/[0.07] px-4 py-5 sm:flex-row sm:items-center sm:px-5">
//             <div>
//               <h2 className="font-semibold text-white">Your Questions</h2>
//               <p className="mt-1 text-xs text-slate-500">
//                 Track every task in one place
//               </p>
//             </div>

//             <span className="text-sm text-slate-400">
//               {filteredQuestions.length} results
//             </span>
//           </div>

//           {filteredQuestions.length === 0 ? (
//             <div className="px-5 py-16 text-center">
//               <BookOpen className="mx-auto mb-3 text-slate-500" size={30} />

//               <p className="font-medium text-white">No questions found</p>

//               <p className="mt-1 text-sm text-slate-500">
//                 Try changing your search or filters.
//               </p>
//             </div>
//           ) : (
//             <>
//               {/* Desktop and Tablet Table */}
//               <div className="hidden min-w-0 overflow-x-auto md:block">
//                 <table className="w-full min-w-[850px] text-left">
//                   <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
//                     <tr>
//                       <th className="px-5 py-4 font-medium">Question</th>
//                       <th className="px-4 py-4 font-medium">Category</th>
//                       <th className="px-4 py-4 font-medium">Difficulty</th>
//                       <th className="px-4 py-4 font-medium">Status</th>
//                       <th className="px-4 py-4 font-medium">Date Added</th>
//                       <th className="px-4 py-4 font-medium">More</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-white/[0.05]">
//                     {filteredQuestions.map((question) => (
//                       <tr
//                         key={question.id}
//                         className="transition hover:bg-white/[0.02]"
//                       >
//                         <td className="max-w-sm px-5 py-4">
//                           <p className="font-medium text-slate-200">
//                             {question.title}
//                           </p>

//                           <p className="mt-1 truncate text-xs text-slate-500">
//                             {question.description}
//                           </p>
//                         </td>

//                         <td className="px-4 py-4">
//                           <span
//                             className={`whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-medium ${categoryStyles[question.category]}`}
//                           >
//                             {question.category}
//                           </span>
//                         </td>

//                         <td className="px-4 py-4">
//                           <span
//                             className={`whitespace-nowrap text-sm font-medium ${difficultyStyles[question.difficulty]}`}
//                           >
//                             {question.difficulty}
//                           </span>
//                         </td>

//                         <td className="px-4 py-4">
//                           <span
//                             className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium ${statusStyles[question.status]}`}
//                           >
//                             {question.status}
//                           </span>
//                         </td>

//                         <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
//                           {question.date}
//                         </td>

//                         <td className="px-4 py-4">
//                           <div className="flex items-center gap-3">
//                             <button
//                               type="button"
//                               aria-label={`Edit ${question.title}`}
//                               onClick={() => EditFunction(question.id)}
//                               className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-500/10 active:scale-95"
//                             >
//                               <Pencil size={18} />
//                             </button>

//                             <button
//                               type="button"
//                               aria-label={`Delete ${question.title}`}
//                               onClick={() => DeleteFunction(question.id)}
//                               className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10 active:scale-95"
//                             >
//                               <Trash size={18} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Mobile Cards */}
//               <div className="space-y-3 p-3 md:hidden">
//                 {filteredQuestions.map((question) => (
//                   <div
//                     key={question.id}
//                     className="min-w-0 rounded-xl border border-white/[0.07] bg-[#0b111a] p-3 sm:p-4"
//                   >
//                     <div className="flex min-w-0 items-start justify-between gap-3">
//                       <div className="min-w-0 flex-1">
//                         <h3 className="break-words font-medium text-white">
//                           {question.title}
//                         </h3>

//                         <p className="mt-1 break-words text-xs leading-5 text-slate-400">
//                           {question.description}
//                         </p>
//                       </div>

//                       <MoreHorizontal
//                         size={20}
//                         className="shrink-0 text-slate-500"
//                       />
//                     </div>

//                     <div className="mt-4 flex flex-wrap items-center gap-2">
//                       <span
//                         className={`rounded-lg border px-2 py-1 text-xs ${categoryStyles[question.category]}`}
//                       >
//                         {question.category}
//                       </span>

//                       <span
//                         className={`text-xs font-medium ${difficultyStyles[question.difficulty]}`}
//                       >
//                         {question.difficulty}
//                       </span>

//                       <span
//                         className={`rounded-lg px-2 py-1 text-xs ${statusStyles[question.status]}`}
//                       >
//                         {question.status}
//                       </span>
//                     </div>

//                     <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
//                       <p className="text-xs text-slate-500">
//                         Added {question.date}
//                       </p>

//                       <div className="flex items-center gap-2">
//                         <button
//                           type="button"
//                           aria-label={`Edit ${question.title}`}
//                           onClick={() => EditFunction(question.id)}
//                           className="rounded-lg p-2 text-blue-500 hover:bg-blue-500/10"
//                         >
//                           <Pencil size={17} />
//                         </button>

//                         <button
//                           type="button"
//                           aria-label={`Delete ${question.title}`}
//                           onClick={() => DeleteFunction(question.id)}
//                           className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
//                         >
//                           <Trash size={17} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Add / Edit Task Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="add-task-title"
//             className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#111a27] shadow-2xl shadow-black/40"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] p-4 sm:p-5">
//               <div className="min-w-0">
//                 <h2
//                   id="add-task-title"
//                   className="text-lg font-semibold text-white"
//                 >
//                   {editId !== null ? "Edit Task" : "Add New Task"}
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-400">
//                   Add a question to your practice tracker.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 aria-label="Close modal"
//                 onClick={() => {
//                   setShowModal(false);
//                   setTask({ ...emptyTask });
//                   setEditId(null);
//                 }}
//                 className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
//               >
//                 <X size={19} />
//               </button>
//             </div>

//             <form
//               onSubmit={handleAddTask}
//               className="max-h-[calc(100dvh-120px)] space-y-5 overflow-y-auto p-4 sm:p-5"
//             >
//               <div>
//                 <label
//                   htmlFor="task-title"
//                   className="mb-2 block text-sm font-medium text-slate-300"
//                 >
//                   Question title
//                 </label>

//                 <input
//                   id="task-title"
//                   required
//                   minLength={2}
//                   maxLength={100}
//                   value={task.title}
//                   onChange={(e) =>
//                     setTask({ ...task, title: e.target.value })
//                   }
//                   placeholder="e.g. Two Sum"
//                   className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="task-description"
//                   className="mb-2 block text-sm font-medium text-slate-300"
//                 >
//                   Description
//                 </label>

//                 <textarea
//                   id="task-description"
//                   rows={3}
//                   value={task.description}
//                   onChange={(e) =>
//                     setTask({ ...task, description: e.target.value })
//                   }
//                   placeholder="Write a short description..."
//                   className="w-full resize-y rounded-xl border border-white/[0.08] bg-[#0b111a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60"
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label
//                     htmlFor="task-category"
//                     className="mb-2 block text-sm font-medium text-slate-300"
//                   >
//                     Category
//                   </label>

//                   <select
//                     id="task-category"
//                     value={task.category}
//                     onChange={(e) =>
//                       setTask({ ...task, category: e.target.value })
//                     }
//                     className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-white outline-none focus:border-violet-500/60"
//                   >
//                     <option value="DSA">DSA</option>
//                     <option value="Git">Git</option>
//                     <option value="Technical">Technical</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="task-difficulty"
//                     className="mb-2 block text-sm font-medium text-slate-300"
//                   >
//                     Difficulty
//                   </label>

//                   <select
//                     id="task-difficulty"
//                     value={task.difficulty}
//                     onChange={(e) =>
//                       setTask({ ...task, difficulty: e.target.value })
//                     }
//                     className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-white outline-none focus:border-violet-500/60"
//                   >
//                     <option value="Easy">Easy</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Hard">Hard</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="task-status"
//                   className="mb-2 block text-sm font-medium text-slate-300"
//                 >
//                   Status
//                 </label>

//                 <select
//                   id="task-status"
//                   value={task.status}
//                   onChange={(e) =>
//                     setTask({ ...task, status: e.target.value })
//                   }
//                   className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-white outline-none focus:border-violet-500/60"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>

//               <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-end">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     setTask({ ...emptyTask });
//                     setEditId(null);
//                   }}
//                   className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
//                 >
//                   <Plus size={17} />
//                   {editId !== null ? "Edit Task" : "Add Task"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StatCard = ({ label, value, detail, icon: Icon }) => {
//   return (
//     <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111a27] p-4 sm:p-5">
//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-sm text-slate-400">{label}</p>
//           <p className="mt-3 text-3xl font-bold text-white">{value}</p>
//           <p className="mt-2 text-xs text-slate-500">{detail}</p>
//         </div>

//         <div className="shrink-0 rounded-xl border border-violet-400/15 bg-violet-500/10 p-3">
//           <Icon size={21} className="text-violet-400" />
//         </div>
//       </div>
//     </div>
//   );
// };

// const FilterSelect = ({ value, onChange, options }) => {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full min-w-0 rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-slate-300 outline-none focus:border-violet-500/60"
//     >
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Problems;



import { useContext, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  Code2,
  GitBranch,
  BookOpen,
  MoreHorizontal,
  X,
  CalendarDays,
  CircleHelp,
  Pencil,
  Trash,
} from "lucide-react";
import { AuthStore } from "../context/AuthContext";

const categoryStyles = {
  DSA: "bg-violet-500/10 text-violet-300 border-violet-400/20",
  Git: "bg-orange-500/10 text-orange-300 border-orange-400/20",
  Technical: "bg-blue-500/10 text-blue-300 border-blue-400/20",
};

const statusStyles = {
  Pending: "bg-amber-500/10 text-amber-300",
  "In Progress": "bg-blue-500/10 text-blue-300",
  Completed: "bg-emerald-500/10 text-emerald-300",
};

const difficultyStyles = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-rose-400",
};

const emptyTask = {
  title: "",
  description: "",
  category: "DSA",
  difficulty: "Easy",
  status: "Pending",
};

const categories = [
  { name: "All", icon: BookOpen },
  { name: "DSA", icon: Code2 },
  { name: "Git", icon: GitBranch },
  { name: "Technical", icon: CircleHelp },
];

const Problems = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({ ...emptyTask });
  const [editId, setEditId] = useState(null);

  const { questions, setQuestions, user, userQuestions } =
    useContext(AuthStore);

  // Support common email property names.
  const currentEmail = (
    user?.email ?? user?.userEmail ?? ""
  )
    .toString()
    .trim()
    .toLowerCase();

  // Use userQuestions from AuthContext.
  // Fallback is useful if the provider hasn't exposed it yet.
  const myQuestions = Array.isArray(userQuestions)
    ? userQuestions
    : currentEmail
      ? questions.filter(
          (q) =>
            q.userEmail?.toString().trim().toLowerCase() ===
            currentEmail
        )
      : [];

  const filteredQuestions = myQuestions.filter((question) => {
    const title = (question.title ?? "").toLowerCase();
    const description = (question.description ?? "").toLowerCase();
    const searchText = search.toLowerCase();

    const matchesSearch =
      title.includes(searchText) ||
      description.includes(searchText);

    const matchesCategory =
      categoryFilter === "All" ||
      question.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      question.status === statusFilter;

    const matchesDifficulty =
      difficultyFilter === "All" ||
      question.difficulty === difficultyFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesDifficulty
    );
  });

  const completedCount = myQuestions.filter(
    (question) => question.status === "Completed"
  ).length;

  const updateQuestions = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    localStorage.setItem("ques", JSON.stringify(updatedQuestions));
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!currentEmail) {
      alert("Please log in again to manage your questions.");
      return;
    }

    let updatedQues;

    if (editId !== null) {
      // Only edit a question owned by the current user.
      const existingQuestion = questions.find(
        (q) =>
          q.id === editId &&
          q.userEmail?.toString().trim().toLowerCase() ===
            currentEmail
      );

      if (!existingQuestion) {
        alert("Question not found for your account.");
        setShowModal(false);
        setEditId(null);
        setTask({ ...emptyTask });
        return;
      }

      updatedQues = questions.map((ques) =>
        ques.id === editId &&
        ques.userEmail?.toString().trim().toLowerCase() ===
          currentEmail
          ? { ...ques, ...task, id: editId, userEmail: ques.userEmail }
          : ques
      );
    } else {
      const newTask = {
        ...task,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userEmail: currentEmail,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      updatedQues = [newTask, ...questions];
    }

    updateQuestions(updatedQues);

    setTask({ ...emptyTask });
    setEditId(null);
    setShowModal(false);
  };

  const EditFunction = (id) => {
    const match = myQuestions.find(
      (question) => question.id === id
    );

    if (!match) return;

    setEditId(id);
    setTask({
      title: match.title ?? "",
      description: match.description ?? "",
      category: match.category ?? "DSA",
      difficulty: match.difficulty ?? "Easy",
      status: match.status ?? "Pending",
    });
    setShowModal(true);
  };

  const DeleteFunction = (id) => {
    const isOwner = myQuestions.some(
      (question) => question.id === id
    );

    if (!isOwner) return;

    const updatedQues = questions.filter(
      (ques) => ques.id !== id
    );

    updateQuestions(updatedQues);
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-[#0b111a] p-3 text-slate-200 sm:p-4 lg:p-6 xl:p-8">
      <div className="mx-auto w-full min-w-0 max-w-7xl space-y-6 sm:space-y-7">
        {/* Page Heading */}
        <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="mb-2 text-sm text-violet-400">
              Your preparation workspace
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Questions & Tasks
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Organize your practice and keep your interview preparation on track.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setTask({ ...emptyTask });
              setEditId(null);
              setShowModal(true);
            }}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 sm:w-auto"
          >
            <Plus size={19} />
            Add New Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Total Questions"
            value={myQuestions.length}
            detail="Questions in your tracker"
            icon={BookOpen}
          />
          <StatCard
            label="Completed"
            value={completedCount}
            detail="Questions finished"
            icon={Code2}
          />
          <StatCard
            label="Remaining"
            value={myQuestions.length - completedCount}
            detail="Still to work on"
            icon={CalendarDays}
          />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, icon: Icon }) => {
            const count =
              name === "All"
                ? myQuestions.length
                : myQuestions.filter((q) => q.category === name).length;

            const isActive = categoryFilter === name;

            return (
              <button
                key={name}
                type="button"
                onClick={() => setCategoryFilter(name)}
                className={`min-w-0 rounded-xl border p-3 text-left transition sm:p-4 ${
                  isActive
                    ? "border-violet-500/50 bg-violet-500/10"
                    : "border-white/[0.07] bg-[#111a27] hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <Icon
                    size={19}
                    className={
                      isActive ? "text-violet-400" : "text-slate-400"
                    }
                  />
                  <span className="text-lg font-bold text-white">
                    {count}
                  </span>
                </div>
                <p className="mt-3 break-words text-sm text-slate-400">
                  {name === "All" ? "All Questions" : name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111a27] p-3 sm:p-5">
          <div className="flex min-w-0 flex-col gap-4 xl:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search questions or descriptions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full min-w-0 rounded-xl border border-white/[0.08] bg-[#0b111a] py-3 pl-11 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60 sm:pr-4"
              />
            </div>

            <div className="flex shrink-0 items-center gap-2 text-slate-400">
              <SlidersHorizontal size={18} />
              <span className="text-sm">Filters</span>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3 xl:w-[540px] xl:shrink-0">
              <FilterSelect
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={[
                  { value: "All", label: "All Categories" },
                  { value: "DSA", label: "DSA" },
                  { value: "Git", label: "Git" },
                  { value: "Technical", label: "Technical" },
                ]}
              />
              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: "All", label: "All Status" },
                  { value: "Pending", label: "Pending" },
                  { value: "In Progress", label: "In Progress" },
                  { value: "Completed", label: "Completed" },
                ]}
              />
              <FilterSelect
                value={difficultyFilter}
                onChange={setDifficultyFilter}
                options={[
                  { value: "All", label: "All Difficulty" },
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Questions Table and Mobile Cards */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111a27]">
          <div className="flex flex-col justify-between gap-2 border-b border-white/[0.07] px-4 py-5 sm:flex-row sm:items-center sm:px-5">
            <div>
              <h2 className="font-semibold text-white">Your Questions</h2>
              <p className="mt-1 text-xs text-slate-500">
                Track every task in one place
              </p>
            </div>
            <span className="text-sm text-slate-400">
              {filteredQuestions.length} results
            </span>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <BookOpen className="mx-auto mb-3 text-slate-500" size={30} />
              <p className="font-medium text-white">No questions found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop and Tablet Table */}
              <div className="hidden min-w-0 overflow-x-auto md:block">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-medium">Question</th>
                      <th className="px-4 py-4 font-medium">Category</th>
                      <th className="px-4 py-4 font-medium">Difficulty</th>
                      <th className="px-4 py-4 font-medium">Status</th>
                      <th className="px-4 py-4 font-medium">Date Added</th>
                      <th className="px-4 py-4 font-medium">More</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {filteredQuestions.map((question) => (
                      <tr
                        key={question.id}
                        className="transition hover:bg-white/[0.02]"
                      >
                        <td className="max-w-sm px-5 py-4">
                          <p className="font-medium text-slate-200">
                            {question.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {question.description}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-xs font-medium ${categoryStyles[question.category] ?? ""}`}
                          >
                            {question.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`whitespace-nowrap text-sm font-medium ${difficultyStyles[question.difficulty] ?? ""}`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium ${statusStyles[question.status] ?? ""}`}
                          >
                            {question.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                          {question.date ?? "—"}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              aria-label={`Edit ${question.title}`}
                              onClick={() => EditFunction(question.id)}
                              className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-500/10 active:scale-95"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              type="button"
                              aria-label={`Delete ${question.title}`}
                              onClick={() => DeleteFunction(question.id)}
                              className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10 active:scale-95"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-3 p-3 md:hidden">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="min-w-0 rounded-xl border border-white/[0.07] bg-[#0b111a] p-3 sm:p-4"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="break-words font-medium text-white">
                          {question.title}
                        </h3>
                        <p className="mt-1 break-words text-xs leading-5 text-slate-400">
                          {question.description}
                        </p>
                      </div>
                      <MoreHorizontal
                        size={20}
                        className="shrink-0 text-slate-500"
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-lg border px-2 py-1 text-xs ${categoryStyles[question.category] ?? ""}`}
                      >
                        {question.category}
                      </span>
                      <span
                        className={`text-xs font-medium ${difficultyStyles[question.difficulty] ?? ""}`}
                      >
                        {question.difficulty}
                      </span>
                      <span
                        className={`rounded-lg px-2 py-1 text-xs ${statusStyles[question.status] ?? ""}`}
                      >
                        {question.status}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-slate-500">
                        Added {question.date ?? "—"}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Edit ${question.title}`}
                          onClick={() => EditFunction(question.id)}
                          className="rounded-lg p-2 text-blue-500 hover:bg-blue-500/10"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${question.title}`}
                          onClick={() => DeleteFunction(question.id)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add / Edit Task Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#111a27] shadow-2xl shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] p-4 sm:p-5">
              <div className="min-w-0">
                <h2
                  id="add-task-title"
                  className="text-lg font-semibold text-white"
                >
                  {editId !== null ? "Edit Task" : "Add New Task"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Add a question to your practice tracker.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => {
                  setShowModal(false);
                  setTask({ ...emptyTask });
                  setEditId(null);
                }}
                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleAddTask}
              className="max-h-[calc(100dvh-120px)] space-y-5 overflow-y-auto p-4 sm:p-5"
            >
              <div>
                <label
                  htmlFor="task-title"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Question title
                </label>
                <input
                  id="task-title"
                  required
                  minLength={2}
                  maxLength={100}
                  value={task.title}
                  onChange={(e) =>
                    setTask({ ...task, title: e.target.value })
                  }
                  placeholder="e.g. Two Sum"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60"
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Description
                </label>
                <textarea
                  id="task-description"
                  rows={3}
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                  placeholder="Write a short description..."
                  className="w-full resize-y rounded-xl border border-white/[0.08] bg-[#0b111a] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500/60"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="task-category"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Category
                  </label>
                  <select
                    id="task-category"
                    value={task.category}
                    onChange={(e) =>
                      setTask({ ...task, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="DSA">DSA</option>
                    <option value="Git">Git</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="task-difficulty"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Difficulty
                  </label>
                  <select
                    id="task-difficulty"
                    value={task.difficulty}
                    onChange={(e) =>
                      setTask({ ...task, difficulty: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="task-status"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Status
                </label>
                <select
                  id="task-status"
                  value={task.status}
                  onChange={(e) =>
                    setTask({ ...task, status: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-white outline-none focus:border-violet-500/60"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setTask({ ...emptyTask });
                    setEditId(null);
                  }}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  <Plus size={17} />
                  {editId !== null ? "Edit Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, detail, icon: Icon }) => (
  <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111a27] p-4 sm:p-5">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-3 text-3xl font-bold text-white">{value}</p>
        <p className="mt-2 text-xs text-slate-500">{detail}</p>
      </div>
      <div className="shrink-0 rounded-xl border border-violet-400/15 bg-violet-500/10 p-3">
        <Icon size={21} className="text-violet-400" />
      </div>
    </div>
  </div>
);

const FilterSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full min-w-0 rounded-xl border border-white/[0.08] bg-[#0b111a] px-3 py-3 text-sm text-slate-300 outline-none focus:border-violet-500/60"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Problems;

