import React, { useState } from 'react';
import ProductManagement from '../components/ProductManagement';
import OrderManagement from '../components/OrderManagement';
import UserManagement from '../components/UserManagement';
import EmailSystem from '../components/EmailSystem';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('products');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'products':
                return <ProductManagement />;
            case 'orders':
                return <OrderManagement />;
            case 'users':
                return <UserManagement />;
            case 'emails':
                return <EmailSystem />;
            default:
                return <ProductManagement />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
                <div className="flex justify-around mb-8">
                    <button onClick={() => setActiveTab('products')} className="btn">Manage Products</button>
                    <button onClick={() => setActiveTab('orders')} className="btn">Manage Orders</button>
                    <button onClick={() => setActiveTab('users')} className="btn">Manage Users</button>
                    <button onClick={() => setActiveTab('emails')} className="btn">Send Emails</button>
                </div>
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default Admin;
