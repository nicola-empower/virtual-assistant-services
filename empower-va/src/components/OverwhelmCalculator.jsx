import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, PoundSterling, Clock, ArrowRight } from 'lucide-react';

const TASKS = [
    { id: 'email', label: 'Email Management', hours: 5 },
    { id: 'scheduling', label: 'Scheduling & Calendar', hours: 3 },
    { id: 'invoicing', label: 'Invoicing & Expenses', hours: 2 },
    { id: 'travel', label: 'Travel Booking', hours: 2 },
    { id: 'research', label: 'Research & Data Entry', hours: 4 },
];

export default function OverwhelmCalculator() {
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [hourlyRate, setHourlyRate] = useState(100);
    const [showResult, setShowResult] = useState(false);

    const toggleTask = (taskId) => {
        setSelectedTasks(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    const calculateSavings = () => {
        const totalHours = selectedTasks.reduce((acc, taskId) => {
            const task = TASKS.find(t => t.id === taskId);
            return acc + (task ? task.hours : 0);
        }, 0);

        // Assuming VA rate is significantly lower, e.g., £35/hr
        const vaRate = 35;
        const weeklyCostYou = totalHours * hourlyRate;
        const weeklyCostVA = totalHours * vaRate;
        const weeklySavings = weeklyCostYou - weeklyCostVA;
        const monthlySavings = weeklySavings * 4;

        return { totalHours, monthlySavings };
    };

    const { totalHours, monthlySavings } = calculateSavings();

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8 bg-slate-900 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <Calculator className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold">The Overwhelm Calculator</h3>
                </div>
                <p className="text-slate-400">See how much your "busy work" is actually costing you.</p>
            </div>

            <div className="p-8 space-y-8">
                {/* Step 1: Select Tasks */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">
                        1. What tasks are draining you?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {TASKS.map(task => (
                            <button
                                key={task.id}
                                onClick={() => toggleTask(task.id)}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${selectedTasks.includes(task.id)
                                        ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-sm'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200'
                                    }`}
                            >
                                <span className="font-medium">{task.label}</span>
                                {selectedTasks.includes(task.id) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><div className="w-2 h-2 rounded-full bg-purple-500" /></motion.div>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 2: Hourly Rate */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">
                        2. What is your hourly value?
                    </label>
                    <div className="relative">
                        <PoundSterling className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-bold text-lg text-slate-900"
                        />
                    </div>
                </div>

                {/* Result */}
                <div className="pt-4 border-t border-slate-100">
                    <div className="bg-gradient-to-br from-purple-600 to-slate-900 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="text-purple-200 text-sm font-medium mb-1">Potential Monthly Savings</div>
                                <div className="text-4xl font-extrabold tracking-tight">
                                    £{monthlySavings.toLocaleString()}
                                </div>
                                <div className="text-purple-200/60 text-xs mt-2">
                                    Based on outsourcing {totalHours} hours/week
                                </div>
                            </div>
                            <a href="#contact" className="px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2">
                                Reclaim This Cash <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
