import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    color: 'white',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <div style={{
                        maxWidth: '700px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '40px',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h1 style={{ fontSize: '36px', marginTop: 0 }}>⚠️ Something went wrong</h1>
                        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                            The application encountered an error. Don't worry, your data is safe!
                        </p>

                        <div style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            padding: '20px',
                            borderRadius: '12px',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{ marginTop: 0 }}>Error Details:</h3>
                            <code style={{
                                display: 'block',
                                background: 'rgba(0, 0, 0, 0.3)',
                                padding: '15px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                overflow: 'auto',
                                maxHeight: '200px'
                            }}>
                                {this.state.error && this.state.error.toString()}
                            </code>
                        </div>

                        <div style={{
                            background: 'rgba(16, 185, 129, 0.2)',
                            padding: '20px',
                            borderRadius: '12px',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{ marginTop: 0 }}>💡 Quick Fixes:</h3>
                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                <li>Try refreshing the page (Ctrl+R)</li>
                                <li>Clear browser cache (Ctrl+Shift+Delete)</li>
                                <li>Update your browser to the latest version</li>
                                <li>Try a different browser (Chrome, Edge, Firefox)</li>
                            </ol>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '15px 30px',
                                background: 'white',
                                color: '#667eea',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            🔄 Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
