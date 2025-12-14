import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default class DebugErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 m-4 bg-red-50 border border-red-200 rounded-xl text-red-900 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-4 text-red-600 font-bold text-lg">
                        <AlertTriangle className="w-6 h-6" />
                        Runtime Error
                    </div>
                    <div className="font-bold mb-2">{this.state.error?.toString()}</div>
                    <details className="whitespace-pre-wrap opacity-70">
                        {this.state.errorInfo?.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}
