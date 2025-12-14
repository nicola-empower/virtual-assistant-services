import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Phone, Mail, MapPin, Clock, ShieldCheck,
    LayoutList, FileText, StickyNote, Box, Lock, Image as ImageIcon,
    Plus, AlertTriangle, Eye, EyeOff, ExternalLink, Download, Trash2, Palette
} from 'lucide-react';

export default function ClientDetail({ client, onBack }) {
    const [activeTab, setActiveTab] = useState('tasks');
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState("");

    // New State for Vault & Assets
    const [vaultItems, setVaultItems] = useState([]);
    const [assets, setAssets] = useState([]);

    // Vault Form State
    const [showVaultForm, setShowVaultForm] = useState(false);
    const [vaultForm, setVaultForm] = useState({ title: '', username: '', password: '', url: '' });

    useEffect(() => {
        fetchTasks();
        fetchVault();
        fetchAssets();
    }, [client.id]);

    // --- TASKS ---
    const fetchTasks = async () => {
        const { data } = await supabase.from('tasks').select('*').eq('client_id', client.id).order('created_at', { ascending: false });
        if (data) setTasks(data);
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        const { error } = await supabase.from('tasks').insert([{ text: newTaskText, client_id: client.id, quadrant: 'do_first' }]);
        if (!error) {
            setNewTaskText("");
            fetchTasks();
        }
    };

    // --- VAULT ---
    const fetchVault = async () => {
        const { data } = await supabase.from('vault_items').select('*').eq('client_id', client.id);
        if (data) setVaultItems(data);
    };

    const addVaultItem = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('vault_items').insert([{ ...vaultForm, client_id: client.id }]);
        if (!error) {
            setVaultForm({ title: '', username: '', password: '', url: '' });
            setShowVaultForm(false);
            fetchVault();
        }
    };

    // --- ASSETS ---
    const fetchAssets = async () => {
        const { data } = await supabase.from('assets').select('*').eq('client_id', client.id);
        if (data) setAssets(data);
    };

    // Mock Upload (since bucket creation might be skipped by user)
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        alert("Note: File Uploads require the 'client-assets' bucket. Saving as reference for now.");

        // Simulating a saved asset reference for the UI
        const { error } = await supabase.from('assets').insert([{
            name: file.name,
            type: file.type,
            file_url: "#", // Placeholder
            client_id: client.id
        }]);

        if (!error) fetchAssets();
    };


    const renderTabContent = () => {
        if (activeTab === 'tasks') {
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <form onSubmit={addTask} className="flex gap-4">
                        <input
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="Add a new task for this client..."
                            className="flex-1 bg-transparent border-b-2 border-slate-200 focus:border-teal-500 px-4 py-2 outline-none transition-colors"
                        />
                        <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg transition-colors">
                            <Plus className="w-5 h-5" />
                        </button>
                    </form>
                    <div className="space-y-2">
                        {tasks.length === 0 ? <p className="text-slate-400 italic">No tasks yet.</p> : tasks.map(t => (
                            <div key={t.id} className="p-4 bg-white border border-slate-100 rounded-lg shadow-sm flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-400" />
                                <span className="text-slate-700">{t.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (activeTab === 'brand') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
                    {/* Brand Colors */}
                    <div className="p-6 bg-white rounded-xl border border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Palette className="w-4 h-4 text-purple-600" /> Brand Colors
                        </h4>
                        {client.brand_colors ? (
                            <div className="flex flex-wrap gap-3">
                                {client.brand_colors.split(',').map((color, i) => (
                                    <div key={i} className="group relative">
                                        <div
                                            className="w-16 h-16 rounded-lg shadow-sm border border-slate-100 cursor-pointer transition-transform hover:scale-110"
                                            style={{ backgroundColor: color.trim() }}
                                            title={color.trim()}
                                        />
                                        <span className="text-xs text-slate-500 mt-1 block text-center font-mono">{color.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-slate-400 italic">No colors defined.</p>}
                    </div>

                    {/* Fonts & Voice */}
                    <div className="space-y-6">
                        <div className="p-6 bg-white rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-800 mb-2">Typography</h4>
                            <p className="text-slate-600 font-medium">{client.fonts || "No fonts defined."}</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200">
                            <h4 className="font-bold text-slate-800 mb-2">Tone of Voice</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{client.tone_of_voice || "No tone defined."}</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === 'vault') {
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-800">Secure Credentials</h4>
                        <button onClick={() => setShowVaultForm(!showVaultForm)} className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>

                    {showVaultForm && (
                        <form onSubmit={addVaultItem} className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4">
                            <input className="p-2 rounded border" placeholder="Title (e.g. WordPress)" value={vaultForm.title} onChange={e => setVaultForm({ ...vaultForm, title: e.target.value })} />
                            <input className="p-2 rounded border" placeholder="Login URL" value={vaultForm.url} onChange={e => setVaultForm({ ...vaultForm, url: e.target.value })} />
                            <input className="p-2 rounded border" placeholder="Username" value={vaultForm.username} onChange={e => setVaultForm({ ...vaultForm, username: e.target.value })} />
                            <input className="p-2 rounded border" placeholder="Password" value={vaultForm.password} onChange={e => setVaultForm({ ...vaultForm, password: e.target.value })} />
                            <button type="submit" className="col-span-2 bg-teal-600 text-white font-bold py-2 rounded-lg">Save Credential</button>
                        </form>
                    )}

                    <div className="grid grid-cols-1 gap-3">
                        {vaultItems.map(item => (
                            <div key={item.id} className="p-4 bg-white border border-slate-200 rounded-lg flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">{item.title}</div>
                                        <div className="text-xs text-slate-400 font-mono">{item.username}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-slate-100 rounded text-slate-500" title="Copy Password" onClick={() => navigator.clipboard.writeText(item.password)}>
                                        <Key className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-slate-100 rounded text-slate-500" title="Open URL" onClick={() => window.open(item.url, '_blank')}>
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {vaultItems.length === 0 && <p className="text-slate-400 italic text-center py-8">Vault is empty.</p>}
                    </div>
                </div>
            );
        }

        if (activeTab === 'assets') {
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-800">Files & Assets</h4>
                        <label className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-slate-800">
                            <Plus className="w-4 h-4" /> Upload File
                            <input type="file" className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {assets.map(file => (
                            <div key={file.id} className="group relative bg-white border border-slate-200 p-4 rounded-xl hover:shadow-md transition-all">
                                <div className="aspect-square bg-slate-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                                    {file.type && file.type.includes('image') ? (
                                        <ImageIcon className="w-8 h-8 text-slate-300" />
                                    ) : (
                                        <FileText className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>
                                <div className="font-bold text-sm text-slate-700 truncate">{file.name}</div>
                                <div className="text-xs text-slate-400 mt-1">{file.type}</div>
                            </div>
                        ))}
                        {assets.length === 0 && <p className="col-span-3 text-slate-400 italic text-center py-8">No assets uploaded.</p>}
                    </div>
                </div>
            );
        }

        return <div className="p-8 text-center text-slate-400">Coming Soon</div>;
    };

    return (
        <div className="h-full flex flex-col bg-slate-50/50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-slate-400 hover:text-slate-800 transition-colors">
                        ← Back
                    </button>
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800">{client.name}</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${client.status === 'Active' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                {client.status}
                            </span>
                            <span>•</span>
                            <span>{client.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar - Info & Scope Guard */}
                <div className="w-80 bg-white border-r border-slate-200 p-6 overflow-y-auto hidden lg:block">
                    <div className="space-y-8">
                        {/* Scope Guard */}
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-amber-600 font-bold text-sm uppercase tracking-wider">
                                <ShieldCheck className="w-4 h-4" /> Scope Guard
                            </div>
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-sm text-amber-900 leading-relaxed shadow-sm">
                                {client.scope_of_work || "No scope defined. Add one to prevent scope creep!"}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-bold text-slate-800 mb-3">Contact Details</h4>
                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-slate-400" /> {client.email}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-slate-400" /> {client.phone || '--'}
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-slate-400 mt-1" /> {client.address || '--'}
                                </div>
                            </div>
                        </div>

                        {/* Rate */}
                        <div className="bg-slate-900 text-white p-4 rounded-xl">
                            <div className="text-slate-400 text-xs uppercase font-bold mb-1">Hourly Rate</div>
                            <div className="text-2xl font-mono font-bold">£{client.hourly_rate || '0.00'}/hr</div>
                        </div>
                    </div>
                </div>

                {/* Right Main - Tabs & Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 bg-white px-6">
                        {['tasks', 'notes', 'brand', 'vault', 'assets'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 text-sm font-bold border-b-2 transition-all capitalize ${activeTab === tab
                                        ? 'border-teal-500 text-teal-700'
                                        : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="max-w-3xl mx-auto">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
