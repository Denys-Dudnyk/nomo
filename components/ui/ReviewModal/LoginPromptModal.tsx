

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import Link from 'next/link'


interface LoginPromptModalProps {
    isOpen: boolean
    onClose: () => void
}

export function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically handle the login logic
        console.log('Login attempted with:', email, password)
        router.push('/auth/login')
        onClose()
    }


    //   const handleLogin = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     // Here you would typically handle the login logic
    //     console.log('Login attempted with:', email, password)
    //     router.push('/auth/login')
    //     onClose()
    //   }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl sm:p-8 max-w-md w-full mx-4 relative"
            >
                <div className="space-y-6 max-w-xl sm:max-w-2xl w-full">
                    <div className="text-center">
                        <div className="inline-block p-3 rounded-full bg-gray-300 mb-4">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <div>
                            <Link
                                href="/auth/login"
                                className="inline-block transition-colors duration-300 hover:text-accent"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin(e as React.FormEvent)
                                }}
                            >
                                <h2 className="text-2xl font-bold text-accent">Sign In</h2>
                            </Link>
                        </div>



                    </div>
                </div>
            </motion.div>
        </div>
    )
}

