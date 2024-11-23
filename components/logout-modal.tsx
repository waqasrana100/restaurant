import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'

interface LogoutModalProps {
    isOpen: boolean
    onClose: () => void
    onLogout: () => void
}

export function LogoutModal({ isOpen, onClose, onLogout }: LogoutModalProps) {
    const t = useTranslations('index')

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.classList.add('grayscale-transition')
        } else {
            document.body.style.overflow = ''
            const cleanup = () => {
                document.documentElement.classList.remove('grayscale-transition')
            }
            setTimeout(cleanup, 500)
        }

        return () => {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('grayscale-transition')
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="min-h-full flex items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                                transition={{
                                    duration: 0.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="bg-background w-full max-w-md rounded-lg p-6 shadow-xl relative z-50"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <LogOut className="w-12 h-12 mx-auto text-primary mb-4" />
                                    </motion.div>

                                    <motion.h2
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl font-semibold mb-2"
                                    >
                                        {t('nav.logoutConfirmation')}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-muted-foreground mb-6"
                                    >
                                        {t('nav.logoutMessage')}
                                    </motion.p>

                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex justify-center gap-3"
                                    >
                                        <Button
                                            variant="outline"
                                            onClick={onClose}
                                            className="min-w-[100px]"
                                        >
                                            {t('common.cancel')}
                                        </Button>
                                        <Button
                                            onClick={onLogout}
                                            className="min-w-[100px]"
                                        >
                                            {t('nav.logout')}
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}