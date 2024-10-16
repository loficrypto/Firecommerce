import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';

            if (image) {
                const imageRef = ref(storage, `products/${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, 'products'), {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
            });

            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error('Error adding product:', error);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <div className="mb-4">
                <label className="block">Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 rounded w-full"
                    step="0.01"
                />
            </div>
            <div className="mb-4">
                <label className="block">Product Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
            </button>
        </form>
    );
};

export default ProductForm;
