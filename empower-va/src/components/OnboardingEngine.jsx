import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Download, CheckCircle, User, Palette, Key, Database, Save } from 'lucide-react';
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import { DossierDocument } from './pdf/DossierDocument';
import { supabase } from '../lib/supabase';

const DossierDownloader = ({ data }) => {
    const [instance, updateInstance] = usePDF({
        document: <DossierDocument data={data} logoUrl={window.location.origin + '/logo.png'} />
    });

    if (instance.loading) {
        return (
            <button disabled className="flex items-center justify-center gap-2 bg-slate-900/50 text-white py-4 rounded-xl font-bold w-full shadow-lg cursor-wait">
                Preparing PDF...
            </button>
        );
    }

    if (instance.error) {
        return (
            <div className="text-red-500 text-sm text-center font-bold p-2">
                Formatting Error: {instance.error}
            </div>
        );
    }

    return (
        <a
            href={instance.url}
            download={`Dossier_${data.clientName || 'Client'}.pdf`}
            className="flex items-center justify-center gap-2 bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-slate-700 w-full shadow-lg transition-all"
        >
            <Download className="w-4 h-4" /> Download PDF Only
        </a>
    );
};

export default function OnboardingEngine() {
    const [step, setStep] = useState(1);
    const [isClient, setIsClient] = useState(false);
    const [saveStatus, setSaveStatus] = useState('idle'); // idle, saved, error
    const [formData, setFormData] = useState({
        clientName: '',
        businessName: '',
        email: '',
        brandColors: '',
        fonts: '',
        toneOfVoice: '',
        communicationPref: 'Email',
        tools: '',
        notes: ''
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSaveToCRM = async () => {
        setSaveStatus('saving');

        // Prepare data for Supabase
        // Map 'clientName' to first/last name logic if possible, or just Notes.
        // We'll use 'businessName' as the main 'name', or fallback to 'clientName'.
        const mainName = formData.businessName || formData.clientName || 'Unnamed Client';

        const { data, error } = await supabase.from('clients').insert([{
            name: mainName,
            first_name: formData.clientName, // Store full name here for simplicity
            email: formData.email,
            brand_colors: formData.brandColors,
            fonts: formData.fonts,
            tone_of_voice: formData.toneOfVoice,
            communication_pref: formData.communicationPref,
            tools: formData.tools,
            notes: formData.notes,
            status: 'Onboarding',
            scope_of_work: 'Drafted via Onboarding Engine',
            address: 'Pending'
        }]).select();

        if (error) {
            console.error(error);
            setSaveStatus('error');
        } else {
            setSaveStatus('saved');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                            <h3 className="text-lg font-bold text-teal-900 flex items-center gap-2 mb-1">
                                <User className="w-5 h-5 text-teal-600" /> Core Identity
                            </h3>
                            <p className="text-sm text-teal-700">Who is this client? The basics.</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="clientName"
                                placeholder="Contact Name (e.g. Sarah Jones)"
                                value={formData.clientName}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all shadow-sm"
                            />
                            <input
                                type="text"
                                name="businessName"
                                placeholder="Business Name (e.g. Acme Corp)"
                                value={formData.businessName}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all shadow-sm"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all shadow-sm"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                            <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2 mb-1">
                                <Palette className="w-5 h-5 text-purple-600" /> Brand Identity
                            </h3>
                            <p className="text-sm text-purple-700">Define the look and feel.</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="brandColors"
                                placeholder="Brand Colors (Hex Codes, e.g. #FF5733)"
                                value={formData.brandColors}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all shadow-sm"
                            />
                            <input
                                type="text"
                                name="fonts"
                                placeholder="Fonts (e.g. Inter, Playfair Display)"
                                value={formData.fonts}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all shadow-sm"
                            />
                            <textarea
                                name="toneOfVoice"
                                placeholder="Tone of Voice (e.g. Professional, Witty, Casual)"
                                value={formData.toneOfVoice}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all shadow-sm h-32 resize-none"
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                            <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-1">
                                <Key className="w-5 h-5 text-amber-600" /> Access & Logistics
                            </h3>
                            <p className="text-sm text-amber-700">How will we work together?</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Communication Pref</label>
                                <select
                                    name="communicationPref"
                                    value={formData.communicationPref}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all shadow-sm appearance-none"
                                >
                                    <option>Email</option>
                                    <option>Slack</option>
                                    <option>WhatsApp</option>
                                    <option>Zoom</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                name="tools"
                                placeholder="Key Tools (e.g. Notion, Asana, WordPress)"
                                value={formData.tools}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all shadow-sm"
                            />
                            <textarea
                                name="notes"
                                placeholder="Additional Notes / Passwords (stored locally initially)"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all shadow-sm h-32 resize-none"
                            />
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="flex flex-col xl:flex-row gap-8 h-full">

            {/* Left: Wizard Form - Now with Glass Effect */}
            <div className="w-full xl:w-2/3 glass-card p-8 rounded-3xl border border-white/20 shadow-xl flex flex-col relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                {/* Progress Bar */}
                <div className="flex items-center gap-3 mb-10 relative z-10">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex-1">
                            <div className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'bg-gradient-to-r from-teal-400 to-teal-500 shadow-lg shadow-teal-500/30' : 'bg-slate-200/50'}`} />
                            <div className={`text-xs font-bold mt-2 text-center transition-colors ${step >= i ? 'text-teal-600' : 'text-slate-300'}`}>
                                {i === 1 ? 'Identity' : i === 2 ? 'Brand' : 'Access'}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-1 relative z-10">
                    {renderStep()}
                </div>

                <div className="flex justify-between mt-10 pt-6 border-t border-slate-100/50 relative z-10">
                    {step > 1 ? (
                        <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                    ) : <div></div>}

                    {step < 3 ? (
                        <button onClick={nextStep} className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                            Next Step <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="text-teal-600 font-bold flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg border border-teal-100">
                            <CheckCircle className="w-5 h-5" /> Ready for Review
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Action Center */}
            <div className="w-full xl:w-1/3 flex flex-col gap-6">
                <div className="glass-card p-8 rounded-3xl border border-white/20 text-center shadow-xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent opacity-50 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-teal-500/30">
                            <Database className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-xl mb-2">Smart CRM Entry</h4>
                        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                            Once approved, this will create a permanent Record in Supabase and generate a stylised PDF dossier.
                        </p>

                        {isClient && step === 3 ? (
                            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                {saveStatus === 'saved' ? (
                                    <div className="bg-green-100 text-green-700 p-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-green-200 shadow-sm">
                                        <CheckCircle className="w-5 h-5" /> Saved to CRM!
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleSaveToCRM}
                                        disabled={saveStatus === 'saving'}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white py-4 rounded-xl font-bold hover:from-teal-500 hover:to-teal-400 w-full shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                                    >
                                        {saveStatus === 'saving' ? 'Saving...' : <><Save className="w-5 h-5" /> Create Client Record</>}
                                    </button>
                                )}

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-slate-200"></div>
                                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-bold tracking-wider">Downloads</span>
                                    <div className="flex-grow border-t border-slate-200"></div>
                                </div>

                                <DossierDownloader data={formData} />
                            </div>
                        ) : (
                            <div className="bg-slate-100/50 rounded-xl p-6 border border-slate-200 border-dashed">
                                <p className="text-slate-400 text-sm font-medium">Complete all 3 steps to unlock CRM actions.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wider opacity-80 flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" /> Pro Tip
                    </h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                        Saving creates a "Client Profile" where you can then add <strong>Vault Passwords</strong> and upload <strong>Assets</strong> separately in the Client Detail view.
                    </p>
                </div>
            </div>

        </div>
    );
}
