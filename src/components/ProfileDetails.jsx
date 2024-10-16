import React from 'react';

const ProfileDetails = ({ user }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <p><strong>Email:</strong> {user.email}</p>
    </div>
);

export default ProfileDetails;
