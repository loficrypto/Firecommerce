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
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">My Shop</Link>
            <div className="flex space-x-4">
                <Link to="/shop">Shop</Link>
                {user ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link to="/admin">Admin</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
