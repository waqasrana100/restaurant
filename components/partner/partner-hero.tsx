"use client";

import { motion } from "framer-motion";


export function PartnerHero() {

    return (
        <section className="relative h-[400px] bg-gradient-to-r from-primary/90 to-primary">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2074&auto=format&fit=crop"
                    alt="Restaurant Partner"
                    className="w-full h-full object-cover mix-blend-overlay"
                />
            </div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    Partner with us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl md:text-2xl max-w-2xl"
                >
                    Reach millions of customers and grow your business with our platform
                </motion.p>
            </div>
        </section>
    );
}