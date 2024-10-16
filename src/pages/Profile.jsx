import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import ProfileDetails from '../components/ProfileDetails';
import PurchaseHistory from '../components/PurchaseHistory';
import TopUpHistory from '../components/TopUpHistory';
import WalletBalance from '../components/WalletBalance';
import Transactions from '../components/Transactions';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({
        purchases: [],
        topUps: [],
        transactions: [],
        walletBalance: 0,
    });
    const history = useHistory();

    useEffect(() => {
        const fetchProfileData = async () => {
            if (auth.currentUser) {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setProfileData(userDoc.data());
                }
                setUser(auth.currentUser);
            } else {
                history.push('/login');
            }
        };

        fetchProfileData();
    }, [history]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
                <ProfileDetails user={user} />
                <WalletBalance balance={profileData.walletBalance} />
                <PurchaseHistory purchases={profileData.purchases} />
                <TopUpHistory topUps={profileData.topUps} />
                <Transactions transactions={profileData.transactions} />
            </div>
        </div>
    );
};

export default Profile;
