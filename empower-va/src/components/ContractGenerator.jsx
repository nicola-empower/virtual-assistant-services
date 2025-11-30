import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ContractDocument } from './pdf/ContractDocument';
import { FileText, Download, PenTool } from 'lucide-react';

export default function ContractGenerator() {
    const [formData, setFormData] = useState({
        clientName: '',
        scope: ''
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10">

            {/* LEFT: THE INPUT FORM */}
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3 text-teal-800 mb-2">
                    <div className="p-2 bg-teal-100 rounded-lg">
                        <PenTool className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold">Draft Your Agreement</h3>
                </div>

                <p className="text-sm text-slate-500">
                    Enter your project details to auto-generate a professional Service Agreement PDF.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Client Name</label>
                        <input
                            type="text"
                            name="clientName"
                            placeholder="e.g. Acme Corp"
                            className="w-full p-3 border border-slate-200 rounded-lg focus:border-teal-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Scope of Work</label>
                        <textarea
                            name="scope"
                            placeholder="e.g. Inbox management, Calendar scheduling, Travel booking..."
                            className="w-full p-3 border border-slate-200 rounded-lg h-32 resize-none focus:border-teal-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT: THE OUTPUT */}
            <div className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">

                <FileText className="w-16 h-16 text-slate-300 mb-4" />

                <h3 className="text-lg font-bold text-slate-700 mb-2">Ready to Export</h3>
                <p className="text-sm text-slate-500 mb-8 max-w-xs">
                    Your document is being rendered securely in your browser. No data is stored on our servers.
                </p>

                {/* The Magic Button */}
                {isClient && formData.clientName ? (
                    <PDFDownloadLink
                        document={<ContractDocument data={formData} />}
                        fileName={`Agreement_${formData.clientName.replace(/\s+/g, '_')}.pdf`}
                        className="flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-800 transition-all shadow-lg hover:-translate-y-1"
                    >
                        {({ loading }) => (loading ? 'Generating PDF...' : <><Download className="w-4 h-4" /> Download PDF</>)}
                    </PDFDownloadLink>
                ) : (
                    <button disabled className="flex items-center gap-2 bg-slate-200 text-slate-400 px-6 py-3 rounded-lg font-bold cursor-not-allowed">
                        Fill form to Download
                    </button>
                )}

            </div>

        </div>
    );
}
