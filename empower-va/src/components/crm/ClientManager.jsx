import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, Mail, Phone, ArrowRight, User, MoreHorizontal, FileText, ArrowLeft, ShieldAlert } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AddClientModal from './AddClientModal';
import ClientDetail from './ClientDetail';

export default function ClientManager() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [view, setView] = useState('list'); // 'list' | 'detail'
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching clients:', error);
        else setClients(data || []);

        setLoading(false);
    };

    const handleClientClick = (client) => {
        setSelectedClient(client);
        setView('detail');
    };

    const handleBack = () => {
        setSelectedClient(null);
        setView('list');
        fetchClients(); // Refresh data on return
    };

    if (view === 'detail' && selectedClient) {
        return <ClientDetail client={selectedClient} onBack={handleBack} />;
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800">Client Manager</h2>
                    <p className="text-slate-500">Manage relationships, scope, and billing.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-brand-lilac hover:bg-brand-lilac-hover text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all"
                >
                    <Plus className="w-5 h-5" /> Add Client
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64 text-slate-400 animate-pulse">Loading clients...</div>
                ) : clients.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-slate-200">
                        <User className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-xl font-bold text-slate-600">No Clients Yet</h3>
                        <p className="text-slate-400 mb-6">Add your first client to start tracking scope and tasks.</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="text-brand-lilac font-bold hover:underline"
                        >
                            Create Client Profile
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {clients.map(client => (
                            <div
                                key={client.id}
                                onClick={() => handleClientClick(client)}
                                className="bg-white/80 p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-lilac/30 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-brand-lilac/20 to-blue-100 rounded-full flex items-center justify-center text-brand-lilac font-bold text-lg">
                                            {client.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 group-hover:text-brand-lilac transition-colors">{client.name}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${client.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                client.status === 'Lead' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {client.status || 'Active'}
                                            </span>
                                        </div>
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 text-slate-500 hover:text-slate-700" />
                                </div>

                                <div className="space-y-2 mb-4">
                                    {client.email && (
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Mail className="w-4 h-4" /> {client.email}
                                        </div>
                                    )}
                                    {client.address && (
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <MapPin className="w-4 h-4" /> <span className="truncate">{client.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Scope Badge (Mini) */}
                                {client.scope_of_work && (
                                    <div className="bg-slate-50 p-2 rounded border border-slate-100 flex items-start gap-2 mb-2">
                                        <ShieldAlert className="w-4 h-4 text-brand-lilac shrink-0 mt-0.5" />
                                        <p className="text-xs text-slate-600 line-clamp-2">{client.scope_of_work}</p>
                                    </div>
                                )}

                                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                                    <span className="font-mono text-slate-500">£{client.hourly_rate || '0.00'}/hr</span>
                                    <span className="text-brand-lilac font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        View Profile <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showAddModal && (
                <AddClientModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        fetchClients();
                    }}
                />
            )}
        </div>
    );
}
