import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ProposalDocument } from './pdf/ProposalDocument';
import { ContractDocument } from './pdf/ContractDocument';
import { InvoiceDocument } from './pdf/InvoiceDocument';
import TaskTriage from './TaskTriage';
import Timekeeper from './Timekeeper';
import OnboardingEngine from './OnboardingEngine';
import AdminGate from './AdminGate';
import { FileText, Download, PenTool, FileCheck, DollarSign, LayoutGrid, Clock, UserPlus } from 'lucide-react';

export default function AdminSuite() {
    const [activeTab, setActiveTab] = useState('triage');
    const [isClient, setIsClient] = useState(false);

    const [formData, setFormData] = useState({
        clientName: '',
        projectTitle: '',
        scope: '',
        timeline: '',
        investment: '',
        invoiceNumber: '',
        description: '',
        qty: '1',
        rate: '',
        amount: ''
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Calculate amount for invoice automatically if rate and qty change
    useEffect(() => {
        if (activeTab === 'invoice') {
            const total = (parseFloat(formData.rate || 0) * parseFloat(formData.qty || 1)).toFixed(2);
            setFormData(prev => ({ ...prev, amount: `£${total}` }));
        }
    }, [formData.rate, formData.qty, activeTab]);

    const renderForm = () => {
        switch (activeTab) {
            case 'proposal':
                return (
                    <div className="space-y-4">
                        <input type="text" name="clientName" placeholder="Client Name" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                        <input type="text" name="projectTitle" placeholder="Project Title" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                        <textarea name="scope" placeholder="Scope of Work..." className="w-full p-3 border rounded-lg h-32" onChange={handleChange} />
                        <input type="text" name="timeline" placeholder="Timeline (e.g. 2 weeks)" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                        <input type="text" name="investment" placeholder="Investment (e.g. £500)" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                    </div>
                );
            case 'contract':
                return (
                    <div className="space-y-4">
                        <input type="text" name="clientName" placeholder="Client Name" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                        <p className="text-sm text-slate-500">The contract will reference the standard terms and conditions.</p>
                    </div>
                );
            case 'invoice':
                return (
                    <div className="space-y-4">
                        <input type="text" name="clientName" placeholder="Client Name" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                        <input type="text" name="invoiceNumber" placeholder="Invoice # (e.g. 001)" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                        <input type="text" name="description" placeholder="Description of Service" className="w-full p-3 border rounded-lg" onChange={handleChange} />
                        <div className="flex gap-4">
                            <input type="number" name="qty" placeholder="Qty" className="w-1/3 p-3 border rounded-lg" onChange={handleChange} value={formData.qty} />
                            <input type="number" name="rate" placeholder="Rate (£)" className="w-2/3 p-3 border rounded-lg" onChange={handleChange} />
                        </div>
                        <div className="p-3 bg-slate-100 rounded-lg font-bold text-right text-teal-800">
                            Total: {formData.amount}
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    const renderDownloadButton = () => {
        if (!isClient || !formData.clientName) return <button disabled className="bg-slate-200 text-slate-400 px-6 py-3 rounded-lg font-bold w-full">Fill details to Download</button>;

        const logoUrl = window.location.origin + '/logo.png';
        let doc, filename;

        if (activeTab === 'proposal') {
            doc = <ProposalDocument data={formData} logoUrl={logoUrl} />;
            filename = `Proposal_${formData.clientName}.pdf`;
        } else if (activeTab === 'contract') {
            doc = <ContractDocument data={formData} logoUrl={logoUrl} />;
            filename = `Contract_${formData.clientName}.pdf`;
        } else {
            doc = <InvoiceDocument data={formData} logoUrl={logoUrl} />;
            filename = `Invoice_${formData.invoiceNumber}.pdf`;
        }

        return (
            <PDFDownloadLink document={doc} fileName={filename} className="flex items-center justify-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-800 transition-all w-full shadow-lg">
                {({ loading }) => (loading ? 'Generating...' : <><Download className="w-4 h-4" /> Download {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</>)}
            </PDFDownloadLink>
        );
    };

    return (
        <AdminGate>
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">

                {/* Tabs */}
                <div className="flex border-b border-slate-200 overflow-x-auto">
                    <button onClick={() => setActiveTab('triage')} className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 min-w-[120px] ${activeTab === 'triage' ? 'bg-teal-50 text-teal-800 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <LayoutGrid className="w-4 h-4" /> Triage
                    </button>
                    <button onClick={() => setActiveTab('timekeeper')} className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 min-w-[120px] ${activeTab === 'timekeeper' ? 'bg-teal-50 text-teal-800 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <Clock className="w-4 h-4" /> Timekeeper
                    </button>
                    <button onClick={() => setActiveTab('onboarding')} className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 min-w-[120px] ${activeTab === 'onboarding' ? 'bg-teal-50 text-teal-800 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <UserPlus className="w-4 h-4" /> Onboarding
                    </button>
                    <button onClick={() => setActiveTab('proposal')} className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 min-w-[120px] ${activeTab === 'proposal' ? 'bg-teal-50 text-teal-800 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <PenTool className="w-4 h-4" /> Proposal
                    </button>
                    <button onClick={() => setActiveTab('contract')} className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 min-w-[120px] ${activeTab === 'contract' ? 'bg-teal-50 text-teal-800 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <FileCheck className="w-4 h-4" /> Contract
                    </button>
                    <button onClick={() => setActiveTab('invoice')} className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 min-w-[120px] ${activeTab === 'invoice' ? 'bg-teal-50 text-teal-800 border-b-2 border-teal-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <DollarSign className="w-4 h-4" /> Invoice
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === 'triage' ? (
                        <TaskTriage />
                    ) : activeTab === 'timekeeper' ? (
                        <Timekeeper />
                    ) : activeTab === 'onboarding' ? (
                        <OnboardingEngine />
                    ) : (
                        <div className="flex flex-col md:flex-row gap-10">
                            {/* Form */}
                            <div className="w-full md:w-2/3">
                                <h3 className="text-xl font-bold text-slate-800 mb-4 capitalize">{activeTab} Details</h3>
                                {renderForm()}
                            </div>

                            {/* Action */}
                            <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <FileText className="w-16 h-16 text-slate-300 mb-4" />
                                <p className="text-sm text-slate-500 mb-6 text-center">Ready to generate your professional PDF.</p>
                                {renderDownloadButton()}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </AdminGate>
    );
}
