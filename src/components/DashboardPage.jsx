import React, { useState, useEffect } from 'react';
// Hapus import Timestamp karena tidak lagi digunakan untuk createdAt
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'; 

// --- Reusable StatCard Component ---
const StatCard = ({ title, value, change, icon, iconBg }) => (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">{title}</p>
                            <h5 className="mb-2 font-bold">{value}</h5>
                            <p className="mb-0">
                                <span className={`text-sm font-bold leading-normal ${change && change.includes('+') ? 'text-emerald-500' : 'text-slate-500'}`}>{change}</span>
                            </p>
                        </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                        <div className={`inline-flex items-center justify-center w-12 h-12 text-center rounded-full text-lg text-white ${iconBg}`}>
                            {icon === 'quiz' && '📝'} 
                            {icon === 'users' && '👥'} 
                            {icon === 'new-user' && '✨'} 
                            {icon === 'trophy' && '🏆'} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Main Dashboard Content Component ---
export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalQuizSolve: 0, 
        totalUserPlay: 0,
        newUserPlay: 0, // Akan diatur ke 0 atau N/A
        highestStrike: 0, 
    });
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const db = getFirestore();
            const usersCollectionRef = collection(db, "users");
            
            setIsLoading(true);

            try {
                // --- Fetch Stats ---
                const userSnapshot = await getDocs(usersCollectionRef);
                const studentUsers = userSnapshot.docs.filter(doc => doc.data().role === 'student');
                const totalStudentUsers = studentUsers.length;

                // Logika untuk New User Play dihapus karena tidak ada field 'createdAt'
                const newUsersCount = 0; // Mengatur New User Play ke 0 secara default

                let totalQuizSolveCount = 0;
                let highestOverallScore = 0; 
                
                studentUsers.forEach(doc => {
                    const data = doc.data();
                    const userTotalQuizzesCompleted = data.totalQuizzesCompleted || 0; 
                    const userScore = data.score || 0; 
                    
                    totalQuizSolveCount += userTotalQuizzesCompleted;
                    if (userScore > highestOverallScore) { 
                        highestOverallScore = data.totalQuizzesCompleted || 0;
                    }
                });

                setStats({
                    totalQuizSolve: totalQuizSolveCount, 
                    totalUserPlay: totalStudentUsers, 
                    newUserPlay: newUsersCount, // Akan selalu 0
                    highestStrike: highestOverallScore, 
                });
                
                // --- Fetch Leaderboard ---
                const leaderboardQuery = query(
                    usersCollectionRef, 
                    where("role", "==", "student"), 
                    orderBy("score", "desc"), 
                    limit(10)
                );
                const leaderboardSnapshot = await getDocs(leaderboardQuery);
                const leaderboardData = leaderboardSnapshot.docs.map(doc => ({
                    id: doc.id, 
                    ...doc.data(),
                    score: doc.data().score || 0 
                }));
                setLeaderboard(leaderboardData);

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setIsLoading(false); 
                console.log("Dashboard fetching process finished. isLoading set to false.");
            }
        };

        fetchDashboardData();
    }, []); 

    return (
        <div className="w-full px-6 py-6 mx-auto">
    {/* Stat Cards Section */}
    {/* Tambahkan justify-center di sini */}
    <div className="flex flex-wrap justify-center -mx-3"> 
        <StatCard title="Total Quiz Solve" value={isLoading ? '...' : stats.totalQuizSolve} change="" icon="quiz" iconBg="bg-gradient-to-tl from-blue-500 to-violet-500" />
        <StatCard title="Total User Play" value={isLoading ? '...' : stats.totalUserPlay} change="" icon="users" iconBg="bg-gradient-to-tl from-red-600 to-orange-600" />
        <StatCard title="Highest Strike" value={isLoading ? '...' : stats.highestStrike} change="" icon="trophy" iconBg="bg-gradient-to-tl from-orange-500 to-yellow-500" />
    </div>

            {/* Leaderboard Table Section */}
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 mt-6">
                    <div className="border-black/12.5 shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                        <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                            <h6 className="capitalize text-slate-800 text-lg font-semibold">Top 10 Leaderboard</h6>
                        </div>
                        <div className="flex-auto p-4">
                            <table className="w-full text-left border-collapse text-black">
                                <thead>
                                    <tr className="bg-gray-100 text-sm">
                                        <th className="px-4 py-3 font-semibold w-16">Peringkat</th>
                                        <th className="px-4 py-3 font-semibold">Nama</th>
                                        <th className="px-4 py-3 font-semibold text-right">Skor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr><td colSpan="3" className="p-4 text-center">Loading...</td></tr>
                                    ) : leaderboard.length > 0 ? (
                                        leaderboard.map((player, index) => (
                                            <tr key={player.id || player.email || index} className="border-b border-gray-200">
                                                <td className="p-4 font-bold text-center">{index + 1}</td>
                                                <td className="p-4">{player.fullName || player.username || 'Unknown User'}</td>
                                                <td className="p-4 text-right font-semibold">{player.score}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="p-4 text-center" colSpan="3">Belum Ada data...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
