"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { Building2, ShoppingBag, Store, User, LogOut } from 'lucide-react'
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation"
import { AuthModal } from "./auth-modal"
import { LogoutModal } from "./logout-modal"
import { useAuthStore } from "@/store/auth"
import { logoutUser } from "@/services/api"
import { toast } from "sonner"

export default function Navbar() {
  const t = useTranslations('index')
  const router = useRouter()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const { isAuthenticated, setAuthenticated } = useAuthStore()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!isLogoutModalOpen && isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        document.body.classList.add('fade-to-color')
        setTimeout(() => {
          document.body.classList.remove('fade-to-color')
        }, 500)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isLogoutModalOpen, isTransitioning])

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  const confirmLogout = () => {
    logoutUser()
    setAuthenticated(false)
    setIsLogoutModalOpen(false)
    setIsTransitioning(true)
    toast.success(t('nav.logoutSuccess'))
    router.push("/")
  }

  return (
    <>
      <header className="border-b bg-white">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute -inset-1 bg-gradient from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />

              <Image
                src="/logo.png"
                alt={t('nav.logoAlt')}
                width={50}
                height={50}
                objectFit="contain"
                className="relative rounded-lg shadow-xl border border-primary/10 transition-all duration-200 group-hover:shadow-primary/50"
                style={{ objectFit: 'contain' }}
              />

            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {t('nav.corporateOrdering')}
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              {t('nav.becomeACourier')}
            </Button>
            <Button variant="ghost" className="flex items-center gap-2"
              onClick={() => router.push("/partner-with-us")}
            >
              <Store className="h-5 w-5" />
              {t('nav.partnerWithUs')}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                {t('nav.logout')}
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="h-5 w-5" />
                {t('nav.login')}
              </Button>
            )}
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={confirmLogout}
      />
    </>
  )
}

