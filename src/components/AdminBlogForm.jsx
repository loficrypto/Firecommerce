import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminBlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'blogPosts'), {
                title,
                content,
                date: new Date().toISOString()
            });

            setTitle('');
            setContent('');
            alert('Blog post added successfully');
        } catch (error) {
            console.error("Error adding blog post", error);
            alert('Failed to add blog post');
        }
    };

    return (
        <form onSubmit={handleAddPost} className="bg-white p-4 rounded shadow-md mb-4">
            <div>
                <label className="block">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <label className="block">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Add Post</button>
        </form>
    );
};

export default AdminBlogForm;
