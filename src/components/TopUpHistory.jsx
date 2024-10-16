import React from 'react';

const TopUpHistory = ({ topUps }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-4">Top-Up History</h2>
        {topUps.length > 0 ? (
            <ul>
                {topUps.map((topUp, index) => (
                    <li key={index} className="border-b py-2">
                        {topUp.amount} - {topUp.date}
                    </li>
                ))}
            </ul>
        ) : (
            <p>No top-up history.</p>
        )}
    </div>
);

export default TopUpHistory;
