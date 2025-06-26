"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, User, ArrowLeft, Heart, Eye, EyeOff, Check, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PasswordStrength {
  score: number
  feedback: string[]
  isValid: boolean
}

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false,
  })
  const [defaultTab, setDefaultTab] = useState("signup")
  const [isReturningUser, setIsReturningUser] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has been here before
    const hasVisited = localStorage.getItem("hasVisited")
    const savedEmail = localStorage.getItem("userEmail")

    if (hasVisited && savedEmail) {
      setIsReturningUser(true)
      setDefaultTab("login")
      setEmail(savedEmail)
    }
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError("Email is required")
      return false
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const checkPasswordStrength = (password: string): PasswordStrength => {
    const feedback: string[] = []
    let score = 0

    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push("At least 8 characters")
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push("One uppercase letter")
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push("One lowercase letter")
    }

    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push("One number")
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
    } else {
      feedback.push("One special character")
    }

    return {
      score,
      feedback,
      isValid: score >= 4,
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordStrength(checkPasswordStrength(value))
  }

  const handleAuth = async (e: React.FormEvent, isSignup = false) => {
    e.preventDefault()

    if (!validateEmail(email)) return
    if (isSignup && !passwordStrength.isValid) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    // Store user info for future visits
    localStorage.setItem("hasVisited", "true")
    localStorage.setItem("userEmail", email)
    localStorage.setItem("displayName", displayName || "friend")

    router.push("/journal")
  }

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true)
    // Simulate social auth
    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem("hasVisited", "true")
      localStorage.setItem("displayName", "friend")
      router.push("/journal")
    }, 1000)
  }

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 1) return "bg-red-500"
    if (score <= 2) return "bg-orange-500"
    if (score <= 3) return "bg-yellow-500"
    if (score <= 4) return "bg-green-500"
    return "bg-green-600"
  }

  const getPasswordStrengthText = (score: number) => {
    if (score <= 1) return "Weak"
    if (score <= 2) return "Fair"
    if (score <= 3) return "Good"
    if (score <= 4) return "Strong"
    return "Very Strong"
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Moving Starfield */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="night-stars"></div>
        <div className="night-stars2"></div>
        <div className="night-stars3"></div>
        <div className="night-stars4"></div>
        <div className="night-stars5"></div>
        <div className="night-stars6"></div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-rose-400 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-6 w-6 text-rose-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent font-serif">
              Monolog
            </h1>
          </div>

          {isReturningUser ? (
            <p className="text-gray-400 text-sm">Welcome back! Ready to continue your journey?</p>
          ) : (
            <p className="text-gray-400 text-sm">Join thousands of writers on their journey of self-discovery</p>
          )}
        </div>

        {/* Auth Card */}
        <Card className="border border-white/10 shadow-xl bg-gray-900/40 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-gray-200">
              {isReturningUser ? "Welcome Back" : "Welcome"}
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              {isReturningUser
                ? "Sign in to continue your journaling journey"
                : "Create an account or sign in to start your journaling journey"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={defaultTab} onValueChange={setDefaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-700/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                  {isReturningUser ? "Sign In" : "Log In"}
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={(e) => handleAuth(e, false)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="login-email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          validateEmail(e.target.value)
                        }}
                        required
                        className={`pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500 ${
                          emailError ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="login-password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Link href="#" className="text-sm text-rose-400 hover:text-rose-300 transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-600 to-violet-600 hover:from-rose-700 hover:to-violet-700 text-white font-medium py-2.5"
                    disabled={isLoading || !!emailError}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={(e) => handleAuth(e, true)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        type="text"
                        required
                        className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-gray-300">
                      Display Name <span className="text-gray-500">(What should we call you?)</span>
                    </Label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="displayName"
                        placeholder="How would you like to be addressed?"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          validateEmail(e.target.value)
                        }}
                        required
                        className={`pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500 ${
                          emailError ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        placeholder="Create a strong password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        required
                        className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-rose-500 focus:ring-rose-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {password && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                              style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">
                            {getPasswordStrengthText(passwordStrength.score)}
                          </span>
                        </div>

                        {passwordStrength.feedback.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400">Password must include:</p>
                            {passwordStrength.feedback.map((item, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <X className="h-3 w-3 text-red-400" />
                                <span className="text-gray-400">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {passwordStrength.isValid && (
                          <div className="flex items-center space-x-2 text-xs">
                            <Check className="h-3 w-3 text-green-400" />
                            <span className="text-green-400">Password meets all requirements</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-600 to-violet-600 hover:from-rose-700 hover:to-violet-700 text-white font-medium py-2.5"
                    disabled={isLoading || !passwordStrength.isValid || !!emailError}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth("google")}
                  className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth("github")}
                  className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our{" "}
          <Link href="#" className="text-rose-400 hover:text-rose-300 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-rose-400 hover:text-rose-300 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
