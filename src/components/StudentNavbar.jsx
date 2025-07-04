import React from 'react';

const linkStyle = {
  color: '#000000',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: 16,
  padding: '10px 20px',
  borderRadius: 25,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
};

const activeLinkStyle = {
  ...linkStyle,
  color: '#4f46e5',
  fontWeight: 700,
  textDecoration: 'underline'
};

const StudentNavbar = ({ userData, handleLogout, activePage, setPage }) => {
  let logoText = 'ThinkEd';
  if (activePage === 'materi') logoText = 'ThinkEd Materi';
  else if (activePage === 'quiz') logoText = 'ThinkEd Quiz';

  return (
    <nav
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Logo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientText 3s ease infinite',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {logoText}
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 50 }}>
        <span onClick={() => setPage('dashboard')} style={activePage === 'dashboard' ? activeLinkStyle : linkStyle}>Home</span>
        <span onClick={() => setPage('materi')} style={activePage === 'materi' ? activeLinkStyle : linkStyle}>Materi</span>
        <span onClick={() => setPage('quiz')} style={activePage === 'quiz' ? activeLinkStyle : linkStyle}>Quiz Test</span>
        <span onClick={() => setPage('tentang')} style={activePage === 'tentang' ? activeLinkStyle : linkStyle}>Tentang Kami</span>
      </div>

      {/* User Info and Logout */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
        <span style={{ fontWeight: 600, color: '#1f2937' }}>{userData?.fullName}</span>
        <button
          onClick={handleLogout}
          style={{
            border: '1px solid #4f46e5',
            color: '#4f46e5',
            padding: '8px 16px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#4f46e5';
            e.target.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#4f46e5';
          }}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;