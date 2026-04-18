"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getSupabaseBrowserClient } from "../lib/superbase/browser_client"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState<any>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const supabase = getSupabaseBrowserClient()

  // ✅ Check user khi load
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      console.log("USER:", data.user)
    }

    getUser()
  }, [])

  // ✅ Handle login / signup
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        // 🔐 LOGIN
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          alert(error.message)
        } else {
          alert("Login success!")
          setUser(data.user)
        }

      } else {
        // 🆕 SIGN UP
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          alert(error.message)
        } else {
          alert("Sign up success! Check your email 📩")
        }
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg"
          >
            {loading
              ? "Loading..."
              : isLogin
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        {/* Switch mode */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={async () => {
            await supabase.auth.signInWithOAuth({
              provider: "google",
            })
          }}
          className="w-full border p-3 rounded-lg flex items-center justify-center gap-3"
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          <span>Continue with Google</span>
        </button>

        {/* Show user */}
        {user && (
          <p className="mt-4 text-green-600 text-center">
            Logged in as: {user.email}
          </p>
        )}

      </div>
    </div>
  )
}