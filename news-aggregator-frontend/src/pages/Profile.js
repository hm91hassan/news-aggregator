import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api/api'; // Import the new function

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setProfile(data); // Set the profile data received
            } catch (error) {
                setError('Failed to load profile. Please try again later.');
            }
        };

        loadProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    User Profile
                </h2>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                        <p>{error}</p>
                    </div>
                )}

                {profile ? (
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                                {/* Optional: Add user avatar */}
                                <span className="text-xl font-semibold text-gray-600">
                                    {profile.name[0]}
                                </span>
                            </div>
                            <div className="ml-6">
                                <p className="text-lg font-semibold text-gray-700">
                                    {profile.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {profile.email}
                                </p>
                            </div>
                        </div>

                        {/* Display additional user profile information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-700">
                                Profile Details
                            </h3>
                            <div className="space-y-2 mt-4">
                                <p className="text-gray-600">
                                    <strong>Full Name: </strong>
                                    {profile.name}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Email: </strong>
                                    {profile.email}
                                </p>
                                {/* Add more fields if necessary */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-500">Loading profile...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
