import React, { useState, useEffect } from 'react';
import { createInvoice } from '../utils/apirone';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductGrid from '../components/ProductGrid';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
            setLoading(false);
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
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <ProductGrid products={products} handlePurchase={handlePurchase} />
            )}
        </div>
    );
};

export default Shop;
