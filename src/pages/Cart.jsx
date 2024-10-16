import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, handleRemoveFromCart }) => (
    <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <ul className="space-y-4">
                        {cartItems.map((item, index) => (
                            <li key={index} className="bg-white p-4 rounded shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-semibold">{item.name}</h2>
                                        <p className="text-lg">${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 text-right">
                        <Link to="/checkout" className="bg-blue-500 text-white px-6 py-3 rounded">
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            ) : (
                <p className="text-center">Your cart is empty.</p>
            )}
        </div>
    </div>
);

export default Cart;
