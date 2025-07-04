// components/PengenalanAiPage.jsx
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'; // Untuk mendapatkan user yang login
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'; // Untuk interaksi Firestore

export default function PengenalanAiPage() {
    const [activeSection, setActiveSection] = useState('menu');
    const [completedSections, setCompletedSections] = useState([]); // State untuk melacak bagian yang selesai

    // Definisi semua bagian materi Pengenalan AI
    const sections = [
        'definisi',
        'sejarah',
        'jenis',
        'komponen',
        'aplikasi',
        'masa-depan',
        'karir'
    ];

    // Konstanta untuk total bagian dari semua materi
    const TOTAL_AI_SECTIONS = sections.length; // Ini adalah 7 bagian di materi AI ini
    const TOTAL_ML_SECTIONS = 7; // Asumsi ada 7 bagian di materi Machine Learning
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
                // Memuat progres khusus untuk materi AI
                setCompletedSections(data.ai_material_progress || []); 
            }
        } catch (error) {
            console.error("Gagal mengambil progress AI:", error);
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

            // 2. Tambahkan sectionKey yang baru selesai ke progres materi AI yang relevan
            // Menggunakan Set untuk memastikan setiap sectionKey unik
            const newAiProgress = [...new Set([...aiProgress, sectionKey])]; 
            setCompletedSections(newAiProgress); // Perbarui state lokal

            // 3. Hitung total semua bagian yang selesai dari SEMUA materi
            const allCompletedSectionsKeys = new Set([...newAiProgress, ...mlProgress]); // Kombinasikan kedua progres
            const totalCompletedCount = allCompletedSectionsKeys.size; // Ambil jumlah uniknya

            // 4. Hitung persentase learningProgress
            const newLearningProgress = Math.min(100, Math.round((totalCompletedCount / OVERALL_TOTAL_SECTIONS) * 100));

            // 5. Lakukan updateDoc dengan kedua field progres materi AI dan learningProgress global
            await updateDoc(userRef, {
                ai_material_progress: newAiProgress, // Update array progres materi AI
                learningProgress: newLearningProgress // Update progres global
            });
            console.log(`Progres AI untuk '${sectionKey}' berhasil disimpan. Progres Global: ${newLearningProgress}%`);

        } catch (error) {
            console.error("Gagal menyimpan progress AI atau global:", error);
        }
    };

    // useEffect untuk memuat progres saat komponen dimount
    useEffect(() => {
        fetchProgress();
    }, []);

    const handleSelectSection = (key) => {
        setActiveSection(key);
    };

    // Handler untuk menandai bagian selesai dan kembali ke menu
    const handleDone = (sectionKey) => {
        updateProgress(sectionKey); // Panggil fungsi updateProgress
        setActiveSection('menu');
    };

    // Render statistik progres
    const renderProgressStats = () => {
        const total = sections.length; // Total bagian di materi AI ini
        const completed = completedSections.length; // Bagian yang selesai di materi AI ini
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
        onBack: () => setActiveSection('menu'),
        onDone: handleDone,
        isDone: (key) => completedSections.includes(key) // Cek apakah sectionKey sudah ada di completedSections
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'definisi': return <DefinisiSection {...sharedProps} />;
            case 'sejarah': return <SejarahSection {...sharedProps} />;
            case 'jenis': return <JenisSection {...sharedProps} />;
            case 'komponen': return <KomponenSection {...sharedProps} />;
            case 'aplikasi': return <AplikasiSection {...sharedProps} />;
            case 'masa-depan': return <MasaDepanSection {...sharedProps} />;
            case 'karir': return <KarirSection {...sharedProps} />;
            case 'menu':
            default:
                return (
                    <>
                        {renderProgressStats()} {/* Tampilkan progres di menu utama */}
                        <MenuUtama onSelect={handleSelectSection} />
                    </>
                );
        }
    };

    const MenuUtama = ({ onSelect }) => (
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border w-full max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-slate-700 mb-8">Pilih Materi yang Ingin Dipelajari:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => onSelect('definisi')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700">Definisi Artificial Intelligence</button>
                <button onClick={() => onSelect('sejarah')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700">Sejarah Perkembangan AI</button>
                <button onClick={() => onSelect('jenis')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700">Jenis-jenis AI</button>
                <button onClick={() => onSelect('komponen')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700">Komponen Utama AI</button>
                <button onClick={() => onSelect('aplikasi')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700">Aplikasi AI dalam Kehidupan</button>
                <button onClick={() => onSelect('masa-depan')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700">Masa Depan AI</button>
                <button onClick={() => onSelect('karir')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700">Peluang Karir di Bidang AI</button>
            </div>
        </div>
    );

    return (
        <>
            {/* Header Section */}
            <section className="bg-indigo-600 text-white text-center py-16 px-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <h1 className="text-4xl font-bold">Pengenalan Artificial Intelligence</h1>
                <p className="text-lg mt-2 opacity-90">Memahami dasar-dasar kecerdasan buatan dan perkembangannya</p>
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

// --- Individual Content Sections ---
// Komponen-komponen ini menerima props onBack, onDone, dan isDone.
// Pastikan tombol Tandai Selesai ditambahkan di akhir div materi utama setiap section.

const DefinisiSection = ({ onBack , onDone, isDone}) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Definisi Artificial Intelligence</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <p><strong>Artificial Intelligence (AI)</strong> atau Kecerdasan Buatan adalah cabang ilmu komputer yang bertujuan untuk menciptakan sistem dan mesin yang dapat melakukan tugas-tugas yang biasanya memerlukan kecerdasan manusia. AI mencakup kemampuan seperti pembelajaran, penalaran, persepsi, pemecahan masalah, dan komunikasi.</p>
            <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50 rounded-r-lg">
                <p className="italic">"AI adalah ilmu dan rekayasa untuk membuat mesin cerdas, terutama program komputer cerdas."</p>
                <cite className="block text-right mt-2 font-semibold text-indigo-700">- John McCarthy (1956)</cite>
            </blockquote>
            <h3 className="text-2xl font-bold text-slate-800 pt-4">Perbedaan dengan Pemrograman Tradisional</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="p-4 font-semibold">Aspek</th>
                            <th className="p-4 font-semibold">Pemrograman Tradisional</th>
                            <th className="p-4 font-semibold">Artificial Intelligence</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr className="border-b hover:bg-gray-50"><td className="p-4">Pendekatan</td><td className="p-4">Rule-based, eksplisit</td><td className="p-4">Data-driven, pembelajaran</td></tr>
                        <tr className="border-b hover:bg-gray-50"><td className="p-4">Fleksibilitas</td><td className="p-4">Terbatas pada aturan yang ditetapkan</td><td className="p-4">Adaptif terhadap situasi baru</td></tr>
                        <tr className="hover:bg-gray-50"><td className="p-4">Pembelajaran</td><td className="p-4">Tidak ada pembelajaran otomatis</td><td className="p-4">Belajar dari data dan pengalaman</td></tr>
                    </tbody>
                </table>
            </div>
            {!isDone('definisi') && (
            <button
                onClick={() => onDone('definisi')}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
        </div>
    </div>
);

const SejarahSection = ({ onBack, onDone, isDone }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8 transition-colors">
            ← Kembali ke Menu
        </button>
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-indigo-200 pb-3">Sejarah Perkembangan AI</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <p>Perjalanan AI dimulai dari konsep teoretis pada tahun 1940-an, lahir secara resmi pada <strong>Konferensi Dartmouth tahun 1956</strong>, melewati periode optimisme dan "musim dingin AI", hingga revolusi deep learning saat ini yang didorong oleh big data dan kekuatan komputasi.</p>
            <p>Momen penting termasuk kemenangan Deep Blue melawan Garry Kasparov (1997) dan kemenangan AlphaGo melawan Lee Sedol (2016), yang menunjukkan kemajuan pesat dalam kemampuan AI.</p>
        </div>
        {!isDone('sejarah') && (
            <button
                onClick={() => onDone('sejarah')}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const JenisSection = ({ onBack , onDone, isDone}) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Jenis-jenis AI</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="2xl font-semibold">Berdasarkan Kemampuan</h3>
            <ul className="list-disc pl-6">
                <li><strong>Narrow AI (ANI):</strong> Fokus pada satu tugas, seperti Siri atau Google Assistant.</li>
                <li><strong>General AI (AGI):</strong> Mampu melakukan berbagai tugas layaknya manusia (masih dikembangkan).</li>
                <li><strong>Super AI (ASI):</strong> Lebih pintar dari manusia (hipotetis).</li>
            </ul>
            <h3 className="text-2xl font-semibold pt-6">Berdasarkan Fungsi</h3>
            <ul className="list-disc pl-6">
                <li><strong>Reactive Machines:</strong> Hanya merespon tanpa ingatan (contoh: Deep Blue).</li>
                <li><strong>Limited Memory:</strong> Menggunakan data masa lalu (contoh: mobil otonom).</li>
                <li><strong>Theory of Mind & Self-aware:</strong> Masih dalam penelitian dan teoretis.</li>
            </ul>
        </div>
        {!isDone('jenis') && (
            <button
                onClick={() => onDone('jenis')}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const KomponenSection = ({ onBack , onDone, isDone}) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Komponen Utama AI</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <h3 className="text-2xl font-semibold">1. Data</h3>
            <p>Data adalah bahan bakar sistem AI.</p>
            <ul className="list-disc pl-6">
                <li>Structured, unstructured, dan semi-structured data</li>
                <li>Kualitas: akurat, lengkap, konsisten, tepat waktu</li>
            </ul>
            <h3 className="text-2xl font-semibold">2. Algoritma</h3>
            <ul className="list-disc pl-6">
                <li>Machine Learning: Supervised, Unsupervised, Reinforcement</li>
                <li>Deep Learning: CNN, RNN, Transformer</li>
            </ul>
            <h3 className="text-2xl font-semibold">3. Computational Power</h3>
            <p>CPU, GPU, TPU, dan Cloud Computing seperti AWS dan GCP</p>
            <h3 className="text-2xl font-semibold">4. Tools & Software</h3>
            <p>Bahasa: Python, R, Java. Framework: TensorFlow, PyTorch, Scikit-learn</p>
        </div>
        {!isDone('komponen') && (
            <button
                onClick={() => onDone('komponen')}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const AplikasiSection = ({ onBack , onDone, isDone}) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Aplikasi AI dalam Kehidupan</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <ul className="list-disc pl-6">
                <li><strong>Kesehatan:</strong> Diagnosa penyakit, pengobatan personalisasi, robot bedah</li>
                <li><strong>Transportasi:</strong> Mobil otonom, prediksi lalu lintas, ride-sharing</li>
                <li><strong>Keuangan:</strong> Deteksi fraud, credit scoring, robo-advisors</li>
                <li><strong>Pendidikan:</strong> Tutor virtual, pembelajaran adaptif</li>
                <li><strong>E-commerce:</strong> Rekomendasi produk, chatbot, visual search</li>
                <li><strong>Manufaktur:</strong> Otomasi, quality control, smart factories</li>
            </ul>
        </div>
        {!isDone('aplikasi') && (
            <button
                onClick={() => onDone('aplikasi')}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const MasaDepanSection = ({ onBack , onDone, isDone}) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Masa Depan AI</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <ul className="list-disc pl-6">
                <li>2025-2030: AI narrow superhuman, kendaraan otonom, smart cities</li>
                <li>2030-2040: Menuju AGI, AI multi-domain</li>
                <li>2040-2060: Transformasi sistem pendidikan dan riset</li>
                <li>2060+: Super AI, singularitas teknologi, redefinisi eksistensi</li>
            </ul>
            <h3 className="text-2xl font-semibold">Tantangan & Peluang</h3>
            <ul className="list-disc pl-6">
                <li>Etika, keamanan, privasi, regulasi</li>
                <li>Solusi AI untuk iklim, pendidikan, kesehatan, eksplorasi luar angkasa</li>
            </ul>
        </div>
        {!isDone('masa-depan') && (
            <button
                onClick={() => onDone('masa-depan')}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

const KarirSection = ({ onBack , onDone, isDone}) => (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in max-w-4xl mx-auto">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 mb-8">← Kembali ke Menu</button>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Peluang Karir di Bidang AI</h2>
        <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
            <ul className="list-disc pl-6">
                <li><strong>Machine Learning Engineer:</strong> Fokus pada model produksi</li>
                <li><strong>Data Scientist:</strong> Analisis dan visualisasi data</li>
                <li><strong>AI Research Scientist:</strong> Penelitian algoritma baru</li>
                <li><strong>AI Product Manager:</strong> Strategi produk AI</li>
                <li><strong>AI Architect:</strong> Arsitektur sistem AI</li>
                <li><strong>AI Ethics Specialist:</strong> Etika dan regulasi AI</li>
            </ul>
            <h3 className="text-2xl font-semibold">Tips Karir AI</h3>
            <ul className="list-disc pl-6">
                <li>Belajar terus-menerus, bangun portofolio</li>
                <li>Networking dan komunitas AI</li>
                <li>Spesialisasi dan soft skills</li>
            </ul>
        </div>
        {!isDone('karir') && (
            <button
                onClick={() => onDone('karir')}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                ✅ Tandai Selesai
            </button>
        )}
    </div>
);

// --- Main Menu Component ---
const MenuUtama = ({ onSelect }) => (
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border w-full max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-slate-700 mb-8">Pilih Materi yang Ingin Dipelajari:</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><button onClick={() => onSelect('definisi')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Definisi Artificial Intelligence</button></li>
            <li><button onClick={() => onSelect('sejarah')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Sejarah Perkembangan AI</button></li>
            <li><button onClick={() => onSelect('jenis')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Jenis-jenis AI</button></li>
            <li><button onClick={() => onSelect('komponen')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Komponen Utama AI</button></li>
            <li><button onClick={() => onSelect('aplikasi')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Aplikasi AI dalam Kehidupan</button></li>
            <li><button onClick={() => onSelect('masa-depan')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Masa Depan AI</button></li>
            <li><button onClick={() => onSelect('karir')} className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 font-semibold text-slate-700 w-full">Peluang Karir di Bidang AI</button></li>
        </ul>
    </div>
);