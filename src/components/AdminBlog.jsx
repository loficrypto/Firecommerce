import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import AdminBlogForm from './AdminBlogForm';

const AdminBlog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsSnapshot = await getDocs(collection(db, 'posts'));
            setPosts(postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id, imageUrl) => {
        try {
            await deleteDoc(doc(db, 'posts', id));
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Blog Posts</h2>
            <AdminBlogForm />
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id} className="border-b py-2 flex justify-between items-center">
                            {post.title}
                            <button
                                onClick={() => handleDelete(post.id, post.imageUrl)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blog posts found.</p>
            )}
        </div>
    );
};

export default AdminBlog;
