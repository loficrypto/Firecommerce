import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { useHistory } from 'react-router-dom';
import { sendEmail } from '../utils/emailService';

const Checkout = ({ cartItems }) => {
    const [form, setForm] = useState({ name: '', email: '', address: '' });
    const [loading, setLoading] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchWalletBalance = async () => {
            if (auth.currentUser) {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setWalletBalance(userDoc.data().walletBalance);
                }
            } else {
                history.push('/login');
            }
        };

        fetchWalletBalance();
    }, [history]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
        if (walletBalance < totalAmount) {
            setError('Insufficient wallet balance. Please top-up your wallet.');
            setLoading(false);
            return;
        }

        try {
            // Create an order
            const order = {
                userId: auth.currentUser.uid,
                items: cartItems,
                totalAmount,
                date: new Date().toISOString()
            };
            await addDoc(collection(db, 'orders'), order);

            // Deduct the total amount from the wallet balance
            const newBalance = walletBalance - totalAmount;
            await updateDoc(doc(db, 'users', auth.currentUser.uid), { walletBalance: newBalance });

            // Send product download links via email
            const productLinks = await Promise.all(cartItems.map(async (item) => {
                const productRef = ref(storage, item.imageUrl);
                const downloadURL = await getDownloadURL(productRef);
                return `${item.name}: ${downloadURL}`;
            }));

            const emailContent = `
                Dear ${form.name},
                Thank you for your purchase! Here are your product download links:
                ${productLinks.join('\n')}
            `;

            await sendEmail(form.email, 'Your Purchase - Product Download Links', emailContent);

            // Clear cart and show success message
            cartItems.length = 0;
            setSuccessMessage('Purchase successful! Your order has been placed. Check your email for download links.');
        } catch (error) {
            setError('Failed to complete purchase. Please try again.');
            console.error("Error during checkout:", error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleCheckout} className="bg-white p-8 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mt-8 text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Complete Purchase'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
