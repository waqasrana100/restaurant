"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Truck } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Tell us where you are",
    description: "We'll show you stores and restaurants nearby you can order from."
  },
  {
    icon: Search,
    title: "Find what you want",
    description: "Search for items or dishes, businesses or cuisines."
  },
  {
    icon: Truck,
    title: "Order for delivery or collection",
    description: "We'll update you on your order's progress."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          How to order
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-6 inline-block p-4 bg-primary-600 rounded-full text-white">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}