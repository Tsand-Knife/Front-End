import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

const StatCard = ({ title, value, isLoading }) => (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-gray-200">
        <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
        <p className="text-5xl font-bold text-indigo-600 mt-3">{isLoading ? '...' : value}</p>
    </div>
);

// This component now only receives the userData it needs.
export default function StudentDashboardPage({ userData }) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [stats, setStats] = useState({
        totalQuizzes: 0,
        averageScore: 0,
        learningProgress: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();

        const fetchLeaderboard = async () => {
            const usersCollectionRef = collection(db, "users");
            // Asumsi field 'score' di dokumen users adalah rata-rata skor atau skor yang digunakan untuk peringkat
            const q = query(usersCollectionRef, where("role", "==", "student"), orderBy("score", "desc"), limit(10)); 
            try {
                const querySnapshot = await getDocs(q);
                // Pastikan 'score' ada di setiap user jika tidak, default ke 0
                const leaderboardData = querySnapshot.docs.map(doc => ({ 
                    id: doc.id, 
                    ...doc.data(),
                    score: doc.data().score || 0 // Pastikan score selalu ada
                }));
                setLeaderboard(leaderboardData);
            } catch (err) {
                console.error("Error fetching leaderboard:", err);
            }
        };

        const fetchUserStats = async () => {
            if (!userData) { // Cek apakah userData ada
                // console.log("userData not available, skipping fetchUserStats"); // Debugging
                return;
            }

            const totalQuizzes = userData.totalQuizzesCompleted || 0;
            const learningProgress = userData.learningProgress || 0; // Mengambil learningProgress dari Firestore

            const averageScore = userData.score || 0;

            setStats({
                totalQuizzes: totalQuizzes,
                // averageScore: averageScore, // Jika Anda akan menyimpan averageScore di Firestore, gunakan yang ini
                averageScore: averageScore, // Prefer averageScore dari Firestore jika sudah ada
                                                                  // Jika belum ada di Firestore, hitung dari TotalScoreSum
                learningProgress: learningProgress // Ambil langsung dari Firestore
            });
        };

        const fetchAllData = async () => {
            setIsLoading(true);
            // Promise.all untuk fetchLeaderboard dan memastikan fetchUserStats dari props setelah userData tersedia
            // fetchUserStats sekarang tidak async karena dia tidak lagi query Firestore
            await Promise.all([fetchLeaderboard()]); 
            fetchUserStats(); // Panggil ini setelah fetchLeaderboard
            setIsLoading(false);
        };

        fetchAllData();

    }, [userData]);

    return (
        // Use a React Fragment as the main layout is handled by App.jsx
        <>
            {/* Hero Section */}
            <section className="relative bg-purple-600 px-4 min-h-screen flex items-center justify-center"
                    style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')",
                            backgroundBlendMode: 'multiply',
                            backgroundColor: 'rgba(102, 126, 234, 0.7)',
                            backgroundSize: 'cover',
                        backgroundPosition: 'center 40%',
                     }}>
                <div className="container mx-auto text-center text-white mt-[80px]">
                <div className="bg-black/20 backdrop-blur-sm p-12 rounded-3xl inline-block shadow-2xl max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">Selamat Datang di ThinkEd</h1>
                <p className="text-xl mt-6 drop-shadow-md">
                    Platform pembelajaran modern untuk siswa cerdas masa kini.
                </p>
                <button className="mt-10 px-10 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
                Mulai Belajar
                </button>
            </div>
        </div>
                </section>

                {/* Dashboard Siswa Section - Negative margin pulls this section up over the hero */}
                <section className="pt-24 pb-32 px-4 -mt-20">
                     <div className="container mx-auto">
                        <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Dashboard Siswa</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                <StatCard title="Total Kuis" value={stats.totalQuizzes} isLoading={isLoading} />
                                <StatCard title="Rata-rata Nilai" value={stats.averageScore} isLoading={isLoading} />
                                <StatCard title="Progres Belajar" value={`${stats.learningProgress}%`} isLoading={isLoading} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leaderboard Section */}
                <section className="pt-12 pb-24 px-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-slate-800 mb-12">Leaderboard</h2>
                        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="py-5 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b">Peringkat</th>
                                        <th className="py-5 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b">Nama</th>
                                        <th className="py-5 px-6 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b text-right">Skor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr><td colSpan="3" className="p-6 text-center text-gray-500">Loading leaderboard...</td></tr>
                                    ) : leaderboard.length > 0 ? (
                                        leaderboard.map((player, index) => (
                                            <tr key={index} className="hover:bg-gray-50/50">
                                                <td className="py-4 px-6 border-b border-gray-200 text-center font-bold text-lg">{index + 1}</td>
                                                <td className="py-4 px-6 border-b border-gray-200 font-medium">{player.fullName}</td>
                                                <td className="py-4 px-6 border-b border-gray-200 text-right font-bold text-lg text-indigo-600">{player.score}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="py-6 px-6 border-b border-gray-200 text-center text-gray-500" colSpan="3">Belum ada data.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
        </>
    );
}
