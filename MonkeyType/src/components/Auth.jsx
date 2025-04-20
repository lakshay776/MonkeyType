import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { ResultContext } from '../assets/context/ResultContext';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// ✅ Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCHOM_5KFBaxO4WNpAD9vxOVBE4UBmjfeg',
  authDomain: 'typex-609e6.firebaseapp.com',
  projectId: 'typex-609e6',
  storageBucket: 'typex-609e6.appspot.com',
  messagingSenderId: '760459247206',
  appId: '1:760459247206:web:48ad2e8b3e122ccfe377a7',
  measurementId: 'G-EXXM3QSQZ2',
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Auth() {
  const { setLoggedIn } = useContext(ResultContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!emailRegex.test(email)) {
      alert('❌ Invalid email format');
      setLoading(false);
      return;
    }

    if (isSignUp && !passwordRegex.test(password)) {
      alert('❌ Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      setLoggedIn(true);
      navigate('/TextArea');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome ${result.user.displayName}`);
      setLoggedIn(true);
      navigate('/TextArea');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 font-sans">
      <div className="bg-zinc-800 w-full max-w-md p-8 rounded-2xl shadow-xl border border-lime-500/20">
        <h2 className="text-3xl font-bold text-lime-400 text-center mb-6">
          {isSignUp ? '📝 Sign Up for TypeX' : '🔐 Login to TypeX'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              📧 Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              🔒 Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 text-zinc-900 font-semibold py-2 rounded-xl hover:bg-lime-300 transition active:scale-95"
            disabled={loading}
          >
            {loading ? 'Processing...' : isSignUp ? '🚀 Create Account' : '🚀 Login'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-xl hover:bg-red-400 transition active:scale-95"
          >
            🔐 Sign in with Google
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          {isSignUp ? 'Already have an account?' : "Don’t have an account?"}{' '}
          <span
            className="text-lime-400 hover:underline cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Login' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
