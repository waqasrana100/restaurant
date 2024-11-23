'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const t = useTranslations('index');
  const router = useRouter();

  return (
    <section className="relative bg-white py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:w-1/2 mb-10 lg:mb-0"
        >
          <h1 className="text-5xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-xl text-gray-600 mb-8">{t('hero.subtitle')}</p>
          <div className="flex gap-2">
            <Input
              placeholder={t('hero.searchPlaceholder')}
              className="w-full max-w-md"
            />
            <Button onClick={() => {
              router.push('/restaurants')
            }}>
              <Search className="mr-2 h-4 w-4" />
              {t('hero.searchButton')}
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
            alt="Delicious Food"
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  )
}