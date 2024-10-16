import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsSnapshot = await getDocs(collection(db, 'blogPosts'));
            setPosts(postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchPosts();
    }, []);

    const handleAddPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = '';
            if (image) {
                const imageRef = ref(storage, `blog/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, 'blogPosts'), {
                title,
                content,
                imageUrl
            });

            setTitle('');
            setContent('');
            setImage(null);
            setLoading(false);
            alert('Blog post added successfully');
        } catch (error) {
            console.error("Error adding blog post", error);
            setLoading(false);
            alert('Failed to add blog post');
        }
    };

    const handleDeletePost = async (id, imageUrl) => {
        try {
            await deleteDoc(doc(db, 'blogPosts', id));
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting blog post", error);
            alert('Failed to delete blog post');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
                <form onSubmit={handleAddPost} className="bg-white p-8 rounded shadow-md mb-8">
                    <div className="mb-4">
                        <label className="block">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Post'}
                    </button>
                </form>
                {posts.length > 0 ? (
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id} className="border-b py-4">
                                <h2 className="text-2xl font-semibold">{post.title}</h2>
                                <p>{post.content}</p>
                                {post.imageUrl && (
                                    <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded mt-4" />
                                )}
                                <button
                                    onClick={() => handleDeletePost(post.id, post.imageUrl)}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
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
        </div>
    );
};

export default Blog;
