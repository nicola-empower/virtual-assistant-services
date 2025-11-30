import React, { useState, useEffect } from 'react';
import { Play, Square, Plus, Clock, Trash2, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TimesheetDocument } from './pdf/TimesheetDocument';

export default function Timekeeper() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [entries, setEntries] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [clientName, setClientName] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleStop = () => {
        setIsRunning(false);
        if (taskName) {
            addEntry(formatTime(time), taskName);
            setTime(0);
            setTaskName("");
        }
    };

    const addEntry = (duration, description) => {
        const newEntry = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            description: description || "Untitled Task",
            duration: duration
        };
        setEntries([newEntry, ...entries]);
    };

    const deleteEntry = (id) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    const calculateTotal = () => {
        // Simplified total calculation for display
        // In a real app, you'd parse the duration strings back to seconds
        return `${entries.length} entries`;
    };

    return (
        <div className="space-y-8">

            {/* Stopwatch Section */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 w-full">
                    <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Current Task</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="What are you working on?"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-teal-500 outline-none"
                    />
                </div>

                <div className="font-mono text-5xl font-bold tracking-wider text-teal-400">
                    {formatTime(time)}
                </div>

                <div className="flex gap-4">
                    {!isRunning ? (
                        <button
                            onClick={() => setIsRunning(true)}
                            className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-full transition-all hover:scale-110"
                        >
                            <Play className="w-6 h-6 fill-current" />
                        </button>
                    ) : (
                        <button
                            onClick={handleStop}
                            className="bg-red-500 hover:bg-red-400 text-white p-4 rounded-full transition-all hover:scale-110"
                        >
                            <Square className="w-6 h-6 fill-current" />
                        </button>
                    )}
                </div>
            </div>

            {/* Manual Entry & List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left: Controls */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-teal-600" /> Manual Entry
                        </h3>
                        <div className="space-y-3">
                            <input id="manual-desc" type="text" placeholder="Task Description" className="w-full p-2 border rounded text-sm" />
                            <input id="manual-time" type="text" placeholder="Duration (e.g. 01:30:00)" className="w-full p-2 border rounded text-sm" />
                            <button
                                onClick={() => {
                                    const desc = document.getElementById('manual-desc').value;
                                    const time = document.getElementById('manual-time').value;
                                    if (desc && time) addEntry(time, desc);
                                }}
                                className="w-full bg-slate-100 text-slate-600 font-bold py-2 rounded hover:bg-slate-200"
                            >
                                Add Entry
                            </button>
                        </div>
                    </div>

                    <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                        <h3 className="font-bold text-teal-800 mb-4">Export Timesheet</h3>
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full p-2 border border-teal-200 rounded mb-4 text-sm"
                        />
                        {isClient && entries.length > 0 && clientName ? (
                            <PDFDownloadLink
                                document={<TimesheetDocument data={{ clientName, entries, totalHours: calculateTotal() }} />}
                                fileName={`Timesheet_${clientName}.pdf`}
                                className="flex items-center justify-center gap-2 bg-teal-700 text-white py-3 rounded-lg font-bold hover:bg-teal-800 w-full shadow-sm"
                            >
                                {({ loading }) => (loading ? 'Generating...' : <><Download className="w-4 h-4" /> Download PDF</>)}
                            </PDFDownloadLink>
                        ) : (
                            <button disabled className="w-full bg-slate-200 text-slate-400 py-3 rounded-lg font-bold cursor-not-allowed">
                                Enter Client & Data
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: List */}
                <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-600 flex justify-between">
                        <span>Task Log</span>
                        <span>{entries.length} Entries</span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                        {entries.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 italic">No time logged yet. Start the timer!</div>
                        ) : (
                            entries.map((entry) => (
                                <div key={entry.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div>
                                        <div className="font-medium text-slate-800">{entry.description}</div>
                                        <div className="text-xs text-slate-500">{entry.date}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">{entry.duration}</span>
                                        <button onClick={() => deleteEntry(entry.id)} className="text-slate-300 hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
