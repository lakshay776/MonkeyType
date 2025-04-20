import React from 'react';

function Auth() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 font-sans">
      <div className="bg-zinc-800 w-full max-w-md p-8 rounded-2xl shadow-xl border border-lime-500/20">
        <h2 className="text-3xl font-bold text-lime-400 text-center mb-6">🔐 Login to TypeX</h2>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              📧 Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              🔒 Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 text-zinc-900 font-semibold py-2 rounded-xl hover:bg-lime-300 transition active:scale-95"
          >
            🚀 Login
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account? <span className="text-lime-400 hover:underline cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
