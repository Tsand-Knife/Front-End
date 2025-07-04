import React, { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

// --- Reusable Input Component for the Profile Form ---
const ProfileInput = ({ label, id, type, value, onChange, disabled = false }) => (
    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
        <div className="mb-4">
            <label htmlFor={id} className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">{label}</label>
            <input 
                type={type} 
                id={id}
                name={id} 
                value={value} 
                onChange={onChange}
                disabled={disabled}
                className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" 
            />
        </div>
    </div>
);

// --- Main ProfilePage Component ---
export default function ProfilePage({ user, userData: initialUserData }) {
    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUserData(initialUserData);
    }, [initialUserData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { fullName, username } = userData;

        if (!fullName?.trim() || !username?.trim()) {
            alert("Please enter both your full name and username.");
            setIsLoading(false);
            return;
        }

        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        try {
            await updateDoc(userDocRef, {
                fullName: fullName.trim(),
                username: username.trim(),
            });

            // Update local state to reflect changes immediately
            setUserData(prev => ({
                ...prev,
                fullName: fullName.trim(),
                username: username.trim(),
            }));

            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(`Failed to update profile: ${error.message}`);
        }

        setIsLoading(false);
    };

    if (!userData) {
        return <div className="p-6">Loading profile...</div>;
    }

    return (
        <div className="w-full p-6 mx-auto">
            {/* Profile Summary Card */}
            <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words bg-white border-0 shadow-3xl rounded-2xl bg-clip-border">
                <div className="flex flex-wrap -mx-3">
                    <div className="flex-none w-auto max-w-full px-3">
                        <div className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-19 w-19 rounded-xl bg-slate-700">
                            <span className="text-3xl font-bold">{userData.fullName ? userData.fullName.charAt(0) : 'A'}</span>
                        </div>
                    </div>
                    <div className="flex-none w-auto max-w-full px-3 my-auto">
                        <div className="h-full">
                            <h5 className="mb-1">{userData.fullName}</h5>
                            <p className="mb-0 font-semibold leading-normal text-sm capitalize">{userData.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <div className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0 mx-auto mt-6">
                <form onSubmit={handleSaveChanges}>
                    <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                        <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                            <div className="flex items-center">
                                <p className="mb-0">Edit Profile</p>
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditing(!isEditing)} 
                                    className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                                >
                                    {isEditing ? 'Cancel' : 'Edit'}
                                </button>
                                {isEditing && (
                                    <button 
                                        type="submit" 
                                        disabled={isLoading} 
                                        className="inline-block px-8 py-2 mb-4 ml-2 font-bold leading-normal text-center text-black align-middle transition-all ease-in bg-emerald-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85"
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex-auto p-6">
                            <p className="leading-normal uppercase text-sm">User Information</p>
                            <div className="flex flex-wrap -mx-3">
                                <ProfileInput 
                                    label="Username" 
                                    id="username" 
                                    type="text" 
                                    value={userData.username || ''} 
                                    onChange={handleInputChange} 
                                />
                                <ProfileInput 
                                    label="Email Address" 
                                    id="email" 
                                    type="email" 
                                    value={userData.email || ''} 
                                    onChange={handleInputChange} 
                                    disabled 
                                />
                                <ProfileInput 
                                    label="Full Name" 
                                    id="fullName" 
                                    type="text" 
                                    value={userData.fullName || ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
