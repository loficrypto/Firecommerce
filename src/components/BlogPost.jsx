import React from 'react';

const BlogPost = ({ post }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <p className="text-gray-500 text-sm">Posted on {new Date(post.date).toLocaleDateString()}</p>
    </div>
);

export default BlogPost;
