import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter(product => product.id !== productId));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="border-b py-2 flex justify-between items-center">
                        <div>
                            <p>{product.name}</p>
                            <p>${product.price}</p>
                        </div>
                        <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
