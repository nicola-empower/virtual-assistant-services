import React, { useState, useEffect } from 'react';
import { Play, Square, Plus, Clock, Trash2, Download, User } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TimesheetDocument } from './pdf/TimesheetDocument';
import { supabase } from '../lib/supabase';

export default function Timekeeper() {
    // State
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [entries, setEntries] = useState([]);
    const [clients, setClients] = useState([]);

    // Inputs
    const [taskName, setTaskName] = useState("");
    const [selectedClientId, setSelectedClientId] = useState("");
    const [manualDesc, setManualDesc] = useState("");
    const [manualTime, setManualTime] = useState("");

    // App State
    const [isClient, setIsClient] = useState(false);

    // Initial Load
    useEffect(() => {
        setIsClient(true);
        fetchClients();
        fetchEntries();
    }, []);

    // Timer Logic
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

    // --- DATA FETCHING ---
    const fetchClients = async () => {
        const { data, error } = await supabase.from('clients').select('id, name').order('name');
        if (data) setClients(data);
    };

    const fetchEntries = async () => {
        // Fetch entries and join with clients table to get names
        const { data, error } = await supabase
            .from('time_entries')
            .select(`
                *,
                clients (name)
            `)
            .order('created_at', { ascending: false });

        if (data) {
            const formatted = data.map(e => ({
                id: e.id,
                date: e.date,
                description: e.description,
                duration: e.duration,
                clientName: e.clients?.name || 'No Client'
            }));
            setEntries(formatted);
        }
    };

    // --- UTILS ---
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // --- ACTIONS ---
    const handleStop = async () => {
        setIsRunning(false);
        if (taskName) {
            const durationStr = formatTime(time);
            await saveEntry(durationStr, taskName, selectedClientId);
            setTime(0);
            setTaskName("");
        }
    };

    const handleManualAdd = async () => {
        if (manualDesc && manualTime) {
            await saveEntry(manualTime, manualDesc, selectedClientId); // Reuse selected client from top or add specific? Using top for now.
            setManualDesc("");
            setManualTime("");
        }
    };

    const saveEntry = async (duration, description, clientId) => {
        const { error } = await supabase.from('time_entries').insert([{
            description,
            duration,
            client_id: clientId || null,
            date: new Date().toLocaleDateString()
        }]);

        if (!error) {
            fetchEntries(); // Refresh list
        } else {
            console.error(error);
            alert("Failed to save entry");
        }
    };

    const deleteEntry = async (id) => {
        const { error } = await supabase.from('time_entries').delete().eq('id', id);
        if (!error) {
            setEntries(entries.filter(e => e.id !== id));
        }
    };

    const calculateTotal = () => {
        return `${entries.length} entries`;
    };

    const getClientForExport = () => {
        // Find name of currently selected client for the export button
        const c = clients.find(cl => cl.id === selectedClientId);
        return c ? c.name : "";
    };

    return (
        <div className="space-y-8 animate-fade-in-up">

            {/* Stopwatch Section */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">

                {/* Inputs */}
                <div className="flex-1 w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Current Task</label>
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="What are you working on?"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-teal-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Client</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <select
                                    value={selectedClientId}
                                    onChange={(e) => setSelectedClientId(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:border-teal-500 outline-none appearance-none"
                                >
                                    <option value="">-- No Client --</option>
                                    {clients.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timer Display */}
                <div className="font-mono text-5xl font-bold tracking-wider text-teal-400">
                    {formatTime(time)}
                </div>

                {/* Controls */}
                <div className="flex gap-4">
                    {!isRunning ? (
                        <button
                            onClick={() => setIsRunning(true)}
                            className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-full transition-all hover:scale-110 shadow-lg shadow-teal-900/50"
                        >
                            <Play className="w-6 h-6 fill-current" />
                        </button>
                    ) : (
                        <button
                            onClick={handleStop}
                            className="bg-red-500 hover:bg-red-400 text-white p-4 rounded-full transition-all hover:scale-110 shadow-lg shadow-red-900/50"
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
                            <input
                                value={manualDesc}
                                onChange={(e) => setManualDesc(e.target.value)}
                                type="text"
                                placeholder="Task Description"
                                className="w-full p-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-teal-500"
                            />
                            <input
                                value={manualTime}
                                onChange={(e) => setManualTime(e.target.value)}
                                type="text"
                                placeholder="Duration (e.g. 01:30:00)"
                                className="w-full p-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-teal-500"
                            />
                            <p className="text-xs text-slate-400">Will use Client selected above.</p>
                            <button
                                onClick={handleManualAdd}
                                className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Entry
                            </button>
                        </div>
                    </div>

                    <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                        <h3 className="font-bold text-teal-800 mb-4">Export Timesheet</h3>
                        <p className="text-sm text-teal-700 mb-4">Exporting for: <strong>{getClientForExport() || "Select a Client above"}</strong></p>

                        {isClient && entries.length > 0 && selectedClientId ? (
                            <PDFDownloadLink
                                document={<TimesheetDocument data={{ clientName: getClientForExport(), entries: entries.filter(e => e.clientName === getClientForExport()), totalHours: "Calculated in PDF" }} logoUrl={window.location.origin + '/logo.png'} />}
                                fileName={`Timesheet_${getClientForExport()}.pdf`}
                                className="flex items-center justify-center gap-2 bg-teal-700 text-white py-3 rounded-lg font-bold hover:bg-teal-800 w-full shadow-sm transition-all"
                            >
                                {({ loading }) => (loading ? 'Generating...' : <><Download className="w-4 h-4" /> Download PDF</>)}
                            </PDFDownloadLink>
                        ) : (
                            <button disabled className="w-full bg-slate-200 text-slate-400 py-3 rounded-lg font-bold cursor-not-allowed">
                                Select Client to Export
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: List */}
                <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-600 flex justify-between items-center">
                        <span>Task Log</span>
                        <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">{entries.length} Entries</span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                        {entries.length === 0 ? (
                            <div className="p-12 text-center flex flex-col items-center justify-center text-slate-400 italic gap-4">
                                <Clock className="w-8 h-8 opacity-20" />
                                No time logged yet. Start the timer!
                            </div>
                        ) : (
                            entries.map((entry) => (
                                <div key={entry.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                    <div>
                                        <div className="font-bold text-slate-800">{entry.description}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-2">
                                            <span>{entry.date}</span>
                                            {entry.clientName !== 'No Client' && (
                                                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                                    {entry.clientName}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100">{entry.duration}</span>
                                        <button onClick={() => deleteEntry(entry.id)} className="text-slate-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
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
