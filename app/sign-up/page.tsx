// "use client"

// import { useState } from "react"
// import { createSupabaseServerClient } from "../lib/superbase/server_client"

// import Image from "next/image"

// export default function AuthPage() {
//   const supabase = createSupabaseServerClient()
//   const { data: { user }, } = await supabase.auth.getUser()
//   const [isLogin, setIsLogin] = useState(true)

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isLogin ? "Login" : "Create Account"}
//         </h2>

//         {/* Form */}
//         <form className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {!isLogin && (
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         {/* Switch mode */}
//         <p className="text-center mt-4 text-sm">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <span
//             className="text-blue-500 cursor-pointer ml-1"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Sign up" : "Login"}
//           </span>
//         </p>

//         {/* Divider */}
//         <div className="my-6 flex items-center">
//           <div className="flex-1 h-px bg-gray-300"></div>
//           <span className="px-3 text-gray-400 text-sm">OR</span>
//           <div className="flex-1 h-px bg-gray-300"></div>
//         </div>

//         {/* Google Button */}
//         <button className="w-full border p-3 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-3">

//           {/* Google Logo */}
//           <Image
//             src="/google.svg"
//             alt="Google"
//             width={20}
//             height={20}
//           />

//           <span>Continue with Google</span>
//         </button>
//       </div>
//     </div>
//   )
// }