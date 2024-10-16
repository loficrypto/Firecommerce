import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user.id} className="border-b py-2 flex justify-between items-center">
                            {user.email}
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default AdminUsers;
