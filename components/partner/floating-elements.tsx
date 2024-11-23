"use client";

import { motion } from "framer-motion";
import { Utensils, Coffee, Pizza, ShoppingBag } from "lucide-react";

const floatingIcons = [
    { Icon: Utensils, delay: 0 },
    { Icon: Coffee, delay: 0.2 },
    { Icon: Pizza, delay: 0.4 },
    { Icon: ShoppingBag, delay: 0.6 },
];

export function FloatingElements() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {floatingIcons.map(({ Icon, delay }, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        y: [-50, -100, -150, -200],
                        x: [Math.random() * 100, Math.random() * -100],
                    }}
                    transition={{
                        duration: 5,
                        delay,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                >
                    <Icon className="h-8 w-8 text-primary/30" />
                </motion.div>
            ))}
        </div>
    );
}