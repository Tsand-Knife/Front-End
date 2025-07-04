import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default function QuizEditPage() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [newQuestion, setNewQuestion] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('A');
    const [level, setLevel] = useState('beginner');
    const [topic, setTopic] = useState('');
    const [explanation, setExplanation] = useState('');
    const [filterLevel, setFilterLevel] = useState('');
    const [filterTopic, setFilterTopic] = useState('');

    const db = getFirestore();

    const fetchQuestions = async () => {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuestions(questionsList);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "quizzes"), {
                question: newQuestion,
                options: { A: optionA, B: optionB, C: optionC, D: optionD },
                answer: correctAnswer,
                level,
                topic,
                explanation
            });
            resetForm();
            fetchQuestions();
        } catch (error) {
            console.error("Error adding question: ", error);
            alert("Failed to add question.");
        }
    };

    const handleEditQuestion = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "quizzes", editId);
            await updateDoc(docRef, {
                question: newQuestion,
                options: { A: optionA, B: optionB, C: optionC, D: optionD },
                answer: correctAnswer,
                level,
                topic,
                explanation
            });
            resetForm();
            fetchQuestions();
        } catch (error) {
            console.error("Error editing question: ", error);
            alert("Gagal mengedit soal.");
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Hapus soal ini?")) {
            await deleteDoc(doc(db, "quizzes", id));
            fetchQuestions();
        }
    };

    const openEditModal = (q) => {
        setEditId(q.id);
        setNewQuestion(q.question);
        setOptionA(q.options.A);
        setOptionB(q.options.B);
        setOptionC(q.options.C);
        setOptionD(q.options.D);
        setCorrectAnswer(q.answer);
        setLevel(q.level);
        setTopic(q.topic);
        setExplanation(q.explanation || '');
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditId(null);
        setNewQuestion('');
        setOptionA('');
        setOptionB('');
        setOptionC('');
        setOptionD('');
        setCorrectAnswer('A');
        setLevel('beginner');
        setTopic('');
        setExplanation('');
        setIsModalOpen(false);
    };

    const filteredQuestions = questions.filter(q =>
        (!filterLevel || q.level === filterLevel) &&
        (!filterTopic || q.topic?.toLowerCase().includes(filterTopic.toLowerCase()))
    );

    return (
        <div className="w-full px-6 py-6 mx-auto">
            <div className="flex gap-4 mb-4">
                <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="border p-2 rounded">
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                <input type="text" placeholder="Filter by topic..." value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className="border p-2 rounded" />
            </div>
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-xl rounded-2xl">
                <div className="p-6 pb-0 mb-0 flex justify-between items-center">
                    <h6 className="text-slate-700 font-bold">Manajemen Soal Quiz</h6>
                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">+ Tambah Soal</button>
                </div>
                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-slate-500">
                        <thead>
                            <tr>
                                <th>No</th><th>Pertanyaan</th><th>A</th><th>B</th><th>C</th><th>D</th><th>Kunci</th><th>Level</th><th>Topik</th><th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="10" className="text-center p-4">Loading...</td></tr>
                            ) : filteredQuestions.length > 0 ? (
                                filteredQuestions.map((q, i) => (
                                    <tr key={q.id}>
                                        <td>{i + 1}</td>
                                        <td>{q.question || '-'}</td>
                                        <td>{q.options?.A || '-'}</td>
                                        <td>{q.options?.B || '-'}</td>
                                        <td>{q.options?.C || '-'}</td>
                                        <td>{q.options?.D || '-'}</td>
                                        <td>{q.answer || '-'}</td>
                                        <td>{q.level || '-'}</td>
                                        <td>{q.topic || '-'}</td>
                                        <td>
                                            <button onClick={() => openEditModal(q)} className="text-blue-500 mr-2">Edit</button>
                                            <button onClick={() => handleDelete(q.id)} className="text-red-500">Hapus</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="10" className="text-center p-4">No questions found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={resetForm}>
                <h3 className="text-lg font-bold mb-4 text-center">{editId ? 'Edit Soal' : 'Tambah Soal Baru'}</h3>
                <form onSubmit={editId ? handleEditQuestion : handleAddQuestion} className="flex flex-col">
                    <div className="px-6 max-h-[70vh] overflow-y-auto space-y-4">
                        <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Pertanyaan" className="w-full border p-2 rounded" required />
                        <input value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Opsi A" className="w-full border p-2 rounded" required />
                        <input value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Opsi B" className="w-full border p-2 rounded" required />
                        <input value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Opsi C" className="w-full border p-2 rounded" required />
                        <input value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Opsi D" className="w-full border p-2 rounded" required />
                        <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="w-full border p-2 rounded">
                            <option>A</option><option>B</option><option>C</option><option>D</option>
                        </select>
                        <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full border p-2 rounded">
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topik" className="w-full border p-2 rounded" required />
                        <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Penjelasan (opsional)" className="w-full border p-2 rounded" />
                    </div>
                    <div className="px-6 pb-6">
                        <button type="submit" className="w-full bg-blue-600 text-black py-2 rounded">{editId ? 'Simpan Perubahan' : 'Simpan Soal'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
