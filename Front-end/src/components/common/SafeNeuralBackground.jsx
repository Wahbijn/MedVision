import React, { Component } from 'react';
import NeuralBackground from './NeuralBackground';

class SafeNeuralBackground extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // If NeuralBackground fails, just don't render it
        console.warn('Neural background disabled due to error:', error.message);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Neural background error details:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Return null to render nothing if there's an error
            return null;
        }

        return <NeuralBackground />;
    }
}

export default SafeNeuralBackground;
