"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, BookOpen, Brain, Clock, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Moving Starfield */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="night-stars"></div>
        <div className="night-stars2"></div>
        <div className="night-stars3"></div>
        <div className="night-stars4"></div>
        <div className="night-stars5"></div>
        <div className="night-stars6"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-rose-400 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-rose-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent font-serif tracking-wide">
              Monolog
            </h1>
            <Heart className="h-8 w-8 text-rose-400 animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Your personal space for thoughts, reflections, and growth
          </p>
          <div className="pt-8">
            <Link href="/auth">
              <Button
                size="lg"
                className="floating-text text-lg px-8 py-6 bg-gradient-to-r from-rose-500/80 to-violet-500/80 hover:from-rose-600/90 hover:to-violet-600/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/10"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Writing
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-200 font-serif">A Safe Space for Your Heart</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-white/10 shadow-lg bg-gray-900/40 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:bg-gray-900/60">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-rose-500/80 to-pink-500/80 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-200">Clean Writing Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                No clutter. No noise. Just space to hear your own thoughts clearly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-white/10 shadow-lg bg-gray-900/40 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:bg-gray-900/60">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-violet-500/80 to-indigo-500/80 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-200">AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  Get writing prompts and summaries to help you explore your thoughts deeper and track your personal
                  growth journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-white/10 shadow-lg bg-gray-900/40 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:bg-gray-900/60">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-indigo-500/80 to-rose-500/80 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-200">Timeline & History</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">
                  Easily browse through your past entries with timestamps and search. Watch your heart's journey unfold
                  over time.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
