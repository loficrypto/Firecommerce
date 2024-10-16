import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
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

    const handlePurchase = (product) => {
        // Handle product purchase
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Welcome to My Shop</h1>
                <p className="text-lg text-center mb-12">Buy the best digital products with cryptocurrency.</p>
                {loading ? (
                    <p className="text-center">Loading products...</p>
                ) : (
                    <ProductGrid products={products} handlePurchase={handlePurchase} />
                )}
            </div>
        </div>
    );
};

export default Home;
