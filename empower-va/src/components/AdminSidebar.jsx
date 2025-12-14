import React from 'react';
import { Sparkles, LayoutGrid, Users, CheckCircle, Clock, CalendarDays, FileText } from 'lucide-react';

const SidebarItem = ({ icon: Icon, active, onClick, title }) => (
    <button
        onClick={onClick}
        title={title}
        className={`w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-200 relative group
        ${active ? 'bg-white/70 text-brand-lilac-dark' : 'text-slate-700 hover:bg-white/40'}`}
    >
        <Icon className={`w-6 h-6 ${active ? 'text-brand-lilac-dark' : ''}`} />

        {/* Active Indicator Strip */}
        {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-1 bg-brand-lilac rounded-r-md" />
        )}

        {/* Tooltip on hover */}
        <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {title}
        </span>
    </button>
);

export default function AdminSidebar({ activeTab, onTabChange }) {
    return (
        <nav className="glass-sidebar w-20 flex flex-col items-center shrink-0 h-full py-6 space-y-6 z-20">
            {/* Logo */}
            <div className="w-12 h-12 bg-brand-lilac rounded-xl flex items-center justify-center shadow-lg mb-4">
                <Sparkles className="text-white w-6 h-6" />
            </div>

            {/* Main Navigation */}
            <div className="flex flex-col space-y-4 items-center w-full">
                <SidebarItem
                    icon={LayoutGrid}
                    title="Dashboard"
                    active={activeTab === 'dashboard'}
                    onClick={() => onTabChange('dashboard')}
                />
                <SidebarItem
                    icon={Users}
                    title="Clients"
                    active={activeTab === 'clients'}
                    onClick={() => onTabChange('clients')}
                />
                <SidebarItem
                    icon={CheckCircle}
                    title="Tasks"
                    active={activeTab === 'triage'}
                    onClick={() => onTabChange('triage')}
                />
                <SidebarItem
                    icon={Clock}
                    title="Time Tracker"
                    active={activeTab === 'timekeeper'}
                    onClick={() => onTabChange('timekeeper')}
                />
                {/* 
                <SidebarItem 
                    icon={CalendarDays} 
                    title="Content" 
                    active={activeTab === 'content'} 
                    onClick={() => onTabChange('content')} 
                />
                */}
                <SidebarItem
                    icon={FileText}
                    title="Documents"
                    active={activeTab === 'proposal' || activeTab === 'contract' || activeTab === 'invoice' || activeTab === 'documents'}
                    onClick={() => onTabChange('documents')}
                />
                <SidebarItem
                    icon={Sparkles} // Reusing Sparkles or importing Rocket if available
                    title="Onboarding"
                    active={activeTab === 'onboarding'}
                    onClick={() => onTabChange('onboarding')}
                />
            </div>

            {/* User Profile (Demo) */}
            <div className="mt-auto">
                <div className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-purple-200 flex items-center justify-center text-purple-700 font-bold">
                    VA
                </div>
            </div>
        </nav>
    );
}
