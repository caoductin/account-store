"use client"

import { useState } from "react"
import { getSupabaseBrowserClient } from "../lib/superbase/browser_client"

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const supabase = getSupabaseBrowserClient()

  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // ✅ Validate input
  const validate = () => {
    if (!email || !password) {
      return "Please fill all fields"
    }

    if (!email.includes("@")) {
      return "Invalid email format"
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters"
    }

    if (!isLogin && password !== confirmPassword) {
      return "Passwords do not match"
    }

    return null
  }

  // ✅ Handle login / signup
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    setError(null)
    setMessage(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setError(error.message)
        } else {
          setMessage("Welcome back 👋")
          onClose() // ✅ close immediately
        }

      } else {
        // 🆕 SIGN UP
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          setError(error.message)
        } else {
          setMessage("Check your email to confirm 📩")
        }
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white p-7 rounded-2xl w-96 shadow-2xl relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-400 hover:text-slate-600 text-lg"
        >
          ✕
        </button>

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

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirm password (only signup) */}
          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* live validation */}
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs">
                  Passwords do not match
                </p>
              )}
            </>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isLogin
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        {/* Feedback */}
        <div className="min-h-[20px] mt-3">
          {message && (
            <p className="text-green-600 text-sm">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Switch */}
        <p className="text-sm mt-4 text-center text-slate-500">
          {isLogin ? "No account?" : "Already have one?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
              setMessage(null)
            }}
            className="text-blue-600 cursor-pointer ml-1 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  )
}