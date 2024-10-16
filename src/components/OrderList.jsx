import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersList);
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id} className="border-b py-2">
                        {order.items.map((item, index) => (
                            <div key={index}>
                                <p>Product: {item.name}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                        ))}
                        <p>Total: ${order.totalAmount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
