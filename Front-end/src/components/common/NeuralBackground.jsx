import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const NeuralBackground = () => {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const [useWebGL, setUseWebGL] = useState(true);
    const mountedRef = useRef(false);

    useEffect(() => {
        // Prevent multiple mounts
        if (mountedRef.current) return;

        if (!canvasRef.current) {
            console.warn('Canvas ref not available');
            return;
        }

        // Wait for next frame to ensure canvas is mounted
        const initTimeout = setTimeout(() => {
            if (!canvasRef.current) {
                console.warn('Canvas still not available after timeout');
                setUseWebGL(false);
                return;
            }

            // Check WebGL support
            try {
                const testCanvas = document.createElement('canvas');
                const gl = testCanvas.getContext('webgl2') ||
                    testCanvas.getContext('webgl') ||
                    testCanvas.getContext('experimental-webgl');

                if (!gl) {
                    console.warn('WebGL not supported, using CSS fallback');
                    setUseWebGL(false);
                    return;
                }

                // Test if WebGL context works
                const version = gl.getParameter(gl.VERSION);
                if (!version) {
                    console.warn('WebGL context invalid, using CSS fallback');
                    setUseWebGL(false);
                    return;
                }
            } catch (e) {
                console.warn('WebGL check failed, using CSS fallback:', e.message);
                setUseWebGL(false);
                return;
            }

            // Scene setup
            const scene = new THREE.Scene();
            sceneRef.current = scene;

            const camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 50;

            let renderer;
            try {
                // Check if canvas is still valid
                if (!canvasRef.current || !canvasRef.current.getContext) {
                    throw new Error('Canvas element is not ready');
                }

                renderer = new THREE.WebGLRenderer({
                    canvas: canvasRef.current,
                    alpha: true,
                    antialias: true,
                    failIfMajorPerformanceCaveat: false,
                    powerPreference: 'low-power',
                });

                renderer.setSize(window.innerWidth, window.innerHeight);
                // Create neural network nodes
                rendererRef.current = renderer;

                mountedRef.current = true;
                console.log('✅ Neural background initialized successfully');
            } catch (error) {
                console.warn('Failed to create WebGL renderer, using CSS fallback:', error.message);
                setUseWebGL(false);
                return;
            }

            // Create neural network nodes
            const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: 0x0080ff,
                transparent: true,
                opacity: 0.6,
            });

            const nodes = [];
            const nodeCount = 80;

            for (let i = 0; i < nodeCount; i++) {
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
                node.position.x = (Math.random() - 0.5) * 100;
                node.position.y = (Math.random() - 0.5) * 100;
                node.position.z = (Math.random() - 0.5) * 100;

                node.userData.velocity = {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02,
                };

                scene.add(node);
                nodes.push(node);
            }

            // Create connections between nodes
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x22d3ee,
                transparent: true,
                opacity: 0.15,
            });

            const connections = [];
            const maxDistance = 20;

            nodes.forEach((nodeA, i) => {
                nodes.slice(i + 1).forEach((nodeB) => {
                    const distance = nodeA.position.distanceTo(nodeB.position);
                    if (distance < maxDistance) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            nodeA.position,
                            nodeB.position,
                        ]);
                        const line = new THREE.Line(geometry, lineMaterial);
                        scene.add(line);
                        connections.push({ line, nodeA, nodeB, geometry });
                    }
                });
            });

            // Mouse interaction
            let mouseX = 0;
            let mouseY = 0;

            const handleMouseMove = (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            };

            window.addEventListener('mousemove', handleMouseMove);

            // Animation loop
            let animationFrameId;
            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);

                // Animate nodes
                nodes.forEach((node) => {
                    node.position.x += node.userData.velocity.x;
                    node.position.y += node.userData.velocity.y;
                    node.position.z += node.userData.velocity.z;

                    // Boundary check
                    if (Math.abs(node.position.x) > 50) node.userData.velocity.x *= -1;
                    if (Math.abs(node.position.y) > 50) node.userData.velocity.y *= -1;
                    if (Math.abs(node.position.z) > 50) node.userData.velocity.z *= -1;

                    // Pulse effect
                    node.material.opacity = 0.3 + Math.sin(Date.now() * 0.001 + node.position.x) * 0.3;
                });

                // Update connections
                connections.forEach(({ line, nodeA, nodeB, geometry }) => {
                    const distance = nodeA.position.distanceTo(nodeB.position);
                    if (distance < maxDistance) {
                        geometry.setFromPoints([nodeA.position, nodeB.position]);
                        line.material.opacity = Math.max(0, (maxDistance - distance) / maxDistance) * 0.2;
                    } else {
                        line.material.opacity = 0;
                    }
                });

                // Camera follow mouse
                camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
                camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
                camera.lookAt(scene.position);

                renderer.render(scene, camera);
            };

            animate();

            // Handle resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                // Cancel animation frame
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }

                // Clean up event listeners
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('resize', handleResize);

                // Clean up Three.js resources
                nodes.forEach(node => {
                    if (node.geometry) node.geometry.dispose();
                    if (node.material) node.material.dispose();
                });

                connections.forEach(({ line, geometry }) => {
                    if (geometry) geometry.dispose();
                    if (line.material) line.material.dispose();
                });

                if (renderer) {
                    try {
                        renderer.dispose();
                        renderer.forceContextLoss();
                    } catch (e) {
                        console.warn('Renderer cleanup error:', e);
                    }
                }

                if (scene) {
                    scene.clear();
                }

                mountedRef.current = false;
            };
            // CSS Fallback if WebGL fails
            if (!useWebGL) {
                return (
                    <div
                        className="fixed top-0 left-0 w-full h-full -z-10"
                        style={{
                            background: 'radial-gradient(ellipse at 20% 30%, rgba(0, 128, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)',
                            animation: 'pulse 8s ease-in-out infinite',
                        }}
                        aria-hidden="true"
                    >
                        {/* Animated CSS particles */}
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: Math.random() * 4 + 2 + 'px',
                                    height: Math.random() * 4 + 2 + 'px',
                                    background: i % 2 === 0 ? 'rgba(0, 128, 255, 0.3)' : 'rgba(34, 211, 238, 0.3)',
                                    left: Math.random() * 100 + '%',
                                    top: Math.random() * 100 + '%',
                                    animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                                    animationDelay: Math.random() * 5 + 's',
                                }}
                            />
                        ))}
                    </div>
                );
            }

        }, 100); // Small delay to ensure canvas is ready

        return () => {
            clearTimeout(initTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 opacity-40"
            style={{ pointerEvents: 'none' }}
            aria-hidden="true"
        />
    );
};

export default NeuralBackground;
