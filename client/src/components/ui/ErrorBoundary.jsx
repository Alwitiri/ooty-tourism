import { Component } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <HiExclamationCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold font-display text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 text-sm mb-4">An unexpected error occurred. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="btn-primary text-sm">
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
