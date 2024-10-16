import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        history.push('/login');
    };

    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between">
            <Link to="/" className="text-2xl font-bold">My Shop</Link>
            <div>
                <Link to="/shop" className="mr-4">Shop</Link>
                {user ? (
                    <>
                        <Link to="/admin" className="mr-4">Admin</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4">Login</Link>
                        <Link to="/register" className="mr-4">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
