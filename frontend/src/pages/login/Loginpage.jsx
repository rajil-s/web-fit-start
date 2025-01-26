import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../apis/Api';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import './Loginpage.css';

const Loginpage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validation = () => {
        let isValid = true;
        if (email.trim() === '' || !email.includes('@') || !email.includes('.')) {
            setEmailError('Email is invalid or empty');
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidated = validation();
        if (!isValidated) return;

        const data = { email, password };

        loginUserApi(data).then((res) => {
            if (!res.data.success) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userData', JSON.stringify(res.data.userData));
                navigate('/');
            }
        });
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="logo-container">
                    <img src="assets/images/logo.png" alt="Logo" />
                    <h2>FIT START</h2>
                </div>
                <form className="login-form">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                    {emailError && <p className="text-danger">{emailError}</p>}

                    <label>Password</label>
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                        {passwordVisible ? (
                            <EyeInvisibleFilled className="password-toggle-icon" onClick={() => setPasswordVisible(false)} />
                        ) : (
                            <EyeFilled className="password-toggle-icon" onClick={() => setPasswordVisible(true)} />
                        )}
                    </div>
                    {passwordError && <p className="text-danger">{passwordError}</p>}

                    <button onClick={handleSubmit} className="btn black-btn">Log In</button>
                </form>
                <div className="form-options">
                    <a href="/forgot_password" className="forgot-password">Forgot password?</a>
                </div>
                <div className="signup-link">
                    Don't have an account? <a href="/register">Sign Up</a>
                </div>
                
                
            </div>
        </div>
    );
};

export default Loginpage;
