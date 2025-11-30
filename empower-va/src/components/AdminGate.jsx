import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminGate({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('empower_admin_token');
        if (token === 'valid_session_88') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleUnlock = (e) => {
        e.preventDefault();
        if (pin === 'EMPOWER-88') {
            localStorage.setItem('empower_admin_token', 'valid_session_88');
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Access Denied: Invalid Security Code');
            setPin('');
        }
    };

    if (loading) return null;

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-[600px] flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">

                {/* Header */}
                <div className="bg-slate-900 p-8 text-center">
                    <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Lock className="w-8 h-8 text-teal-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Restricted Access</h2>
                    <p className="text-slate-400 text-sm">Empower VA Command Center</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleUnlock} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Security Access Code
                            </label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="Enter PIN"
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                        >
                            Unlock System <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            <ShieldCheck className="w-3 h-3" />
                            Secure Client-Side Gate
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
