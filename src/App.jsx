import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Import the component files
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import AdminDashboardPage from './components/DashboardPage.jsx'; 
import TablesPage from './components/TablesPage.jsx';
import QuizEditPage from './components/QuizEditPage.jsx';
import QuizTopicsPage from './components/QuizTopicPage.jsx';
import QuizAiPage from './components/QuizAiPage.jsx';
import QuizMachineLearningPage from './components/QuizMachineLearningPage.jsx'; 
import ProfilePage from './components/ProfilePage.jsx';
import StudentDashboardPage from './components/StudentDashboard.jsx';
import MateriPage from './components/MateriPage.jsx';
import StudentNavbar from './components/StudentNavbar';
import PengenalanAiPage from './components/PengenalanAiPage.jsx';
import MachineLearningPage from './components/MachineLearningPage.jsx';
import NaturalLanguageProcessing from './components/NLPPage.jsx';
import QuizNlpPage from './components/QuizNlppage.jsx';

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyDRrjPh-ZDZueS50RWj4OCL_W7hGq0Dmb8",
    authDomain: "thinked-9004f.firebaseapp.com",
    projectId: "thinked-9004f",
    storageBucket: "thinked-9004f.firebasestorage.app",
    messagingSenderId: "10637562537",
    appId: "1:10637562537:web:b12f68891efee30e984fb8",
    measurementId: "G-QMGMY05251"
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Student Navigation & Layout ---


const StudentLayout = ({ children, setPage, activePage, userData, handleLogout }) => (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
        <StudentNavbar setPage={setPage} activePage={activePage} userData={userData} handleLogout={handleLogout} />
        <main className="flex-grow pt-20">
            {children}
        </main>
        <footer className="text-center p-8 bg-gray-800 text-white">
            <p>© 2025 ThinkEd. Semua hak dilindungi.</p>
        </footer>
    </div>
);


// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('loading');
  const [adminPage, setAdminPage] = useState('dashboard'); 
  const [studentPage, setStudentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({ ...data, uid: currentUser.uid });
        }
        setPage('dashboard');
      } else {
        setUser(null);
        setUserData(null);
        setPage('login');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
        setStudentPage('dashboard');
        setAdminPage('dashboard');
    });
  };
  
  const renderAdminContent = () => {
    switch(adminPage) {
        case 'tables':
            return <TablesPage />;
        case 'quiz-edit':
            return <QuizEditPage />;
        case 'profile':
            return <ProfilePage user={user} userData={userData} />;
        case 'dashboard':
        default:
            return <AdminDashboardPage />;
    }
  }

  const renderStudentContent = () => {
    let content;
    switch(studentPage) {
      case 'materi':
        content = <MateriPage setStudentPage={setStudentPage} />;
        break;
      case 'pengenalan-ai':
        content = <PengenalanAiPage />;
        break;
      case 'quiz':
        content = <QuizTopicsPage setStudentPage={setStudentPage} />;
        break;
      case 'quiz-ai-intro':
        content = <QuizAiPage setStudentPage={setStudentPage} db={db} />;
        break;
      case 'quiz-machine-learning':
        content = <QuizMachineLearningPage setStudentPage={setStudentPage} db={db} />;
        break;
      case 'quiz-nlp': // ✅ THIS is what you were missing
        content = <QuizNlpPage />;
        break;
      case 'machine-learning':
        content = <MachineLearningPage />;
        break;
      case 'nlp':
        content = <NaturalLanguageProcessing />;
        break;
      case 'dashboard':
      default:
        content = <StudentDashboardPage userData={userData} />;
        break;
    }
  
    return (
      <StudentLayout 
        setPage={setStudentPage} 
        activePage={studentPage} 
        userData={userData} 
        handleLogout={handleLogout}
      >
        {content}
      </StudentLayout>
    );
  };

  const renderPage = () => {
    if (isLoading) {
        return <AuthLayout><div className="text-white text-xl">Loading...</div></AuthLayout>;
    }

    if (page === 'dashboard' && userData?.role === 'admin') {
        return (
            <AdminLayout setPage={setAdminPage} activePage={adminPage} handleLogout={handleLogout}>
                {renderAdminContent()}
            </AdminLayout>
        );
    }
    
    if (page === 'dashboard' && userData?.role === 'student') {
        return renderStudentContent();
    }

    switch (page) {
      case 'signup':
        return <AuthLayout><SignUpPage setPage={setPage} /></AuthLayout>;
      case 'login':
      default:
        return <AuthLayout><LoginPage setPage={setPage} /></AuthLayout>;
    }
  };
  
  return renderPage();
}

// --- Layout Components ---
const AuthLayout = ({children}) => (
  <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 min-h-screen flex items-center justify-center p-4">
      {children}
  </div>
);

const AdminLayout = ({ children, setPage, activePage, handleLogout }) => (
  <div className="w-full min-h-screen font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
      <div className="absolute w-full bg-blue-500 min-h-75"></div>
      <Sidebar setPage={setPage} activePage={activePage} />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
          <Navbar handleLogout={handleLogout} pageTitle={activePage} />
          {children}
      </main>
  </div>
);


// --- Shared Admin Components ---
const Sidebar = ({ setPage, activePage }) => (
  <aside className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0">
      <div className="h-19">
          <a className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="#">
              <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">ThinkEd Dashboard Admin</span>
          </a>
      </div>
      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
          <ul className="flex flex-col pl-0 mb-0">
              <li className="mt-0.5 w-full">
                  <a onClick={() => setPage('dashboard')} className={`cursor-pointer py-2.7 text-sm my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${activePage === 'dashboard' ? 'bg-blue-500/13 rounded-lg font-semibold text-slate-700' : 'text-slate-500'}`}>
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 text-blue-500">📊</div>
                      <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
                  </a>
              </li>
              <li className="mt-0.5 w-full">
                  <a onClick={() => setPage('tables')} className={`cursor-pointer py-2.7 text-sm my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${activePage === 'tables' ? 'bg-blue-500/13 rounded-lg font-semibold text-slate-700' : 'text-slate-500'}`}>
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 text-orange-500">📋</div>
                      <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Tables</span>
                  </a>
              </li>
               <li className="mt-0.5 w-full">
                  <a onClick={() => setPage('quiz-edit')} className={`cursor-pointer py-2.7 text-sm my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${activePage === 'quiz-edit' ? 'bg-blue-500/13 rounded-lg font-semibold text-slate-700' : 'text-slate-500'}`}>
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 text-cyan-500">✏️</div>
                      <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Quiz Edit</span>
                  </a>
              </li>
               <li className="w-full mt-4"><h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">Account pages</h6></li>
               <li className="mt-0.5 w-full">
                  <a onClick={() => setPage('profile')} className={`cursor-pointer py-2.7 text-sm my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${activePage === 'profile' ? 'bg-blue-500/13 rounded-lg font-semibold text-slate-700' : 'text-slate-500'}`}>
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5 text-slate-700">👤</div>
                      <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Profile</span>
                  </a>
              </li>
          </ul>
      </div>
  </aside>
);

const Navbar = ({ handleLogout, pageTitle }) => (
  <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl">
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
              <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                  <li className="text-sm leading-normal"><a className="text-white opacity-50" href="#">Pages</a></li>
                  <li className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']" aria-current="page">{pageTitle}</li>
              </ol>
              <h6 className="mb-0 font-bold text-white capitalize">{pageTitle}</h6>
          </nav>
          <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
             <div className="flex items-center md:ml-auto md:pr-4"></div>
             <button onClick={handleLogout} className="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand">
                <span className="hidden sm:inline">Sign Out</span>
             </button>
          </div>
      </div>
  </nav>
);