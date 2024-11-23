"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BarChart, Shield, Truck } from "lucide-react";

const benefits = [
    {
        icon: BarChart,
        title: "Increase your orders",
        description:
            "Reach millions of customers and grow your business with targeted marketing campaigns and detailed insights.",
    },
    {
        icon: Shield,
        title: "No risk",
        description:
            "No registration fee. We work on a commission basis - we only profit when you profit.",
    },
    {
        icon: Truck,
        title: "Flexible delivery options",
        description:
            "Choose your preferred delivery method - use our delivery network or your own delivery fleet.",
    },
];

export function PartnerBenefits() {
    // const { t } = useTranslations();

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-sm"
                        >
                            <div className="mb-4">
                                <benefit.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}