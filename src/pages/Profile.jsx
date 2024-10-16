import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import ProfileDetails from '../components/ProfileDetails';
import PurchaseHistory from '../components/PurchaseHistory';
import TopUpHistory from '../components/TopUpHistory';
import WalletBalance from '../components/WalletBalance';
import Transactions from '../components/Transactions';
import { createInvoice, checkPaymentStatus, forwardPayment } from '../utils/apirone';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({
        purchases: [],
        topUps: [],
        transactions: [],
        walletBalance: 0,
    });
    const [topUpAmount, setTopUpAmount] = useState('');
    const [topUpCurrency, setTopUpCurrency] = useState('usdt');
    const [loading, setLoading] = useState(false);
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

    const handleTopUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const callbackUrl = `${window.location.origin}/api/topup-callback`;
            const { id, address } = await createInvoice(parseFloat(topUpAmount), topUpCurrency, callbackUrl);
            alert(`Please send ${topUpAmount} ${topUpCurrency.toUpperCase()} to the following address: ${address}`);
            // Wait for the payment to be confirmed and forwarded
            const interval = setInterval(async () => {
                const status = await checkPaymentStatus(id);
                if (status.paid) {
                    await forwardPayment(id, 'your-destination-address');
                    clearInterval(interval);
                    const newBalance = profileData.walletBalance + parseFloat(topUpAmount);
                    await updateDoc(doc(db, 'users', auth.currentUser.uid), { walletBalance: newBalance });
                    setProfileData((prevData) => ({ ...prevData, walletBalance: newBalance }));
                    setTopUpAmount('');
                    setTopUpCurrency('usdt');
                    setLoading(false);
                    alert('Top-up successful!');
                }
            }, 10000); // Check every 10 seconds
        } catch (error) {
            console.error("Error during top-up", error);
            setLoading(false);
            alert('Top-up failed. Please try again.');
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
                <ProfileDetails user={user} />
                <WalletBalance balance={profileData.walletBalance} />
                <form onSubmit={handleTopUp} className="mt-4">
                    <div>
                        <label className="block">Top-Up Amount</label>
                        <input
                            type="number"
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                            className="border p-2 rounded w-full"
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block">Currency</label>
                        <select
                            value={topUpCurrency}
                            onChange={(e) => setTopUpCurrency(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="usdt">USDT</option>
                            <option value="btc">BTC</option>
                            <option value="ltc">LTC</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Top-Up Wallet'}
                        </button>
                    </div>
                </form>
                <PurchaseHistory purchases={profileData.purchases} />
                <TopUpHistory topUps={profileData.topUps} />
                <Transactions transactions={profileData.transactions} />
            </div>
        </div>
    );
};

export default Profile;
