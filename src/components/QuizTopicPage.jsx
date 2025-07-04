// components/QuizTopicsPage.jsx
import React from 'react';

// Card Komponen untuk setiap pilihan Quiz
const QuizCard = ({ icon, title, description, topicName, setStudentPage }) => {
  return (
    <div
      className="quiz-card"
      onClick={() => setStudentPage(topicName)} // Menggunakan setStudentPage untuk navigasi
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.2)'
      }}
      // Tambahkan efek hover di sini jika Anda mau menggunakan inline style
      // onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'}
      // onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
    >
      <span
        className="quiz-icon"
        style={{
          fontSize: '48px',
          marginBottom: '20px',
          display: 'inline-block',
          // Gaya untuk ikon AI, ML, NLP. Anda bisa buat class CSS terpisah
          // atau tambahkan gaya di sini berdasarkan icon prop
          background: '#764ba2', // Contoh warna latar belakang ikon
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
        }}
      >
        {icon}
      </span>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>{title}</h3>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '25px', lineHeight: '1.6' }}>{description}</p>
      <button
        className="start-btn"
        style={{
          background: '#667eea', // Warna tombol
          color: 'white',
          padding: '12px 30px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        //   '&:hover': { backgroundColor: '#5a67d8' } // Untuk hover, lebih baik pakai CSS eksternal
        }}
      >
        Mulai Quiz
      </button>
    </div>
  );
};


// Komponen utama untuk memilih topik quiz
export default function QuizTopicsPage({ setStudentPage }) {
  return (
    <div
      className="main-quiz-page-container" // Tambahkan kelas untuk CSS global jika ada
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Sesuaikan dengan gradient di MateriPage
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        minHeight: '100vh',
        padding: '80px 20px',
        fontFamily: 'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
        <div className="header" style={{ textAlign: 'center', marginBottom: '60px', textShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '15px' }}>ThinkEd Quiz Test</h1>
          <p style={{ fontSize: '20px', opacity: '0.9' }}>Pilih topik quiz yang ingin Anda ikuti dan uji pengetahuan Anda! </p>
        </div>

        <div
          className="quiz-options"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            padding: '40px',
            borderRadius: '25px',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <QuizCard
            icon="🤖"
            title="Pengenalan AI"
            description="Pelajari dasar-dasar Artificial Intelligence, sejarah, dan konsep fundamental yang perlu dipahami."
            topicName="quiz-ai-intro" // Nama topik yang akan digunakan di setStudentPage
            setStudentPage={setStudentPage}
          />

          <QuizCard
            icon="📈"
            title="Machine Learning"
            description="Eksplorasi algoritma pembelajaran mesin, supervised learning, unsupervised learning, dan aplikasinya."
            topicName="quiz-machine-learning" // Nama topik yang akan digunakan di setStudentPage
            setStudentPage={setStudentPage}
          />

          <QuizCard
            icon="🗣️"
            title="Natural Language Processing"
            description="Pahami bagaimana komputer memproses dan memahami bahasa manusia dalam berbagai aplikasi."
            topicName="quiz-nlp" // Nama topik yang akan digunakan di setStudentPage
            setStudentPage={setStudentPage}
          />
        </div>
      </div>
      {/* Loading Spinner - Anda bisa tambahkan ini nanti jika perlu */}
      {/* <div className="loading" id="loading" style={{ display: 'none' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '10px' }}>Memuat quiz...</p>
      </div> */}
    </div>
  );
}
