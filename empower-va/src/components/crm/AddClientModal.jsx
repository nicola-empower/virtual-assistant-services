import React, { useState } from 'react';
import { X, Save, ShieldAlert } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AddClientModal({ onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        status: 'Active',
        email: '',
        phone: '',
        address: '',
        hourly_rate: '',
        scope_of_work: '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('clients')
            .insert([formData]);

        setLoading(false);

        if (error) {
            console.error('Error adding client:', error);
            alert('Failed to add client. Check console for details.');
        } else {
            onSuccess();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-slate-800">Add New Client</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Client / Company Name *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                                placeholder="e.g. Acme Corp"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 bg-white"
                            >
                                <option value="Active">Active</option>
                                <option value="Lead">Lead</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                                placeholder="contact@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                                placeholder="+44 7700 900000"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Billing Address</label>
                        <textarea
                            name="address"
                            rows="2"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                            placeholder="Full invoice address..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Hourly Rate (£)</label>
                            <input
                                type="number"
                                name="hourly_rate"
                                value={formData.hourly_rate}
                                onChange={handleChange}
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                                placeholder="30.00"
                            />
                        </div>
                    </div>

                    {/* Scope Guard Section */}
                    <div className="bg-brand-lilac/5 p-6 rounded-xl border border-brand-lilac/20">
                        <div className="flex items-center gap-2 mb-3 text-brand-lilac font-bold">
                            <ShieldAlert className="w-5 h-5" />
                            <h3>The Scope Guard</h3>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">
                            Define exactly what IS and IS NOT included. This will differ from client requests later to prevent scope creep.
                        </p>
                        <textarea
                            name="scope_of_work"
                            rows="4"
                            value={formData.scope_of_work}
                            onChange={handleChange}
                            className="w-full p-3 border border-brand-lilac/30 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none bg-white text-slate-900 placeholder:text-slate-400"
                            placeholder="- Email Management (Inbox Zero only)&#10;- Social Media (3 posts/week)&#10;- NO weekend support&#10;- NO web development"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Internal Notes</label>
                        <textarea
                            name="notes"
                            rows="2"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-lilac outline-none text-slate-900 placeholder:text-slate-400 bg-white"
                            placeholder="Private notes about this client..."
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-lg font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-lg font-bold text-white bg-brand-lilac hover:bg-brand-lilac-hover shadow-lg transition-all flex items-center gap-2"
                        >
                            {loading ? 'Saving...' : <><Save className="w-4 h-4" /> Save Client</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
