import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const [user, setUser] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImage, setProductImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                history.push('/login');
            }
        });

        return () => unsubscribe();
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        if (!productImage) {
            setErrorMessage('Please upload a product image');
            return;
        }

        try {
            const storageRef = ref(storage, `products/${productImage.name}`);
            await uploadBytes(storageRef, productImage);
            const imageUrl = await getDownloadURL(storageRef);

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
            setSuccessMessage('Product added successfully!');
        } catch (error) {
            setErrorMessage('Failed to add product');
            console.error("Error adding product", error);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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
