import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";

const SEARCH_DATA = [
    { title: "Home", path: "/", section: "Page" },
    { title: "About Us", path: "/about", section: "Page" },
    { title: "Services", path: "/services", section: "Page" },
    { title: "Portfolio", path: "/portfolio", section: "Page" },
    { title: "Contact", path: "/contact", section: "Page" },
    { title: "Expert Admin Assistance", path: "/services/admin-assistance", section: "Service" },
    { title: "Email Management", path: "/services/email-management", section: "Service" },
    { title: "Tech Support", path: "/services/tech-support", section: "Service" },
    { title: "The Edge (Blog)", path: "/edge", section: "Blog" },
    // We could dynamically load blog posts here if we pass them as props or fetch a JSON
];

export default function SiteSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const fuse = useMemo(() => new Fuse(SEARCH_DATA, {
        keys: ["title", "section"],
        threshold: 0.3,
    }), []);

    const results = useMemo(() => {
        if (!query) return [];
        return fuse.search(query).map(r => r.item);
    }, [query, fuse]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-slate-500 hover:text-purple-600 transition-colors p-2"
                aria-label="Open Search"
            >
                <Search className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                            <Search className="w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search pages, services, articles..."
                                className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {results.length > 0 ? (
                                <ul className="space-y-1">
                                    {results.map((item) => (
                                        <li key={item.path}>
                                            <a
                                                href={item.path}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 group"
                                            >
                                                <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-purple-600 transition-colors">
                                                    {item.title}
                                                </span>
                                                <span className="text-xs text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">
                                                    {item.section}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : query ? (
                                <div className="p-4 text-center text-slate-500 text-sm">
                                    No results found for "{query}"
                                </div>
                            ) : (
                                <div className="p-4 text-center text-slate-400 text-xs uppercase tracking-wider font-bold">
                                    Start typing to search
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className="absolute inset-0 z-[-1]"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
            )}
        </>
    );
}
