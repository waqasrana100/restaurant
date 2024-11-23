"use client";

import { motion } from "framer-motion";
import { Award, Clock, Shield } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Get your food delivered in 30 minutes or less"
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Multiple secure payment options available"
  },
  {
    icon: Award,
    title: "Best Quality",
    description: "Partner with top-rated restaurants and stores"
  }
];

export function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="mb-6 inline-block p-4 bg-primary-600 rounded-full text-white">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}