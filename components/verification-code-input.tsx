import React, { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"

interface VerificationCodeInputProps {
    value: string
    onChange: (value: string) => void
}

export function VerificationCodeInput({ value, onChange }: VerificationCodeInputProps) {
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const inputs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        onChange(code.join(''))
    }, [code, onChange])

    useEffect(() => {
        if (value) {
            setCode(value.split('').concat(Array(6 - value.length).fill('')))
        }
    }, [value])

    const handleChange = (index: number, value: string) => {
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        if (value && index < 5) {
            inputs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }

    return (
        <div className="flex justify-between">
            {code.map((digit, index) => (
                <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputs.current[index] = el)}
                    className="w-12 h-12 text-center text-2xl"
                />
            ))}
        </div>
    )
}

