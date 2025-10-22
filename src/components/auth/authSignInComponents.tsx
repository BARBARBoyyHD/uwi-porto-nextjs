import { login } from '@/app/(auth)/admin-login/actions'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form className="flex flex-col bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[320px] border border-white/20">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Admin Login
        </h1>

        <label htmlFor="email" className="text-sm text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mb-4 px-3 py-2 rounded-lg bg-white/20 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="text-sm text-gray-300 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mb-6 px-3 py-2 rounded-lg bg-white/20 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
        />

        <button
          className="py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-medium"
          formAction={login}
        >
          Log in
        </button>
      </form>
    </div>
  )
}
