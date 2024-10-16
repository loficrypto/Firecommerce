import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './index.css';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" component={Shop} />
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
