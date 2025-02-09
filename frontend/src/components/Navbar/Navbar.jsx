import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Dumbbell, Utensils, MessageSquare, User, LogOut,  } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('userData'));

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <>
            <nav className="navbar position-fixed w-100 d-flex align-items-center justify-content-between" style={{ backgroundColor: '#000', padding: '10px 20px', zIndex: '1000', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                <div className="d-flex align-items-center">
                    <img src="/assets/images/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                </div>
                <div className="d-flex align-items-center ms-auto">
                    <a href="/" className="nav-link me-4" style={{ color: '#fff', textDecoration: 'none' }}>
                        <Home size={20} />
                    </a>
                    <a href="/admin/exercise" className="nav-link me-4" style={{ color: '#fff', textDecoration: 'none' }}>
                        <Dumbbell size={20} />
                    </a>
                    <a href="/admin/meal" className="nav-link me-4" style={{ color: '#fff', textDecoration: 'none' }}>
                        <Utensils size={20} />
                    </a>
                    <a href="/contact-us" className="nav-link me-4" style={{ color: '#fff', textDecoration: 'none' }}>
                        <MessageSquare size={20} />
                    </a>
                </div>
                <div className="d-flex align-items-center">
                    {user ? (
                        <div className="dropdown">
                            <button className="btn btn-dark dropdown-toggle d-flex align-items-center" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff', backgroundColor: '#000', border: '1px solid #fff' }}>
                                <User size={20} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link to={`/get_single_user/${user._id}`} className="dropdown-item d-flex align-items-center">
                                        <User size={16} /> Profile
                                    </Link>
                                </li>
                                
                                <li>
                                    <button onClick={handleLogout} className="dropdown-item d-flex align-items-center">
                                        <LogOut size={16} /> Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to={'/register'} className="btn btn-outline-light me-2 d-flex align-items-center" style={{ fontSize: '14px' }}>
                                <User size={16} />
                            </Link>
                            <Link to={'/login'} className="btn btn-light d-flex align-items-center" style={{ fontSize: '14px' }}>
                                <User size={16} />
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <div style={{ paddingTop: '70px' }}></div>
        </>
    );
};

export default Navbar;
