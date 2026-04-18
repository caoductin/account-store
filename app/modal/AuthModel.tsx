"use client"

import { useState } from "react"
import { getSupabaseBrowserClient } from "../lib/superbase/browser_client"

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const supabase = getSupabaseBrowserClient()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setError(error.message)
        } else {
          setMessage("Welcome back 👋")
          setTimeout(() => onClose(), 1200)
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          setError(error.message)
        } else {
          setMessage("Check your email to continue 📩")
        }
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-7 rounded-2xl w-96 shadow-2xl animate-fadeIn">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-1">
          {isLogin ? "Welcome back" : "Create account"}
        </h2>

        <p className="text-sm text-slate-500 mb-5">
          {isLogin
            ? "Login to continue your experience"
            : "Join us in a few seconds"}
        </p>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        {/* Feedback */}
        <div className="min-h-[20px] mt-3">
          {message && (
            <p className="text-green-600 text-sm animate-fadeIn">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm animate-fadeIn">
              {error}
            </p>
          )}
        </div>

        {/* Switch */}
        <p className="text-sm mt-4 text-center text-slate-500">
          {isLogin ? "No account?" : "Already have one?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer ml-1 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-400 hover:text-slate-600 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  )
}