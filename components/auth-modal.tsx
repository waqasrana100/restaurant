"use client"

import { useState } from "react"
import { toast } from "sonner" // Import toast
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { loginUser, registerUser, verifyEmail } from "@/services/api"
import { VerificationCodeInput } from "./verification-code-input"
import { useAuthStore } from "@/store/auth"


interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "verify">("login")
  const [isLoading, setIsLoading] = useState(false)

  // State for input fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newsletter, setNewsletter] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const { setAuthenticated } = useAuthStore();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        newsletter,
        role: "customer"
      }
      if (mode === "login") {
        const response = await loginUser(formData)
        toast.success("Login successful!") // Toast for successful login
        console.log("Login response:", response)
        setAuthenticated(true)
        onClose()
      } else if (mode === "register") {
        await registerUser(formData)
        toast.success("Registration successful! Please verify your email.") // Toast for registration success
        setMode("verify")
      } else if (mode === "verify") {
        await verifyEmail(email, verificationCode)
        toast.success("Email verified successfully!") // Toast for successful verification
        onClose()
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.") // Toast for errors
      console.error("Error submitting form:", error)
    }
    setIsLoading(false)
  }

  const handleModeChange = (newMode: "login" | "register" | "verify") => {
    setMode(newMode)
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setNewsletter(false)
    setVerificationCode("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            {(mode === "register" || mode === "verify") && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => handleModeChange(mode === "verify" ? "register" : "login")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>
              {mode === "login" ? "Welcome back" : mode === "register" ? "Create account" : "Verify your email"}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          {mode !== "verify" && (
            <>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => console.log("Google login")}
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => console.log("Facebook login")}
                >
                  <Image
                    src="/facebook.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Continue with Facebook
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
            </>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <Input
                  type="text"
                  placeholder="First name"
                  className="input-field"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  className="input-field"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </>
            )}
            {mode !== "verify" && (
              <>
                <Input
                  type="email"
                  placeholder="Email address"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </>
            )}
            {mode === "register" && (
              <>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={newsletter}
                    onCheckedChange={(value) => setNewsletter(value as boolean)}
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Yes, I want to receive discounts, loyalty offers, and other updates.
                  </label>
                </div>
              </>
            )}
            {mode === "verify" && (
              <VerificationCodeInput
                value={verificationCode}
                onChange={setVerificationCode}
              />
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin">⏳</div>
              ) : mode === "login" ? (
                "Log in"
              ) : mode === "register" ? (
                "Create account"
              ) : (
                "Verify email"
              )}
            </Button>
          </form>
          {mode === "login" ? (
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => handleModeChange("register")}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : mode === "register" ? (
            <p className="text-center text-sm">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          ) : (
            <p className="text-center text-sm">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={() => {
                  toast("Verification code resent!") // Toast for resending code
                  console.log("Resend verification code")
                }}
                className="text-primary hover:underline"
              >
                Resend
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
