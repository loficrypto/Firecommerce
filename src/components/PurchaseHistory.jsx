import React from 'react';

const PurchaseHistory = ({ purchases }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-4">Recent Purchases</h2>
        {purchases.length > 0 ? (
            <ul>
                {purchases.map((purchase, index) => (
                    <li key={index} className="border-b py-2">
                        {purchase.productName} - ${purchase.amount} - {purchase.date}
                    </li>
                ))}
            </ul>
        ) : (
            <p>No recent purchases.</p>
        )}
    </div>
);

export default PurchaseHistory;
