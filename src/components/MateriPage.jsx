import React from 'react';

const SubjectCard = ({ icon, name, setStudentPage,topicName  }) => (
  <a
  onClick={() => setStudentPage(topicName)}
    className="subject-card fade-in"
    style={{
      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px 20px',
      borderRadius: '20px',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#333',
      overflow: 'hidden',
      position: 'relative'
    }}
  >
    <div
      className="subject-icon"
      style={{
        width: 70,
        height: 70,
        borderRadius: 20,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        background: '#764ba2'
      }}
    >
      {icon}
    </div>
    <div className="subject-name" style={{ fontWeight: 600, fontSize: 16, color: '#2c3e50', textAlign: 'center' }}>{name}</div>
  </a>
);

export default function MateriPage({setStudentPage}) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        minHeight: '100vh',
        paddingBottom: 40,
        fontFamily: 'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        overflowX: 'hidden'
      }}
    >
      <section className="hero" style={{ padding: '80px 20px 60px', textAlign: 'center', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 5 }}>
        <h1 style={{ color: 'white', fontSize: 48, marginBottom: 15, fontWeight: 800, textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}>Hi, Squad AI!</h1>
        <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: 22, fontWeight: 300, textShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
          Siap menjelajahi dunia Artificial Intelligence?
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto 60px', padding: '0 20px', position: 'relative', zIndex: 5 }}>
        <div
          className="search-box"
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            borderRadius: 25,
            padding: 30,
            boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: 20,
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            placeholder="🔍 Cari materi AI di sini"
            style={{
              flex: 1,
              padding: '18px 25px',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: 15,
              fontSize: 16,
              outline: 'none',
              background: 'rgba(255,255,255,0.9)',
              fontWeight: 500
            }}
          />
        </div>
      </section>

      <section className="subjects-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 5 }}>
        <div className="subjects-title" style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          padding: 30,
          borderRadius: '25px 25px 0 0',
          marginBottom: 0,
          border: '1px solid rgba(255,255,255,0.1)',
          borderBottom: 'none'
        }}>
          <h2 style={{ color: 'white', fontSize: 32, fontWeight: 800, textAlign: 'center', textShadow: '0 5px 15px rgba(0, 0, 0, 0.2)' }}>Materi AI</h2>
        </div>
        <div className="subjects-grid" style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          padding: 40,
          borderRadius: '0 0 25px 25px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderTop: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 30
        }}>
          <SubjectCard icon="🤖" name="Pengenalan AI" setStudentPage={setStudentPage} topicName="pengenalan-ai"/>
          <SubjectCard icon="📈" name="Machine Learning" setStudentPage={setStudentPage} topicName="machine-learning" />
          <SubjectCard icon="🗣️" name="Natural Language Processing" setStudentPage={setStudentPage} topicName="nlp" />
        </div>
      </section>

      <footer className="footer" style={{ textAlign: 'center', padding: 20, fontSize: '0.9em', background: 'rgba(0,0,0,0.2)', marginTop: 40, color: '#eee' }}>
        <p>&copy; 2025 ThinkEd. Semua hak dilindungi.</p>
      </footer>
    </div>
  );
}