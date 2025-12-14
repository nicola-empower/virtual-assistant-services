import React, { useState, useEffect } from 'react';
import { Play, Plus, UserPlus, MoreHorizontal, ArrowRight, Calendar, CheckSquare, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AddEventModal from './crm/AddEventModal';
import AddClientModal from './crm/AddClientModal';

export default function DashboardHome({ onNavigate }) {
    const [loading, setLoading] = useState(true);
    const [schedule, setSchedule] = useState([]);
    const [recentClients, setRecentClients] = useState([]);
    const [priorityTasks, setPriorityTasks] = useState([]);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        // 1. Fetch Today's Schedule (or upcoming)
        const { data: scheduleData } = await supabase
            .from('schedule')
            .select('*')
            .gte('start_time', new Date().toISOString().split('T')[0]) // From today onwards
            .order('start_time', { ascending: true })
            .limit(5);

        // 2. Fetch Recent Clients
        const { data: clientData } = await supabase
            .from('clients')
            .select('id, name, status, hourly_rate') // minimal fields
            .order('created_at', { ascending: false })
            .limit(3);

        // 3. Fetch Priority Tasks
        const { data: taskData } = await supabase
            .from('tasks')
            .select('*, clients(name)') // Join with clients to get names
            .eq('quadrant', 'do_first')
            .limit(4);

        if (scheduleData) setSchedule(scheduleData);
        if (clientData) setRecentClients(clientData);
        if (taskData) setPriorityTasks(taskData);
        setLoading(false);
    };

    const formatTime = (isoString) => {
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-6">
            <header className="mb-8 animate-fade-in-up flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800">Main Hub</h1>
                    <p className="text-lg text-slate-600">Welcome back, let's get productive.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-2xl font-bold text-brand-lilac">{new Date().toLocaleDateString('en-GB', { weekday: 'long' })}</p>
                    <p className="text-slate-400">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Schedule (Real Data) */}
                <div className="glass-card rounded-2xl p-6 md:col-span-2 relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-brand-lilac" /> Schedule
                        </h3>
                        <button
                            onClick={() => setShowEventModal(true)}
                            className="bg-brand-lilac/10 text-brand-lilac hover:bg-brand-lilac hover:text-white p-2 rounded-lg transition-all"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-3 min-h-[150px]">
                        {loading ? (
                            <div className="flex items-center justify-center h-32 text-slate-400">Loading schedule...</div>
                        ) : schedule.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                                <Clock className="w-8 h-8 mb-2 opacity-50" />
                                <p>No events scheduled.</p>
                                <button onClick={() => setShowEventModal(true)} className="text-brand-lilac font-bold text-sm hover:underline mt-1">Add Event</button>
                            </div>
                        ) : (
                            schedule.map(event => (
                                <div key={event.id} className="flex items-center gap-4 group/item cursor-pointer hover:bg-white/60 p-3 rounded-xl transition-all border border-transparent hover:border-white hover:shadow-sm">
                                    <div className="text-center min-w-[60px]">
                                        <span className="block text-sm font-bold text-slate-700">{formatTime(event.start_time)}</span>
                                        <span className="text-xs text-slate-400 uppercase">{new Date(event.start_time).toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                                    </div>
                                    <div className={`h-10 w-1.5 rounded-full ${event.color === 'green' ? 'bg-green-400' :
                                            event.color === 'blue' ? 'bg-blue-400' :
                                                event.color === 'orange' ? 'bg-orange-400' : 'bg-brand-lilac'
                                        }`} />
                                    <div>
                                        <h4 className="font-bold text-slate-800">{event.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium">
                                            {event.duration_minutes} mins
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 2. Quick Actions */}
                <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => onNavigate('timekeeper')}
                                className="bg-brand-lilac text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:bg-brand-lilac-hover hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                <span>Start Time Tracker</span>
                            </button>
                            <button
                                onClick={() => onNavigate('triage')}
                                className="bg-white text-slate-700 border border-slate-200 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 hover:border-brand-lilac transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add New Task</span>
                            </button>
                            <button
                                onClick={() => setShowClientModal(true)}
                                className="bg-white text-slate-700 border border-slate-200 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 hover:border-brand-lilac transition-all flex items-center justify-center gap-2"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Add New Client</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. Recent Clients (Real Data) */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Clients</h3>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center text-slate-400 py-4">Loading...</div>
                        ) : recentClients.length === 0 ? (
                            <div className="text-center text-slate-400 py-4 text-sm">No clients yet.</div>
                        ) : (
                            recentClients.map(client => (
                                <div key={client.id} onClick={() => onNavigate('clients')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 cursor-pointer transition-colors group">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-brand-lilac group-hover:text-white transition-colors">
                                        {client.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-700 group-hover:text-brand-lilac transition-colors">{client.name}</div>
                                        <div className="text-xs text-slate-500">
                                            {client.status} • £{client.hourly_rate}/hr
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-lilac opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 4. Priority Tasks (Real Data) */}
                <div className="glass-card rounded-2xl p-6 md:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <CheckSquare className="w-5 h-5 text-brand-lilac" /> Priority Tasks
                        </h3>
                        <button onClick={() => onNavigate('triage')} className="text-sm font-bold text-brand-lilac hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="text-center text-slate-400 py-8">Loading tasks...</div>
                        ) : priorityTasks.length === 0 ? (
                            <div className="text-center text-slate-400 py-8 text-sm">No urgent tasks! 🎉</div>
                        ) : (
                            priorityTasks.map(task => (
                                <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/30 border border-white/20 hover:bg-white/60 transition-colors">
                                    <div className="mt-1 w-5 h-5 rounded border-2 border-brand-lilac flex items-center justify-center">
                                        {/* Mock Checkbox Visual */}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-700">{task.text}</h4>
                                        {task.clients && (
                                            <span className="text-xs font-bold text-brand-lilac-dark bg-brand-lilac/10 py-0.5 px-2 rounded-full mt-1 inline-block">
                                                {task.clients.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showEventModal && <AddEventModal onClose={() => setShowEventModal(false)} onSuccess={() => { setShowEventModal(false); fetchDashboardData(); }} />}
            {showClientModal && <AddClientModal onClose={() => setShowClientModal(false)} onSuccess={() => { setShowClientModal(false); fetchDashboardData(); }} />}
        </div>
    );
}
