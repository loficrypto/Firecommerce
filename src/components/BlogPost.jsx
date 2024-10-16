import React from 'react';

const BlogPost = ({ title, content, author, date }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 mt-2">{content}</p>
        <div className="text-sm text-gray-500 mt-4">
            <span>By: {author}</span> | <span>{date}</span>
        </div>
    </div>
);

export default BlogPost;
