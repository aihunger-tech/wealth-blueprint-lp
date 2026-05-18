"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  name?: string;
}

interface State {
  hasErrored: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: { children: ReactNode; name?: string }) {
    super(props);
    this.state = { hasErrored: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasErrored: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasErrored: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-rose-500/20 flex flex-col items-center justify-center gap-4 text-center min-h-[300px]">
          <div className="p-3 rounded-full bg-rose-500/10 text-rose-500">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              {this.props.name || "Module Unavailable"}
            </h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Something went wrong while loading this section. Please try refreshing the page.
            </p>
          </div>
          <button 
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-emerald text-brand-navy-dark font-bold text-xs hover:scale-105 transition-all"
          >
            <RefreshCw className="w-3 h-3" /> Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
