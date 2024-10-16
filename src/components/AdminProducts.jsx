import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import AdminProductForm from './AdminProductForm';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsSnapshot = await getDocs(collection(db, 'products'));
            setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id, imageUrl) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <AdminProductForm />
            {products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id} className="border-b py-2 flex justify-between items-center">
                            {product.name} - ${product.price}
                            <button
                                onClick={() => handleDelete(product.id, product.imageUrl)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default AdminProducts;
