import React, { useState, useEffect } from 'react';
import { auth, db, getUserBalance, updateUserBalance } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);
    const [topupAmount, setTopupAmount] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userBalance = await getUserBalance(currentUser.uid);
                setBalance(userBalance);
            } else {
                history.push('/login');
            }
        });

        return () => unsubscribe();
    }, [history]);

    const handleTopup = async () => {
        const newBalance = balance + Number(topupAmount);
        await updateUserBalance(user.uid, newBalance);
        setBalance(newBalance);
        setTopupAmount(0);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-4">Hello, {user.email}</h2>
                <p className="mb-4">Balance: ${balance}</p>
                <div className="mb-4">
                    <label className="block mb-2">Top-up Amount</label>
                    <input
                        type="number"
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button onClick={handleTopup} className="bg-blue-500 text-white py-2 px-4 rounded">Top-up</button>
            </div>
        </div>
    );
};

export default UserProfile;
