import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, Calendar, FileText, ArrowRight, Zap, AlertCircle } from "lucide-react";

const tasks = [
  { id: 1, text: "Inbox (402 Unread)", icon: Mail, color: "text-red-500", bg: "bg-red-50", delay: 0 },
  { id: 2, text: "Conflicting Schedules", icon: Calendar, color: "text-amber-500", bg: "bg-amber-50", delay: 0.2 },
  { id: 3, text: "Unpaid Invoices", icon: FileText, color: "text-blue-500", bg: "bg-blue-50", delay: 0.4 },
];

export default function HeroProcessor() {
  const [processed, setProcessed] = useState([]);

  // The Animation Loop
  useEffect(() => {
    if (processed.length === tasks.length) {
      const resetTimer = setTimeout(() => setProcessed([]), 3000); // Wait 3s before reset
      return () => clearTimeout(resetTimer);
    }

    const timer = setTimeout(() => {
      setProcessed((prev) => {
        return [...prev, tasks[prev.length]];
      });
    }, 1500); // Faster processing: 1.5s
    return () => clearTimeout(timer);
  }, [processed]);

  return (
    <div className="relative w-full min-h-[400px] md:h-[400px] h-auto bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row backdrop-blur-sm">

      {/* LEFT: THE CHAOS (Input) */}
      <div className="w-full md:w-1/2 p-8 border-r border-slate-200 dark:border-slate-800 relative bg-white/50 dark:bg-slate-800/50">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Input: The Chaos
        </div>

        <div className="space-y-4 h-[300px] relative">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              !processed.includes(task) && (
                <motion.div
                  key={task.id}
                  layoutId={task.id}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    y: [0, -5, 0] // Floating effect
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: 100, filter: "blur(10px)" }}
                  transition={{
                    duration: 0.5,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: task.delay
                    }
                  }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <div className={`p-3 rounded-xl ${task.bg}`}>
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
              className="flex flex-col items-center justify-center h-full absolute inset-0 top-0 text-slate-400 dark:text-slate-600"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-teal-500 animate-spin mb-4"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-teal-500 animate-pulse" />
                </div>
              </div>
              <span className="text-sm font-mono uppercase tracking-widest">System Idle...</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* MIDDLE: THE ENGINE (You) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex">
        <div className="bg-white dark:bg-slate-800 p-2 rounded-full shadow-2xl border-4 border-slate-50 dark:border-slate-900">
          <div className="bg-linear-to-br from-[#1A565E] to-[#6FA388] p-4 rounded-full text-white shadow-inner">
            <ArrowRight className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* RIGHT: THE ORDER (Output) */}
      <div className="w-full md:w-1/2 p-8 bg-white dark:bg-slate-950">
        <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-6 flex justify-between items-center">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Output: The System</span>
          <span className="bg-teal-50 text-teal-700 px-2 py-1 rounded text-[10px] font-mono border border-teal-100">
            {Math.round((processed.length / tasks.length) * 100)}% OPTIMISED
          </span>
        </div>

        <div className="space-y-4 h-[300px] relative">
          {processed.map((task, index) => (
            <motion.div
              key={task.id}
              layoutId={task.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center justify-between p-4 bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900 rounded-2xl group"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200 line-through decoration-slate-300 dark:decoration-slate-600 decoration-2">
                  {task.text}
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-teal-200 dark:border-teal-800 shadow-sm">
                DONE
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
