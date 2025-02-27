'use client';

import React, { useEffect, useRef, useCallback } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface BackgroundEffectProps {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export const BackgroundEffect = ({ children, className, containerClassName }: BackgroundEffectProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const particlePropsRef = useRef<Float32Array | null>(null);
    const tickRef = useRef<number>(0);
    const centerRef = useRef<[number, number]>([0, 0]);

    // Constants
    const PARTICLE_COUNT = 900;
    const PARTICLE_PROP_COUNT = 10;
    const BASE_TTL = 50;
    const RANGE_TTL = 200;
    const BASE_SPEED = 0.0;
    const RANGE_SPEED = 1.5;
    const BASE_RADIUS = 3;
    const RANGE_RADIUS = 3;
    const BASE_HUE = 220;
    const RANGE_HUE = 200;
    const NOISE_STEPS = 3;
    const X_OFF = 0.00199;
    const Y_OFF = 0.00125;
    const Z_OFF = 0.0005;

    const noise3D = createNoise3D();

    const lerp = useCallback((n1: number, n2: number, speed: number): number => {
        return (1 - speed) * n1 + speed * n2;
    }, []);

    const checkBounds = useCallback((x: number, y: number): boolean => {
        const canvas = canvasRef.current;
        return canvas ? (x > canvas.width || x < 0 || y > canvas.height || y < 0) : false;
    }, []);

    const initParticle = useCallback((i: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !particlePropsRef.current) return;

        const x = Math.random() * canvas.width;
        const y = centerRef.current[1] + (Math.random() * 200 - 100);
        const vx = 0;
        const vy = 5;
        const life = 0;
        const ttl = BASE_TTL + Math.random() * RANGE_TTL;
        const speed = BASE_SPEED + Math.random() * RANGE_SPEED;
        const radius = BASE_RADIUS + Math.random() * RANGE_RADIUS;
        const hue = BASE_HUE + Math.random() * RANGE_HUE;

        particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    }, []);

    const drawParticle = useCallback((
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        x2: number,
        y2: number,
        life: number,
        ttl: number,
        radius: number,
        hue: number
    ) => {
        const fadeInOut = (t: number, m: number) => {
            const hm = 0.5 * m;
            return Math.abs(((t + hm) % m) - hm) / hm;
        };

        ctx.save();
        ctx.lineCap = "round";
        ctx.lineWidth = radius;
        ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }, []);

    const updateParticle = useCallback((i: number, ctx: CanvasRenderingContext2D) => {
        const canvas = canvasRef.current;
        if (!canvas || !particlePropsRef.current) return;

        const i2 = 1 + i;
        const i3 = 2 + i;
        const i4 = 3 + i;
        const i5 = 4 + i;
        const i6 = 5 + i;
        const i7 = 6 + i;
        const i8 = 7 + i;
        const i9 = 8 + i;

        const n = noise3D(
            particlePropsRef.current[i] * X_OFF,
            particlePropsRef.current[i2] * Y_OFF,
            tickRef.current * Z_OFF
        ) * NOISE_STEPS * Math.PI * 2;

        const vx = lerp(particlePropsRef.current[i3], Math.cos(n), 0.5);
        const vy = lerp(particlePropsRef.current[i4], Math.sin(n), 0.5);
        const life = particlePropsRef.current[i5];
        const ttl = particlePropsRef.current[i6];
        const speed = particlePropsRef.current[i7];
        const x2 = particlePropsRef.current[i] + vx * speed;
        const y2 = particlePropsRef.current[i2] + vy * speed;
        const radius = particlePropsRef.current[i8];
        const hue = particlePropsRef.current[i9];

        drawParticle(
            ctx,
            particlePropsRef.current[i],
            particlePropsRef.current[i2],
            x2,
            y2,
            life,
            ttl,
            radius,
            hue
        );

        particlePropsRef.current[i] = x2;
        particlePropsRef.current[i2] = y2;
        particlePropsRef.current[i3] = vx;
        particlePropsRef.current[i4] = vy;
        particlePropsRef.current[i5] = life + 1;

        if (checkBounds(x2, y2) || life > ttl) {
            initParticle(i);
        }
    }, [checkBounds, drawParticle, initParticle, lerp]);

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centerRef.current = [0.5 * canvas.width, 0.5 * canvas.height];
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !particlePropsRef.current) return;

        tickRef.current++;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlePropsRef.current.length; i += PARTICLE_PROP_COUNT) {
            updateParticle(i, ctx);
        }

        // Glow effect
        ctx.save();
        ctx.filter = "blur(8px) brightness(200%)";
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();

        requestRef.current = requestAnimationFrame(draw);
    }, [updateParticle]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        resize();
        particlePropsRef.current = new Float32Array(PARTICLE_COUNT * PARTICLE_PROP_COUNT);

        for (let i = 0; i < (particlePropsRef.current?.length || 0); i += PARTICLE_PROP_COUNT) {
            initParticle(i);
        }

        requestRef.current = requestAnimationFrame(draw);

        const handleResize = () => {
            resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [draw, initParticle, resize]);

    return (
        <div className={cn("relative h-full w-full", containerClassName)}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                ref={containerRef}
                className="absolute h-full w-full inset-0 z-0 bg-transparent"
            >
                <canvas ref={canvasRef} />
            </motion.div>
            <div className={cn("relative z-10", className)}>{children}</div>
        </div>
    );
};

export default BackgroundEffect;