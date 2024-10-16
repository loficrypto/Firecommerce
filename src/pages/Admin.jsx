import React from 'react';
import AdminOrders from '../components/AdminOrders';
import AdminProducts from '../components/AdminProducts';
import AdminUsers from '../components/AdminUsers';
import AdminEmails from '../components/AdminEmails';

const Admin = () => (
    <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
            <AdminOrders />
            <AdminProducts />
            <AdminUsers />
            <AdminEmails />
        </div>
    </div>
);

export default Admin;
