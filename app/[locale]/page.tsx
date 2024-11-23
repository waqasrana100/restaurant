"use client";

import { Benefits } from '@/components/benefits';
import { FeaturedRestaurants } from '@/components/featured-restaurants';
import { HeroSection } from '@/components/hero-section';
import { HowItWorks } from '@/components/how-it-works';
import { AnimatePresence, motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';


export default function Home() {
  const t = useTranslations("index");
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }
  return (
    <div className="fade-in">
      <AnimatePresence>

        {showLanding && <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-background to-secondary">
          <motion.div
            className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-background to-secondary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 z-0">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                  </filter>
                </defs>
              </svg>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary/20"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Utensils className="w-16 h-16 text-primary mb-6" />
              </motion.div>
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold mb-6 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('landing.welcomeMessage')} <span className="text-primary">{t('landing.brandName')}</span>

              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Embark on a culinary journey where flavors dance and memories are made. Your gastronomic adventure awaits!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >

              </motion.div>
            </div>
          </motion.div>
        </div>}

      </AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        className="space-y-16 py-16"
      >
        <motion.div variants={fadeInUp}>
          <HeroSection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <FeaturedRestaurants />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <HowItWorks />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Benefits />
        </motion.div>
      </motion.div>
    </div>
  )
}