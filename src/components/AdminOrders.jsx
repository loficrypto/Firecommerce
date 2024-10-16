import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersSnapshot = await getDocs(collection(db, 'orders'));
            setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id} className="border-b py-2">
                            Order ID: {order.id} - User ID: {order.userId} - Total: ${order.totalAmount}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default AdminOrders;
