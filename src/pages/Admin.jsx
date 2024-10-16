import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Admin = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImage, setProductImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productImage) return;

        // Upload image to Firebase Storage
        const storageRef = ref(storage, `products/${productImage.name}`);
        await uploadBytes(storageRef, productImage);
        const imageUrl = await getDownloadURL(storageRef);

        // Add product to Firestore
        await addDoc(collection(db, 'products'), {
            name: productName,
            description: productDescription,
            price: productPrice,
            imageUrl
        });

        setProductName('');
        setProductDescription('');
        setProductPrice(0);
        setProductImage(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div>
                    <label className="block">Product Name</label>
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mt-4">
                    <label className="block">Product Description</label>
                    <textarea 
                        value={productDescription} 
                        onChange={(e) => setProductDescription(e.target.value)} 
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mt-4">
                    <label className="block">Product Price</label>
                    <input 
                        type="number" 
                        value={productPrice} 
                        onChange={(e) => setProductPrice(Number(e.target.value))} 
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mt-4">
                    <label className="block">Product Image</label>
                    <input 
                        type="file" 
                        onChange={(e) => setProductImage(e.target.files[0])} 
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add Product</button>
            </form>
        </div>
    );
};

export default Admin;
