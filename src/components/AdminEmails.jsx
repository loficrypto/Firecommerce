import React, { useState } from 'react';
import { sendEmail } from '../utils/emailService';

const AdminEmails = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            await sendEmail(email, subject, message);
            alert('Email sent successfully');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error("Error sending email", error);
            alert('Failed to send email');
        }
    };

    return (
        <form onSubmit={handleSendEmail} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Send Email</h2>
            <div className="mb-4">
                <label className="block">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Send Email</button>
        </form>
    );
};

export default AdminEmails;
