import React from 'react';

const Transactions = ({ transactions }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
        {transactions.length > 0 ? (
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} className="border-b py-2">
                        {transaction.type}: ${transaction.amount} - {transaction.date}
                    </li>
                ))}
            </ul>
        ) : (
            <p>No transactions.</p>
        )}
    </div>
);

export default Transactions;
