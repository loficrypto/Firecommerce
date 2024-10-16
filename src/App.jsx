import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Navbar from './components/Navbar';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './index.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const handleRemoveFromCart = (index) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newCartItems);
    };

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop">
                    <Shop handleAddToCart={handleAddToCart} />
                </Route>
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/cart">
                    <Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
                </Route>
                <Route path="/checkout">
                    <Checkout cartItems={cartItems} />
                </Route>
                <Route path="/blog" component={Blog} />
                <Route path="/blog/:id" component={BlogPost} />
            </Switch>
        </Router>
    );
};

export default App;
