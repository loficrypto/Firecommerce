import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminBlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleAddPost = async (e) => {
        e.preventDefault();
        if (!image) return;

        try {
            const imageRef = ref(storage, `blog/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            await addDoc(collection(db, 'posts'), {
                title,
                content,
                imageUrl,
                date: new Date().toISOString()
            });

            setTitle('');
            setContent('');
            setImage(null);
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
            <div>
                <label className="block">Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Add Blog Post</button>
        </form>
    );
};

export default AdminBlogForm;
