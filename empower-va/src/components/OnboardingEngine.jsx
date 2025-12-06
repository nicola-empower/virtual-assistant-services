import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Download, CheckCircle, User, Palette, Key } from 'lucide-react';
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import { DossierDocument } from './pdf/DossierDocument';

const DossierDownloader = ({ data }) => {
    const [instance, updateInstance] = usePDF({
        document: <DossierDocument data={data} logoUrl={window.location.origin + '/logo.png'} />
    });

    if (instance.loading) {
        return (
            <button disabled className="flex items-center justify-center gap-2 bg-slate-900/50 text-white py-4 rounded-xl font-bold w-full shadow-lg cursor-wait">
                Generating...
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
            className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 w-full shadow-lg transition-all"
        >
            <Download className="w-4 h-4" /> Download Dossier
        </a>
    );
};

export default function OnboardingEngine() {
    const [step, setStep] = useState(1);
    const [isClient, setIsClient] = useState(false);
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

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <User className="w-5 h-5 text-teal-600" /> Core Identity
                        </h3>
                        <input type="text" name="clientName" placeholder="Client Name" value={formData.clientName} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                        <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-purple-600" /> Brand Identity
                        </h3>
                        <input type="text" name="brandColors" placeholder="Brand Colors (Hex Codes)" value={formData.brandColors} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                        <input type="text" name="fonts" placeholder="Fonts (e.g. Inter, Playfair)" value={formData.fonts} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                        <textarea name="toneOfVoice" placeholder="Tone of Voice (e.g. Professional, Witty)" value={formData.toneOfVoice} onChange={handleChange} className="w-full p-3 border rounded-lg h-24" />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Key className="w-5 h-5 text-amber-600" /> Access & Logistics
                        </h3>
                        <select name="communicationPref" value={formData.communicationPref} onChange={handleChange} className="w-full p-3 border rounded-lg">
                            <option>Email</option>
                            <option>Slack</option>
                            <option>WhatsApp</option>
                            <option>Zoom</option>
                        </select>
                        <input type="text" name="tools" placeholder="Key Tools (e.g. Notion, Asana)" value={formData.tools} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                        <textarea name="notes" placeholder="Additional Notes / Passwords (stored locally only)" value={formData.notes} onChange={handleChange} className="w-full p-3 border rounded-lg h-24" />
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">

            {/* Left: Wizard Form */}
            <div className="w-full md:w-2/3 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                {/* Progress Bar */}
                <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${step >= i ? 'bg-teal-500' : 'bg-slate-100'}`} />
                    ))}
                </div>

                {renderStep()}

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                    {step > 1 ? (
                        <button onClick={prevStep} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                    ) : <div></div>}

                    {step < 3 ? (
                        <button onClick={nextStep} className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700">
                            Next Step <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="text-teal-600 font-bold flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> All Set!
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Preview & Download */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                    <h4 className="font-bold text-slate-800 mb-2">Client Dossier</h4>
                    <p className="text-sm text-slate-500 mb-6">Generate a confidential PDF profile for your records.</p>

                    {isClient && step === 3 ? (
                        <DossierDownloader data={formData} />
                    ) : (
                        <button disabled className="w-full bg-slate-200 text-slate-400 py-4 rounded-xl font-bold cursor-not-allowed">
                            Complete All Steps
                        </button>
                    )}
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 mb-2 text-sm uppercase">Pro Tip</h4>
                    <p className="text-sm text-blue-600">
                        Use this form during your kickoff call. Fill it out as you speak, then save the PDF to your client's folder immediately.
                    </p>
                </div>
            </div>

        </div>
    );
}
