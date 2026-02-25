import React from 'react';

// Simple test component
function TestApp() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '600px',
                background: 'rgba(255,255,255,0.1)',
                padding: '40px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>✅ React is Working!</h1>
                <p style={{ fontSize: '20px', marginBottom: '30px' }}>
                    If you see this message, React is rendering correctly.
                </p>

                <div style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '20px'
                }}>
                    <h2>🎉 NeuroVision AI Server Status</h2>
                    <p>✅ Vite Dev Server: Running</p>
                    <p>✅ React: Loaded</p>
                    <p>✅ Port: {window.location.port || '3002'}</p>
                </div>

                <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '20px',
                    borderRadius: '12px',
                    textAlign: 'left'
                }}>
                    <h3>🔧 Next Steps:</h3>
                    <ol style={{ paddingLeft: '20px' }}>
                        <li>Open browser console (F12)</li>
                        <li>Check for any red error messages</li>
                        <li>Share the error message with me</li>
                    </ol>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: '20px',
                        padding: '15px 30px',
                        background: 'white',
                        color: '#667eea',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    🔄 Reload Page
                </button>
            </div>
        </div>
    );
}

export default TestApp;
