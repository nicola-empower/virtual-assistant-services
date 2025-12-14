import React, { useState } from 'react';
import {
    LayoutDashboard,
    key,
    FileText,
    LogOut,
    Menu,
    X,
    Shield,
    FolderOpen
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, active, href, title }) => (
    <a
        href={href}
        title={title}
        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl transition-all duration-200 relative group
        ${active ? 'bg-white/70 text-brand-lilac-dark shadow-sm' : 'text-slate-500 hover:bg-white/40 hover:text-slate-700'}`}
    >
        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${active ? 'text-brand-lilac-dark' : ''}`} />

        {/* Tooltip */}
        <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {title}
        </span>
    </a>
);

export default function ClientSidebar({ currentPath }) {
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => currentPath === path;

    const handleLogout = async () => {
        const { supabase } = await import('../lib/supabase');
        await supabase.auth.signOut();
        window.location.href = '/client-login';
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md rounded-lg shadow-sm border border-slate-200"
            >
                {isOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 h-screen w-20 md:w-24 bg-white/60 backdrop-blur-xl border-r border-white/50 shadow-2xl z-40
                flex flex-col items-center py-8 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>

                {/* Logo / Brand */}
                <div className="mb-12">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-lilac to-brand-lilac-dark rounded-xl flex items-center justify-center shadow-lg shadow-brand-lilac/20">
                        <span className="text-white font-bold text-xl">E</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-4 md:gap-6 w-full items-center">
                    <SidebarItem
                        icon={LayoutDashboard}
                        title="Dashboard"
                        href="/portal"
                        active={isActive('/portal') || isActive('/portal/')}
                    />
                    <SidebarItem
                        icon={Shield}
                        title="My Vault"
                        href="/portal/vault"
                        active={isActive('/portal/vault')}
                    />
                    <SidebarItem
                        icon={FolderOpen}
                        title="My Assets"
                        href="/portal/assets"
                        active={isActive('/portal/assets')}
                    />
                </nav>

                {/* Footer Actions */}
                <div className="mt-auto flex flex-col gap-4">
                    <button
                        onClick={handleLogout}
                        title="Log Out"
                        className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                    >
                        <LogOut className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
