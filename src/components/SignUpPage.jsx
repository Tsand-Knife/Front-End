import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
                Mendaftar...
            </span>
        ) : text}
    </button>
);

const PasswordStrengthIndicator = ({ password }) => {
    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (pass.match(/[a-z]/)) strength++;
        if (pass.match(/[A-Z]/)) strength++;
        if (pass.match(/[0-9]/)) strength++;
        if (pass.match(/[^a-zA-Z0-9]/)) strength++;
        return strength;
    };

    const strength = checkPasswordStrength(password);
    const strengthLevels = {
        0: { text: '', class: '' },
        1: { text: 'Lemah', class: 'w-1/4 bg-red-500' },
        2: { text: 'Lemah', class: 'w-1/4 bg-red-500' },
        3: { text: 'Cukup', class: 'w-1/2 bg-yellow-500' },
        4: { text: 'Baik', class: 'w-3/4 bg-green-500' },
        5: { text: 'Kuat', class: 'w-full bg-green-700' },
    };

    return (
        <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Kekuatan Password:</span>
                <span id="strength-text">{strengthLevels[strength].text}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
                <div className={`h-1 rounded-full transition-all duration-300 ${strengthLevels[strength].class}`}></div>
            </div>
        </div>
    );
};


// --- Icon SVGs ---
const UserIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
const EmailIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>;
const LockIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>;


// --- Main SignUpPage Component ---
export default function SignUpPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Password tidak cocok.");
        return;
    }
    setIsLoading(true);
    setError('');
    
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        username: username,
        email: user.email,
        role: 'student', // Always register as a student
        score: 0,
        TotalScoreSum:0,
        learningProgress:0,
        totalQuizzesCompleted:0,
      });
      // The onAuthStateChanged listener in App.jsx will handle navigation
    } catch (err) {
      setError("Gagal membuat akun. Email mungkin sudah digunakan.");
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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bergabung dengan ThinkEd</h2>
        <p className="text-gray-600">Mulai perjalanan belajar Anda bersama kami</p>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSignUp} className="space-y-4">
        <FormInput id="fullName" type="text" placeholder="Nama Lengkap" value={fullName} onChange={(e) => setFullName(e.target.value)} icon={<UserIcon />} />
        <FormInput id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<EmailIcon />} />
        <FormInput id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} icon={<UserIcon />} />
        
        <div>
            <FormInput id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<LockIcon />} />
            <PasswordStrengthIndicator password={password} />
        </div>

        <FormInput id="confirmPassword" type="password" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={<LockIcon />} />

        <div className="flex items-start space-x-3">
            <input type="checkbox" id="terms" className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" required />
            <label htmlFor="terms" className="text-sm text-gray-600">
            Saya setuju dengan <a href="#" className="text-indigo-600 underline hover:text-indigo-800">Syarat dan Ketentuan</a> serta <a href="#" className="text-indigo-600 underline hover:text-indigo-800">Kebijakan Privasi</a>
            </label>
        </div>

        <FormButton isLoading={isLoading} text="Daftar Sekarang" />
      </form>

      <div className="text-center mt-6 pt-6 border-t border-gray-200">
        <p className="text-gray-600">Sudah punya akun? 
            <button onClick={() => setPage('login')} className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors ml-1">
            Masuk di sini
            </button>
        </p>
      </div>
    </div>
  );
}
