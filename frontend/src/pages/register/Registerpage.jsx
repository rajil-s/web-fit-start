import React, { useState } from 'react';
import { registerUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import './Registerpage.css';

const Registerpage = () => {
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        let isValid = true;

        if (fname.trim() === '') {
            setfnameError("First name is required");
            isValid = false;
        } else {
            setfnameError('');
        }

        if (lname.trim() === '') {
            setlnameError("Last name is required");
            isValid = false;
        } else {
            setlnameError('');
        }

        if (email.trim() === '' || !email.includes('@') || !email.includes('.')) {
            setEmailError('Email is invalid or empty');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (phone.trim() === '') {
            setPhoneError("Phone Number is required");
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (height.trim() === '') {
            setHeightError("Height is required");
            isValid = false;
        } else {
            setHeightError('');
        }

        if (weight.trim() === '') {
            setWeightError("Weight is required");
            isValid = false;
        } else {
            setWeightError('');
        }

        if (age.trim() === '') {
            setAgeError("Age is required");
            isValid = false;
        } else {
            setAgeError('');
        }

        if (gender.trim() === '') {
            setGenderError("Gender is required");
            isValid = false;
        } else {
            setGenderError('');
        }

        if (password.trim() === '') {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (confirmPassword.trim() === '') {
            setConfirmPasswordError("Confirm Password is required");
            isValid = false;
        } else if (confirmPassword.trim() !== password.trim()) {
            setConfirmPasswordError("Password and Confirm Password don't match!");
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = {
            fname,
            lname,
            email,
            phone,
            height,
            weight,
            age,
            gender,
            password,
            confirmPassword
        };

        registerUserApi(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate('/login');
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(() => {
                toast.error('Internal Server Error!');
            });
    };

    return (
        <div className='register-container'>
            <div className="register-form-container">
                <h2>Create an Account</h2>
                <form>
                    <p>Let’s get started! Create your personal account.</p>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" placeholder="Enter your first name" className="form-control" onChange={(e) => setfname(e.target.value)} />
                            {fnameError && <p className="text-danger">{fnameError}</p>}
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" placeholder="Enter your last name" className="form-control" onChange={(e) => setlname(e.target.value)} />
                            {lnameError && <p className="text-danger">{lnameError}</p>}
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                            {emailError && <p className="text-danger">{emailError}</p>}
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" placeholder="Enter your phone number" className="form-control" onChange={(e) => setPhone(e.target.value)} />
                            {phoneError && <p className="text-danger">{phoneError}</p>}
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Height (in cm):</label>
                            <input type="number" placeholder="Enter your height" className="form-control" onChange={(e) => setHeight(e.target.value)} />
                            {heightError && <p className="text-danger">{heightError}</p>}
                        </div>
                        <div className="form-group">
                            <label>Weight (in kg):</label>
                            <input type="number" placeholder="Enter your weight" className="form-control" onChange={(e) => setWeight(e.target.value)} />
                            {weightError && <p className="text-danger">{weightError}</p>}
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" placeholder="Enter your age" className="form-control" onChange={(e) => setAge(e.target.value)} />
                            {ageError && <p className="text-danger">{ageError}</p>}
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" onChange={(e) => setGender(e.target.value)} value={gender}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {genderError && <p className="text-danger">{genderError}</p>}
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="password-container form-group">
                            <label>Password:</label>
                            <input type={passwordVisible ? "text" : "password"} placeholder="Enter your password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                            {passwordError && <p className="text-danger">{passwordError}</p>}
                        </div>
                        <div className="password-container form-group">
                            <label>Confirm Password:</label>
                            <input type={passwordVisible ? "text" : "password"} placeholder="Confirm your password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                            {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
                        </div>
                    </div>
                    <button className="btn black-btn" onClick={handleSubmit}>Create Account</button>
                </form>
                <div className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Registerpage;
