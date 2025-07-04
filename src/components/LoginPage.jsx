import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// --- Reusable Components (can be moved to their own files later) ---
const FormInput = ({ id, type, placeholder, value, onChange, icon }) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
    <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors pl-12" required />
  </div>
);

const FormButton = ({ isLoading, text }) => (
    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-semibold disabled:opacity-75 disabled:cursor-not-allowed">
        {isLoading ? (
            <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Masuk...
            </span>
        ) : text}
    </button>
);

// --- Icon SVGs ---
const UserIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
const LockIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>;

// --- Main LoginPage Component ---
export default function LoginPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged in App.jsx will handle navigation
    } catch (err) {
      setError("Gagal masuk. Silakan periksa kredensial Anda.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang di ThinkEd</h2>
        <p className="text-gray-600">Masuk akun ThinkEd Anda</p>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <FormInput id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<UserIcon />} />
        <FormInput id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockIcon />} />
        
        <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
            <label htmlFor="remember" className="text-sm text-gray-600">Ingat saya</label>
        </div>

        <FormButton isLoading={isLoading} text="Masuk" />
      </form>

      <div className="text-center mt-6 pt-6 border-t border-gray-200">
        <p className="text-gray-600">
          Belum punya akun?
          <button
            type="button"
            onClick={() => setPage('signup')}
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors ml-1 bg-transparent border-none p-0 cursor-pointer underline"
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
}
