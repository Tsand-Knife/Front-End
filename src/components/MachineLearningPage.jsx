// components/MachineLearningPage.jsx
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; // Untuk mendapatkan user yang login
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'; // Untuk interaksi Firestore

// --- Individual Content Sections (Components) ---
// Komponen-komponen ini menerima props onBack, onDone, dan isDone
// dan menampilkan tombol "Tandai Selesai" secara kondisional.

const DefinisiSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Definisi Machine Learning</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-800 pt-4">Apa itu Machine Learning?</h3>
            <p><strong>Machine Learning (ML)</strong> adalah cabang dari Artificial Intelligence yang memungkinkan komputer untuk belajar dan meningkatkan performanya dalam menjalankan tugas tertentu tanpa diprogram secara eksplisit. ML menggunakan algoritma statistik untuk mengidentifikasi pola dalam data dan membuat prediksi atau keputusan berdasarkan pola tersebut.</p>

            <h3 className="text-2xl font-bold text-slate-800 pt-4">Definisi dari Para Ahli</h3>
            <blockquote className="border-l-4 border-purple-500 pl-6 py-2 bg-purple-50 rounded-r-lg">
                <p className="italic">"Machine Learning adalah bidang studi yang memberikan komputer kemampuan untuk belajar tanpa diprogram secara eksplisit."</p>
                <cite className="block text-right mt-2 font-semibold text-purple-700">- Arthur Samuel (1959)</cite>
            </blockquote>
            
            <blockquote className="border-l-4 border-purple-500 pl-6 py-2 bg-purple-50 rounded-r-lg">
                <p className="italic">"Program komputer dikatakan belajar dari pengalaman E terhadap tugas T dan ukuran performa P, jika performa P dalam tugas T meningkat dengan pengalaman E."</p>
                <cite className="block text-right mt-2 font-semibold text-purple-700">- Tom Mitchell (1997)</cite>
            </blockquote>

            <h3 className="text-2xl font-bold text-slate-800 pt-4">Perbedaan ML dengan Programming Tradisional</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-purple-600 text-white">
                            <th className="p-4 font-semibold">Aspek</th>
                            <th className="p-4 font-semibold">Programming Tradisional</th>
                            <th className="p-4 font-semibold">Machine Learning</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr className="border-b hover:bg-gray-50"><td className="p-4">Input</td><td className="p-4">Data + Program</td><td className="p-4">Data + Output yang Diinginkan</td></tr>
                        <tr className="border-b hover:bg-gray-50"><td className="p-4">Output</td><td className="p-4">Hasil Eksekusi</td><td className="p-4">Program/Model</td></tr>
                        <tr className="border-b hover:bg-gray-50"><td className="p-4">Pendekatan</td><td className="p-4">Rule-based, Deterministik</td><td className="p-4">Pattern-based, Probabilistik</td></tr>
                        <tr className="hover:bg-gray-50"><td className="p-4">Adaptasi</td><td className="p-4">Manual update code</td><td className="p-4">Otomatis dari data baru</td></tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 pt-4">Konsep Dasar Machine Learning</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Training Data:</strong> Dataset yang digunakan untuk melatih model</li>
                <li><strong>Features:</strong> Variabel input yang digunakan untuk membuat prediksi</li>
                <li><b>Target/Label:</b> Output yang ingin diprediksi</li>
                <li><strong>Model:</strong> Algoritma yang telah dilatih untuk membuat prediksi</li>
                <li><strong>Prediction:</strong> Output yang dihasilkan oleh model</li>
                <li><strong>Overfitting:</strong> Model terlalu spesifik pada training data</li>
                <li><strong>Underfitting:</strong> Model terlalu sederhana untuk menangkap pola data</li>
            </ul>
        </div>
        {!isDone('definisi') && ( // Tombol Tandai Selesai
            <button
                onClick={() => onDone('definisi')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const JenisSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Jenis-jenis Machine Learning</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-types-grid">
                <div className="ml-type-card bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
                    <h4 className="text-2xl font-bold text-blue-800 mb-3">🎯 Supervised Learning</h4>
                    <p className="mb-4"><strong>Definisi:</strong> Algoritma belajar dari data yang sudah berlabel (input-output pairs) untuk membuat prediksi pada data baru.</p>
                    
                    <h5 className="text-xl font-semibold text-blue-700 mb-2">Karakteristik:</h5>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                        <li>Memiliki target variable yang jelas</li>
                        <li>Menggunakan labeled training data</li>
                        <li>Tujuan: meminimalkan prediction error</li>
                        <li>Performance dapat diukur dengan akurasi</li>
                    </ul>

                    <h5 className="text-xl font-semibold text-blue-700 mb-2">Jenis Supervised Learning:</h5>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                        <li><strong>Classification:</strong> Prediksi kategori/kelas
                            <ul className="list-circle list-inside ml-4">
                                <li>Binary Classification (2 kelas)</li>
                                <li>Multi-class Classification (&gt;2 kelas)</li>
                                <li>Multi-label Classification</li>
                            </ul>
                        </li>
                        <li><strong>Regression:</strong> Prediksi nilai numerik kontinu</li>
                    </ul>

                    <h5 className="text-xl font-semibold text-blue-700 mb-2">Contoh Aplikasi:</h5>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Email spam detection (classification)</li>
                        <li>Image recognition (classification)</li>
                        <li>House price prediction (regression)</li>
                        <li>Stock price forecasting (regression)</li>
                    </ul>
                </div>

                <div className="ml-type-card bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
                    <h4 className="text-2xl font-bold text-green-800 mb-3">🔍 Unsupervised Learning</h4>
                    <p className="mb-4"><strong>Definisi:</strong> Algoritma belajar dari data tanpa label untuk menemukan pola tersembunyi atau struktur dalam data.</p>
                    
                    <h5 className="text-xl font-semibold text-green-700 mb-2">Karakteristik:</h5>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                        <li>Tidak ada target variable</li>
                        <li>Menggunakan unlabeled data</li>
                        <li>Tujuan: menemukan struktur tersembunyi</li>
                        <li>Evaluasi lebih subjektif</li>
                    </ul>

                    <h5 className="text-xl font-semibold text-green-700 mb-2">Jenis Unsupervised Learning:</h5>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                        <li><strong>Clustering:</strong> Mengelompokkan data serupa
                            <ul className="list-circle list-inside ml-4">
                                <li>K-Means Clustering</li>
                                <li>Hierarchical Clustering</li>
                                <li>DBSCAN</li>
                            </ul>
                        </li>
                        <li><strong>Dimensionality Reduction:</strong> Mengurangi jumlah features
                            <ul className="list-circle list-inside ml-4">
                                <li>Principal Component Analysis (PCA)</li>
                                <li>t-SNE</li>
                                <li>UMAP</li>
                            </ul>
                        </li>
                        <li><strong>Association Rules:</strong> Menemukan hubungan antar item</li>
                    </ul>

                    <h5 className="text-xl font-semibold text-green-700 mb-2">Contoh Aplikasi:</h5>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Customer segmentation</li>
                        <li>Anomaly detection</li>
                        <li>Market basket analysis</li>
                        <li>Data compression</li>
                    </ul>
                </div>

                <div className="ml-type-card bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
                    <h4 className="text-2xl font-bold text-red-800 mb-3">🎮 Reinforcement Learning</h4>
                    <p className="mb-4"><strong>Definisi:</strong> Agent belajar melalui interaksi dengan environment untuk memaksimalkan reward melalui trial and error.</p>
                    
                    <h5 className="text-xl font-semibold text-red-700 mb-2">Karakteristik:</h5>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                        <li>Learning through interaction</li>
                        <li>Reward-based system</li>
                        <li>Sequential decision making</li>
                        <li>Balance exploration vs exploitation</li>
                    </ul>

                    <h5 className="text-xl font-semibold text-red-700 mb-2">Komponen Utama:</h5>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Agent:</strong> Yang belajar dan membuat keputusan</li>
                        <li><strong>Environment:</strong> Dunia tempat agent beroperasi</li>
                        <li><strong>State:</strong> Situasi saat ini</li>
                        <li><strong>Action:</strong> Tindakan yang dapat diambil</li>
                        <li><strong>Reward:</strong> Feedback dari environment</li>
                        <li><strong>Policy:</strong> Strategi agent dalam memilih action</li>
                    </ul>

                    <h5 className="text-xl font-semibold text-red-700 mb-2">Contoh Aplikasi:</h5>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Game playing (AlphaGo, Chess)</li>
                        <li>Autonomous vehicles</li>
                        <li>Trading algorithms</li>
                        <li>Robot control</li>
                        <li>Recommendation systems</li>
                    </ul>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 pt-6">Semi-Supervised Learning</h3>
            <p className="text-lg">Kombinasi supervised dan unsupervised learning yang menggunakan sejumlah kecil labeled data dan sejumlah besar unlabeled data. Berguna ketika labeling data mahal atau sulit dilakukan.</p>

            <h3 className="text-2xl font-bold text-slate-800 pt-6">Self-Supervised Learning</h3>
            <p className="text-lg">Model belajar dengan membuat label dari data itu sendiri. Contoh: prediksi kata selanjutnya dalam kalimat (seperti pada model bahasa GPT).</p>
        </div>
        {!isDone('jenis') && ( // Tombol Tandai Selesai
            <button
                onClick={() => onDone('jenis')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const ProsesSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Proses Machine Learning</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-800 pt-4">Tahapan Umum Machine Learning</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>Problem Definition:</strong> Mendefinisikan masalah yang ingin diselesaikan</li>
                <li><strong>Data Collection:</strong> Mengumpulkan data yang relevan</li>
                <li><strong>Data Preprocessing:</strong> Membersihkan dan mempersiapkan data</li>
                <li><strong>Feature Engineering:</strong> Memilih dan membuat fitur yang tepat</li>
                <li><strong>Model Selection:</strong> Memilih algoritma yang sesuai</li>
                <li><strong>Training:</strong> Melatih model dengan data training</li>
                <li><strong>Evaluation:</strong> Mengevaluasi performa model</li>
                <li><strong>Deployment:</strong> Menerapkan model ke production</li>
            </ol>
        </div>
        {!isDone('proses') && ( // Tombol Tandai Selesai
            <button
                onClick={() => onDone('proses')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const AlgoritmaSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Algoritma Populer</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-800 pt-4">Supervised Learning Algorithms</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Linear Regression:</strong> Untuk prediksi nilai kontinu</li>
                <li><strong>Logistic Regression:</strong> Untuk klasifikasi binary</li>
                <li><strong>Decision Trees:</strong> Model berbasis aturan</li>
                <li><strong>Random Forest:</strong> Ensemble dari decision trees</li>
                <li><strong>Support Vector Machines:</strong> Untuk klasifikasi dan regresi</li>
                <li><strong>Neural Networks:</strong> Model terinspirasi otak manusia</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-800 pt-4">Unsupervised Learning Algorithms</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>K-Means:</strong> Clustering berbasis centroid</li>
                <li><strong>Hierarchical Clustering:</strong> Clustering bertingkat</li>
                <li><strong>PCA:</strong> Dimensionality reduction</li>
                <li><strong>DBSCAN:</strong> Density-based clustering</li>
            </ul>
        </div>
        {!isDone('algoritma') && ( // Tombol Tandai Selesai
            <button
                onClick={() => onDone('algoritma')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const EvaluasiSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Evaluasi Model</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-800 pt-4">Metrik untuk Classification</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Accuracy:</strong> Persentase prediksi yang benar</li>
                <li><strong>Precision:</strong> Dari prediksi positif, berapa yang benar</li>
                <li><strong>Recall:</strong> Dari kelas positif aktual, berapa yang terdeteksi</li>
                <li><strong>F1-Score:</strong> Harmonic mean dari precision dan recall</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-800 pt-4">Metrik untuk Regression</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Mean Absolute Error (MAE):</strong> Rata-rata error absolut</li>
                <li><strong>Mean Squared Error (MSE):</strong> Rata-rata error kuadrat</li>
                <li><strong>Root Mean Squared Error (RMSE):</strong> Akar dari MSE</li>
                <li><strong>R-squared:</strong> Proporsi varians yang dijelaskan</li>
            </ul>
        </div>
        {!isDone('evaluasi') && ( // Tombol Tandai Selesai
            <button
                onClick={() => onDone('evaluasi')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const AplikasiSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Aplikasi Machine Learning</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-800 pt-4">Industri dan Aplikasi</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Healthcare:</strong> Diagnosa medis, drug discovery</li>
                <li><strong>Finance:</strong> Fraud detection, algorithmic trading</li>
                <li><strong>Technology:</strong> Search engines, recommendation systems</li>
                <li><strong>Transportation:</strong> Autonomous vehicles, route optimization</li>
                <li><strong>Retail:</strong> Price optimization, inventory management</li>
                <li><strong>Entertainment:</strong> Content recommendation, game AI</li>
            </ul>
        </div>
        {!isDone('aplikasi') && ( // Tombol Tandai Selesai
            <button
                onClick={() => onDone('aplikasi')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const MasaDepanSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Masa Depan Machine Learning</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="text-2xl font-bold text-slate-800 pt-4">Tren Emerging</h3>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>AutoML:</strong> Otomatisasi proses machine learning</li>
                <li><strong>Explainable AI:</strong> AI yang dapat dijelaskan</li>
                <li><strong>Edge AI:</strong> ML di device lokal</li>
                <li><strong>Quantum Machine Learning:</strong> ML dengan quantum computing</li>
                <li><strong>Federated Learning:</strong> Training tanpa centralized data</li>
            </ul>
        </div>
        {!isDone('masa-depan') && ( // Tombol Tandai Selesai
            <button
                onClick={() => onDone('masa-depan')}
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

// --- Main Menu Component ---
const MenuUtama = ({ onSelect }) => (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border w-full max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-slate-700 mb-8">Pilih Materi Machine Learning:</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><button onClick={() => onSelect('definisi')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Definisi Machine Learning</button></li>
            <li><button onClick={() => onSelect('jenis')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Jenis-jenis Machine Learning</button></li>
            <li><button onClick={() => onSelect('proses')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Proses Machine Learning</button></li>
            <li><button onClick={() => onSelect('algoritma')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Algoritma Populer</button></li>
            <li><button onClick={() => onSelect('evaluasi')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Evaluasi Model</button></li>
            <li><button onClick={() => onSelect('aplikasi')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Aplikasi Machine Learning</button></li>
            <li><button onClick={() => onSelect('masa-depan')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Masa Depan Machine Learning</button></li>
        </ul>
    </div>
);

// --- Main Machine Learning Page Component ---
export default function MachineLearningPage() {
    const [activeSection, setActiveSection] = useState('menu'); // Default to menu
    const [completedSections, setCompletedSections] = useState([]); // State untuk melacak bagian yang selesai

    // Definisi semua bagian materi Machine Learning
    const sections = [ 
        'definisi',
        'jenis',
        'proses',
        'algoritma',
        'evaluasi',
        'aplikasi',
        'masa-depan'
    ];
    
    // Konstanta untuk total bagian dari semua materi
    const TOTAL_AI_SECTIONS = 7; // Asumsi ada 7 bagian di materi Pengenalan AI
    const TOTAL_ML_SECTIONS = sections.length; // Ini adalah 7 bagian di materi ML ini
    const OVERALL_TOTAL_SECTIONS = TOTAL_AI_SECTIONS + TOTAL_ML_SECTIONS; // Total keseluruhan (7 + 7 = 14)

    // Fungsi untuk mengambil progres dari Firestore
    const fetchProgress = async () => {
        const user = getAuth().currentUser;
        if (!user) return; // Jangan fetch jika user tidak login

        const userRef = doc(getFirestore(), 'users', user.uid);
        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                // Memuat progres khusus untuk materi ML
                setCompletedSections(data.ml_material_progress || []); 
            }
        } catch (error) {
            console.error("Gagal mengambil progress ML:", error);
        }
    };

    // Fungsi untuk memperbarui progres di Firestore
    const updateProgress = async (sectionKey) => {
        const user = getAuth().currentUser;
        if (!user) {
            console.warn("User not logged in, cannot update progress.");
            return;
        }

        const userRef = doc(getFirestore(), 'users', user.uid);
        try {
            // 1. Ambil dokumen user saat ini untuk mendapatkan semua progress materi
            const docSnap = await getDoc(userRef);
            let aiProgress = []; // Progres materi AI dari DB
            let mlProgress = []; // Progres materi ML dari DB
            if (docSnap.exists()) {
                const data = docSnap.data();
                aiProgress = data.ai_material_progress || [];
                mlProgress = data.ml_material_progress || [];
            }

            // 2. Tambahkan sectionKey yang baru selesai ke progres materi ML yang relevan
            // Menggunakan Set untuk memastikan setiap sectionKey unik
            const newMlProgress = [...new Set([...mlProgress, sectionKey])]; 
            setCompletedSections(newMlProgress); // Perbarui state lokal

            // 3. Hitung total semua bagian yang selesai dari SEMUA materi
            const allCompletedSectionsKeys = new Set([...aiProgress, ...newMlProgress]); // Kombinasikan kedua progres
            const totalCompletedCount = allCompletedSectionsKeys.size; // Ambil jumlah uniknya

            // 4. Hitung persentase learningProgress
            const newLearningProgress = Math.min(100, Math.round((totalCompletedCount / OVERALL_TOTAL_SECTIONS) * 100));

            // 5. Lakukan updateDoc dengan kedua field progres materi ML dan learningProgress global
            await updateDoc(userRef, {
                ml_material_progress: newMlProgress, // Update array progres materi ML
                learningProgress: newLearningProgress // Update progres global
            });
            console.log(`Progres ML untuk '${sectionKey}' berhasil disimpan. Progres Global: ${newLearningProgress}%`);

        } catch (error) {
            console.error("Gagal menyimpan progres ML atau global:", error);
        }
    };

    // useEffect untuk memuat progres saat komponen dimount
    useEffect(() => { 
        fetchProgress();
    }, []);

    const handleBackToMenu = () => {
        setActiveSection('menu');
    };

    // Handler untuk menandai bagian selesai dan kembali ke menu
    const handleDone = (sectionKey) => { 
        updateProgress(sectionKey); // Panggil fungsi updateProgress
        setActiveSection('menu');
    };

    // Render statistik progres
    const renderProgressStats = () => { 
        const total = sections.length; // Total bagian di materi ML ini
        const completed = completedSections.length; // Bagian yang selesai di materi ML ini
        const percent = Math.round((completed / total) * 100);

        return (
            <div className="text-center mb-6 text-slate-700">
                <p className="text-lg">Progress Anda: <strong>{completed}/{total}</strong> materi diselesaikan ({percent}%)</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${percent}%` }}></div>
                </div>
            </div>
        );
    };

    // sharedProps untuk diteruskan ke setiap section
    const sharedProps = { 
        onBack: handleBackToMenu,
        onDone: handleDone,
        isDone: (key) => completedSections.includes(key) // Cek apakah sectionKey sudah ada di completedSections
    };

    // useEffect untuk menangani tombol Escape (opsional)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleBackToMenu();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const renderContent = () => {
        switch (activeSection) {
            case 'definisi': return <DefinisiSection {...sharedProps} />;
            case 'jenis': return <JenisSection {...sharedProps} />;
            case 'proses': return <ProsesSection {...sharedProps} />;
            case 'algoritma': return <AlgoritmaSection {...sharedProps} />;
            case 'evaluasi': return <EvaluasiSection {...sharedProps} />;
            case 'aplikasi': return <AplikasiSection {...sharedProps} />;
            case 'masa-depan': return <MasaDepanSection {...sharedProps} />;
            case 'menu':
            default:
                return (
                    <>
                        {renderProgressStats()} {/* Tampilkan progres di menu utama */}
                        <MenuUtama onSelect={setActiveSection} />
                    </>
                );
        }
    };

    return (
        <>
            {/* Header Section */}
            <section className="bg-indigo-600 text-white text-center py-16 px-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h1 className="text-4xl font-bold">Machine Learning</h1>
                <p className="text-lg mt-2 opacity-90">Panduan Lengkap untuk Memahami dan Menguasai Machine Learning</p>
            </section>

            {/* Content Section */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="container mx-auto">
                    {renderContent()}
                </div>
            </section>
        </>
    );
}