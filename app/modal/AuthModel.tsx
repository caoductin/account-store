"use client"

import { useState } from "react"
import { getSupabaseBrowserClient } from "../lib/superbase/browser_client"

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const supabase = getSupabaseBrowserClient()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      await supabase.auth.signInWithPassword({ email, password })
    } else {
      await supabase.auth.signUp({ email, password })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-3">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-blue-500 text-white p-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm mt-3">
          <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer">
            Switch to {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        <button onClick={onClose} className="mt-4 text-gray-500 text-sm">
          Close
        </button>
      </div>
    </div>
  )
}