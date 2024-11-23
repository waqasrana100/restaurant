"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AnimatedBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const circles = Array.from({ length: 20 }).map(() => {
            const circle = document.createElement("div");
            circle.className = "absolute rounded-full bg-primary/5";
            circle.style.width = `${Math.random() * 100 + 50}px`;
            circle.style.height = circle.style.width;
            circle.style.left = `${Math.random() * 100}%`;
            circle.style.top = `${Math.random() * 100}%`;
            return circle;
        });

        circles.forEach((circle) => {
            containerRef.current?.appendChild(circle);
            gsap.to(circle, {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: "random(3, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        return () => {
            circles.forEach((circle) => circle.remove());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
        />
    );
}