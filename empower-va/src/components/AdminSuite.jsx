import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ProposalDocument } from './pdf/ProposalDocument';
import { ContractDocument } from './pdf/ContractDocument';
import { InvoiceDocument } from './pdf/InvoiceDocument';
import TaskTriage from './TaskTriage';
import Timekeeper from './Timekeeper';
import OnboardingEngine from './OnboardingEngine';
import AdminGate from './AdminGate';
import AdminSidebar from './AdminSidebar';
import DashboardHome from './DashboardHome';
import ClientManager from './crm/ClientManager';
import { FileText, Download, PenTool, FileCheck, DollarSign } from 'lucide-react';

import SmartDocumentGenerator from './SmartDocumentGenerator';

export default function AdminSuite() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <AdminGate>
            {/* Main Layout Container - Full Screen with Gradient */}
            <div className="flex h-screen w-full overflow-hidden font-sans" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #d8e2ec 100%)' }}>

                {/* 1. LEFT SIDEBAR */}
                <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                {/* 2. MAIN CONTENT AREA */}
                <main className="flex-1 h-full overflow-y-auto p-8 md:p-12 relative">

                    {/* Content Router */}
                    {activeTab === 'dashboard' && <DashboardHome onNavigate={setActiveTab} />}

                    {activeTab === 'triage' && (
                        <div className="glass-card rounded-2xl p-8 min-h-[600px]">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Task Triage</h2>
                            <p className="text-slate-600 mb-8">Eisenhower Matrix enabled via Supabase.</p>
                            <TaskTriage />
                        </div>
                    )}

                    {activeTab === 'timekeeper' && (
                        <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto mt-10">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-2 text-center">Time Tracker</h2>
                            <p className="text-slate-600 mb-8 text-center">Track your billable hours efficiently.</p>
                            <Timekeeper />
                        </div>
                    )}

                    {activeTab === 'clients' && (
                        <div className="glass-card rounded-2xl p-8 h-full min-h-[600px]">
                            <ClientManager />
                        </div>
                    )}

                    {activeTab === 'documents' && <SmartDocumentGenerator />}

                    {activeTab === 'onboarding' && (
                        <div className="glass-card rounded-2xl p-8 h-full overflow-y-auto">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">New Client Onboarding</h2>
                            <p className="text-slate-600 mb-8">Guided wizard to capture client identity, brand kit, and credentials.</p>
                            <OnboardingEngine />
                        </div>
                    )}

                </main>
            </div>
        </AdminGate>
    );
}
