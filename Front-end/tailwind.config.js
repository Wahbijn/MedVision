/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'medical-blue': {
                    50: '#e6f2ff',
                    100: '#cce5ff',
                    200: '#99ccff',
                    300: '#66b2ff',
                    400: '#3399ff',
                    500: '#0080ff',
                    600: '#0066cc',
                    700: '#004d99',
                    800: '#003366',
                    900: '#001a33',
                },
                'neural-cyan': {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                }
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'display': ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.3' },
                    '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '0.6' },
                },
                glow: {
                    'from': { boxShadow: '0 0 20px rgba(0, 128, 255, 0.3)' },
                    'to': { boxShadow: '0 0 40px rgba(0, 128, 255, 0.6)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
