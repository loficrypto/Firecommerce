import React from 'react';

const WalletBalance = ({ balance }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
        <p className="text-lg">${balance}</p>
    </div>
);

export default WalletBalance;
