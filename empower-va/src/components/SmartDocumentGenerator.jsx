import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ProposalDocument } from './pdf/ProposalDocument';
import { ContractDocument } from './pdf/ContractDocument';
import { InvoiceDocument } from './pdf/InvoiceDocument';
import { supabase } from '../lib/supabase';
import { pricing } from '../data/pricing';
import { FileText, Download, Wand2, User, FileCheck, Layers } from 'lucide-react';

export default function SmartDocumentGenerator() {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);

    // Selection State
    const [selectedClientId, setSelectedClientId] = useState('');
    const [selectedPackageName, setSelectedPackageName] = useState('');

    // Form Data
    const [formData, setFormData] = useState({
        docType: 'invoice', // Default
        clientName: '',
        clientAddress: '',
        projectTitle: '',
        scope: '',
        timeline: 'Monthly Rolling',
        investment: '',
        invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        description: '',
        qty: '1',
        rate: '',
        amount: '£0.00'
    });

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchClients();
    }, []);

    // Fetch Clients
    const fetchClients = async () => {
        const { data } = await supabase.from('clients').select('*').order('name');
        if (data) setClients(data);
    };

    // Handle Client Selection
    const handleClientChange = (e) => {
        const clientId = e.target.value;
        setSelectedClientId(clientId);

        if (clientId) {
            const client = clients.find(c => c.id === clientId);
            if (client) {
                setFormData(prev => ({
                    ...prev,
                    clientName: client.name,
                    clientAddress: client.address || '',
                    // If client has a rate, maybe use it? But package override is better.
                }));
            }
        }
    };

    // Handle Package Selection
    const handlePackageChange = (e) => {
        const pkgName = e.target.value;
        setSelectedPackageName(pkgName);

        if (pkgName) {
            const pkg = pricing.find(p => p.name === pkgName);
            if (pkg) {
                setFormData(prev => ({
                    ...prev,
                    description: `${pkg.name} Package (${pkg.hours})\n\nIncludes:\n${pkg.features.map(f => `• ${f}`).join('\n')}`,
                    rate: pkg.price.replace('£', ''), // Remove currency symbol for calc
                    qty: '1',
                    scope: pkg.features.join(', '), // For contracts
                    investment: pkg.price // For proposals
                }));
            }
        }
    };

    // Auto-calculate Amount
    useEffect(() => {
        const total = (parseFloat(formData.rate || 0) * parseFloat(formData.qty || 1)).toFixed(2);
        setFormData(prev => ({ ...prev, amount: `£${total}` }));
    }, [formData.rate, formData.qty]);

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="glass-card rounded-2xl p-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-lilac/10 rounded-xl">
                    <Wand2 className="w-8 h-8 text-brand-lilac" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Smart Document Generator</h2>
                    <p className="text-slate-500">Auto-fill documents from your CRM & Pricing data.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 1. SELECTION PANEL (Left) */}
                <div className="lg:col-span-1 space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> 1. Select Context
                    </h3>

                    {/* Document Type */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Document Type</label>
                        <select
                            name="docType"
                            value={formData.docType}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-brand-lilac"
                        >
                            <option value="invoice">Invoice</option>
                            <option value="contract">Service Agreement</option>
                            <option value="proposal">Proposal</option>
                        </select>
                    </div>

                    {/* Client Dropdown */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Client (CRM)</label>
                        <select
                            value={selectedClientId}
                            onChange={handleClientChange}
                            className="w-full p-3 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-brand-lilac"
                        >
                            <option value="">-- Select Client --</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-400 mt-1">Updates Name & Address automatically.</p>
                    </div>

                    {/* Pricing Package Dropdown */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Service Package</label>
                        <select
                            value={selectedPackageName}
                            onChange={handlePackageChange}
                            className="w-full p-3 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-brand-lilac"
                        >
                            <option value="">-- Custom / Manual --</option>
                            {pricing.map(p => (
                                <option key={p.name} value={p.name}>{p.name} ({p.price})</option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-400 mt-1">Auto-fills line items & rates.</p>
                    </div>
                </div>

                {/* 2. EDIT FORM (Middle) */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-4">
                        <FileCheck className="w-4 h-4" /> 2. Review & Edit Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Client Name</label>
                            <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Document Title / Invoice #</label>
                            <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase">Description / Scope</label>
                        <textarea
                            name={formData.docType === 'contract' ? 'scope' : 'description'}
                            value={formData.docType === 'contract' ? formData.scope : formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-slate-200 rounded-lg h-32 font-mono text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Qty / Hours</label>
                            <input type="number" name="qty" value={formData.qty} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase">Rate (£)</label>
                            <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg" />
                        </div>
                        <div className="text-right">
                            <label className="text-xs font-bold text-slate-400 uppercase">Total</label>
                            <div className="text-xl font-bold text-brand-green-dark mt-1">{formData.amount}</div>
                        </div>
                    </div>

                    {/* 3. DOWNLOAD ACTION */}
                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        {isClient && formData.clientName ? (
                            <PDFDownloadLink
                                document={
                                    formData.docType === 'contract' ? <ContractDocument data={formData} logoUrl={window.location.origin + '/logo.png'} /> :
                                        formData.docType === 'invoice' ? <InvoiceDocument data={formData} logoUrl={window.location.origin + '/logo.png'} /> :
                                            <ProposalDocument data={formData} logoUrl={window.location.origin + '/logo.png'} />
                                }
                                fileName={`${formData.docType.toUpperCase()}_${formData.clientName.replace(/\s+/g, '_')}.pdf`}
                                className="flex items-center gap-2 bg-brand-lilac text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-lilac-hover transition-all shadow-lg hover:scale-[1.02]"
                            >
                                {({ loading }) => (loading ? 'Generating...' : <><Download className="w-5 h-5" /> Download PDF</>)}
                            </PDFDownloadLink>
                        ) : (
                            <button disabled className="bg-slate-200 text-slate-400 px-8 py-3 rounded-xl font-bold cursor-not-allowed flex items-center gap-2">
                                <Download className="w-5 h-5" /> Fill details to Download
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
