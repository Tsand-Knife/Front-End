import React, { useState } from 'react';

// --- Individual Content Sections ---

const DefinisiSection = ({ onBack }) => (
    <div></div>
);

const SejarahSection = ({ onBack }) => (
     <div></div>
);

// --- Main Menu Component ---
const MenuUtama = ({ onSelect }) => (
    <div></div>
);


// --- Main Pengenalan AI Page Component ---
export default function PengenalanAiPage() {
    const [activeSection, setActiveSection] = useState('menu');

    const renderContent = () => {
        switch (activeSection) {
            case 'definisi':
                return <DefinisiSection onBack={() => setActiveSection('menu')} />;
            case 'sejarah':
                return <SejarahSection onBack={() => setActiveSection('menu')} />;
            // Add cases for other sections here
            case 'menu':
            default:
                return <MenuUtama onSelect={setActiveSection} />;
        }
    };

    return (
        <>
            {/* Header Section */}
            <section className="bg-indigo-600 text-white text-center py-16 px-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h1 className="text-4xl font-bold">Natural Language Processing Quiz</h1>
                <p className="text-lg mt-2 opacity-90">Coming soon...</p>
            </section>

            {/* Content Section */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="container mx-auto">
                    {renderContent()}
                        <button
  onClick={() => window.history.back()}
  className="mt-6 inline-block bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition"
>
  Back to Quiz Topics
</button>
                </div>
            </section>
        </>
    );
}