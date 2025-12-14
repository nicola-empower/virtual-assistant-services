import React, { useState, useEffect } from 'react';
import { X, Save, Clock, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AddEventModal({ onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        start_time: '', // Format: YYYY-MM-DDTHH:MM
        duration_minutes: 60,
        client_id: '', // Optional
        color: 'blue'
    });

    // Fetch clients for dropdown
    useEffect(() => {
        const fetchClients = async () => {
            const { data } = await supabase.from('clients').select('id, name');
            if (data) setClients(data);
        };
        fetchClients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('schedule')
            .insert([{
                ...formData,
                client_id: formData.client_id || null // Handle empty string
            }]);

        setLoading(false);

        if (error) {
            console.error('Error adding event:', error);
            alert('Failed to add event');
        } else {
            onSuccess();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">Add Schedule Event</h3>
                    <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Event Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 bg-white"
                            placeholder="e.g. Client Call"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Start Time</label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.start_time}
                                onChange={e => setFormData({ ...formData, start_time: e.target.value })}
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Duration (mins)</label>
                            <input
                                type="number"
                                required
                                value={formData.duration_minutes}
                                onChange={e => setFormData({ ...formData, duration_minutes: e.target.value })}
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Link Client (Optional)</label>
                        <select
                            value={formData.client_id}
                            onChange={e => setFormData({ ...formData, client_id: e.target.value })}
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 bg-white"
                        >
                            <option value="">No Client Linked</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Color Tag</label>
                        <div className="flex gap-3">
                            {['blue', 'green', 'lilac', 'orange'].map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color })}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === color
                                            ? `border-slate-600 scale-110`
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                        } ${color === 'blue' ? 'bg-blue-400' :
                                            color === 'green' ? 'bg-green-400' :
                                                color === 'lilac' ? 'bg-brand-lilac' : 'bg-orange-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-brand-lilac text-white font-bold rounded-lg hover:bg-brand-lilac-hover shadow-lg disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Add Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
