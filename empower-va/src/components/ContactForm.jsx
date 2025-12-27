import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const [state, handleSubmit] = useForm("mblkwkpp");

    if (state.succeeded) {
        return (
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center max-w-lg mx-auto animate-fade-in-up">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-6">
                    Thanks for reaching out. I'll reply within 24 hours from <span className="font-semibold text-teal-700">nicola@empowervaservices.co.uk</span>.
                </p>
                <a href="/" className="inline-block px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                    Back to Home
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

            <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Jane Doe"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="jane@company.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none"
                    placeholder="Tell me about your business needs..."
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>

            <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-4 bg-[#1A565E] text-white font-bold rounded-lg hover:bg-[#134046] transition-all shadow-lg shadow-teal-900/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {state.submitting ? 'Sending...' : (
                    <>
                        Send Message <Send className="w-4 h-4" />
                    </>
                )}
            </button>

            {state.errors && state.errors.length > 0 && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    <span>Something went wrong. Please try again.</span>
                </div>
            )}

        </form>
    );
}
