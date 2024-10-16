Let's go through a detailed overview of your ecommerce project, which includes functionalities like a user-friendly shopping experience, wallet top-up with cryptocurrency, admin panel, email notifications, and a blog section.

# Project Overview

## Ecommerce Shop with Admin Panel

- Home Page: Showcases featured products and allows users to browse various categories.

- Shop Page: Displays a grid of all available products with options to add to cart.

- Product Details: Provides detailed information about individual products.

- Cart: Users can view and manage items they intend to purchase.

- Checkout: Processes the purchase, deducting the amount from the user's wallet balance.

- User Profile Management

- Profile Details: Displays user information.

- Wallet Balance: Shows the current balance, allows users to top up their wallet using cryptocurrency.

- Purchase History: Lists recent purchases with download links for digital products.

- Top-Up History: Records all wallet top-up transactions.

- Transactions: Displays all user transactions, both purchases, and top-ups.

### Admin Panel

- Manage Orders: Admins can view and manage all orders placed by users.

- Manage Products: Admins can add new products, update existing ones, or delete products.

- Manage Users: Admins can view and manage all registered users.

- Send Emails: Admins can send email notifications to users using Brevo's SMTP.

### Automated Email Notifications

- Order Confirmation: Sends an email with product download links upon successful purchase.

### Blog

- Posts Management: Admins can create, update, or delete blog posts.

- Image Upload: Blog posts can include images stored in Firebase Storage.

### Key Technologies
- Frontend: React with Vite and Tailwind CSS for a responsive and modern design.

- Backend: Firebase for authentication, Firestore for database management, Firebase Storage for file uploads.

- Email Service: Brevo's SMTP integrated with Nodemailer for sending email notifications.

- Payment Integration: Apirone API for handling cryptocurrency transactions.

### Project Directory Structure

src/
├── components/
│   ├── AdminEmails.jsx
│   ├── AdminOrders.jsx
│   ├── AdminProductForm.jsx
│   ├── AdminProducts.jsx
│   ├── AdminUsers.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── ProfileDetails.jsx
│   ├── PurchaseHistory.jsx
│   ├── TopUpHistory.jsx
│   ├── Transactions.jsx
├── pages/
│   ├── Admin.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   ├── Shop.jsx
├── utils/
│   ├── apirone.js
│   ├── emailService.js
├── firebase.js
├── index.css
├── main.jsx


### Firebase Firestore Rules

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Callback server.js

```js
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
```
### Database Structure for React Project
Users Collection
```
users (collection)
  ├── userId1 (document)
  │   ├── email: "user1@example.com"
  │   ├── walletBalance: 100.0
  │   ├── purchases: [ { productId: "productId1", date: "2023-01-01" } ]
  │   ├── topUps: [ { amount: 50.0, date: "2023-01-01" } ]
  │   ├── transactions: [ { amount: 50.0, date: "2023-01-01" } ]
  ├── userId2 (document)
  │   ├── ...
  
products (collection)
  ├── productId1 (document)
  │   ├── name: "Product 1"
  │   ├── description: "Description 1"
  │   ├── price: 20.0
  │   ├── imageUrl: "url_to_image"
  │   ├── productFile: "url_to_file"
  ├── productId2 (document)
  │   ├── ...

orders (collection)
  ├── orderId1 (document)
  │   ├── userId: "userId1"
  │   ├── items: [ { productId: "productId1", quantity: 1 } ]
  │   ├── totalAmount: 20.0
  │   ├── date: "2023-01-01"
  ├── orderId2 (document)
  │   ├── ...

blogPosts (collection)
  ├── postId1 (document)
  │   ├── title: "Post 1"
  │   ├── content: "Content 1"
  │   ├── imageUrl: "url_to_image"
  ├── postId2 (document)
  │   ├── ...
```
