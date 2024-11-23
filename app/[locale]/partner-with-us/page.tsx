"use client";

import { AnimatedBackground } from "@/components/partner/animated-background";
import { PartnerBenefits } from "@/components/partner/partner-benefits";
import { PartnerForm } from "@/components/partner/partner-form";
import { PartnerHero } from "@/components/partner/partner-hero";
import { motion } from "framer-motion";


export default function PartnerPage() {
    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />

            <PartnerHero />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-12"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Join the Future of Food Delivery</h2>
                        <p className="text-xl text-gray-600">
                            Transform your business with our cutting-edge delivery platform.
                            Reach more customers, increase sales, and grow your brand with our
                            comprehensive suite of tools and services.
                        </p>
                    </motion.div>
                </div>
                <PartnerForm />
                <PartnerBenefits />
            </motion.div>
        </div>
    );
}