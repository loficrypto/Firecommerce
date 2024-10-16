import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';

const AdminBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsSnapshot = await getDocs(collection(db, 'blogPosts'));
            setPosts(postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchPosts();
    }, []);

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'blogPosts'), {
                title,
                content,
                author,
                date: new Date().toISOString()
            });
            setTitle('');
            setContent('');
            setAuthor('');
            alert('Blog post added successfully');
        } catch (error) {
            console.error("Error adding blog post", error);
            alert('Failed to add blog post');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'blogPosts', id));
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting blog post", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Blog</h2>
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
                    <label className="block">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Add Post</button>
            </form>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id} className="border-b py-2 flex justify-between items-center">
                            {post.title} by {post.author}
                            <button
                                onClick={() => handleDelete(post.id)}
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
