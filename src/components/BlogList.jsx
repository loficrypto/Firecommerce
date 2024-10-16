import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BlogPost from './BlogPost';

const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsSnapshot = await getDocs(collection(db, 'blogPosts'));
            setPosts(postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <BlogPost key={post.id} {...post} />
                    ))
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>
        </div>
    );
};

export default BlogList;
