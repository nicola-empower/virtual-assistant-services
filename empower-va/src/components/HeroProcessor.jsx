import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, Calendar, FileText, ArrowRight } from "lucide-react";

const tasks = [
  { id: 1, text: "Inbox (402 Unread)", icon: Mail, color: "text-red-500", bg: "bg-red-50" },
  { id: 2, text: "Conflicting Schedules", icon: Calendar, color: "text-amber-500", bg: "bg-amber-50" },
  { id: 3, text: "Unpaid Invoices", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
];

export default function HeroProcessor() {
  const [processed, setProcessed] = useState([]);

  // The Animation Loop
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessed((prev) => {
        if (prev.length === tasks.length) return []; // Reset loop
        return [...prev, tasks[prev.length]];
      });
    }, 2000); // Process a task every 2 seconds
    return () => clearTimeout(timer);
  }, [processed]);

  return (
    <div className="relative w-full min-h-[400px] md:h-[400px] h-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">

      {/* LEFT: THE CHAOS (Input) */}
      <div className="w-full md:w-1/2 p-8 border-r border-slate-200 dark:border-slate-800 relative">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Input: The Chaos
        </div>

        <div className="space-y-4 h-[300px] relative">
          <AnimatePresence>
            {tasks.map((task) => (
              !processed.includes(task) && (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 50 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
                >
                  <div className={`p-2 rounded-lg ${task.bg}`}>
                    <task.icon className={`w-5 h-5 ${task.color}`} />
                  </div>
                  <span className="font-medium text-slate-600 dark:text-slate-300">{task.text}</span>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {processed.length === tasks.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full absolute inset-0 top-20 text-slate-300 dark:text-slate-600"
            >
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 animate-spin-slow mb-2"></div>
              <span>Waiting for input...</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* MIDDLE: THE ENGINE (You) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
        <div className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-teal-100 dark:border-teal-900">
          <div className="bg-gradient-to-br from-[#1A565E] to-[#6FA388] p-3 rounded-full text-white">
            <ArrowRight className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* RIGHT: THE ORDER (Output) */}
      <div className="w-full md:w-1/2 p-8 bg-white dark:bg-slate-950">
        <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-6 flex justify-between">
          <span>Output: The System</span>
          <span>{Math.round((processed.length / tasks.length) * 100)}% Optimised</span>
        </div>

        <div className="space-y-4 h-[300px] relative">
          {processed.map((task) => (
            <motion.div
              key={task.id}
              layoutId={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span className="font-medium text-slate-800 dark:text-slate-200 line-through decoration-slate-300 dark:decoration-slate-600">
                  {task.text}
                </span>
              </div>
              <span className="text-xs font-mono text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-teal-200 dark:border-teal-800">
                RESOLVED
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
