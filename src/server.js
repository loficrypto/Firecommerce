const express = require('express');
const bodyParser = require('body-parser');
const { getFirestore, doc, getDoc, updateDoc } = require('firebase/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-firebase-service-account-file.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
const app = express();
app.use(bodyParser.json());

app.post('/api/topup-callback', async (req, res) => {
    try {
        const { id, paid, amount, currency } = req.body;

        if (paid) {
            const userId = id.split('-')[0]; // Adjust this based on your invoice ID format
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const newBalance = userDoc.data().walletBalance + amount;
                await updateDoc(userDocRef, { walletBalance: newBalance });
                res.status(200).send('Top-up successful');
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(400).send('Payment not completed');
        }
    } catch (error) {
        console.error("Error in top-up callback", error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
