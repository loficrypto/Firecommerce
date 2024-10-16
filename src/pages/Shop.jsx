import React, { useState, useEffect } from 'react';
import { createInvoice } from '../utils/apirone';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        };
        fetchProducts();
    }, []);

    const handlePurchase = async (product) => {
        const invoice = await createInvoice('USDT', product.price, 'https://your-callback-url.com');
        // Handle the invoice
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Shop</h1>
            {/* List and select products */}
            {products.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow mb-4">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    <p className="text-lg">{product.description}</p>
                    <button
                        onClick={() => handlePurchase(product)}
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Buy with USDT
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Shop;
