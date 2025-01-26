import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleUser, updateUserApi } from '../../apis/Api';
import { FaUser, FaBirthdayCake, FaVenusMars, FaArrowsAltV, FaWeight } from 'react-icons/fa';
import './UpdateProfile.css';

const UpdateProfile = () => {
    const { _id } = useParams();

    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [genderError, setGenderError] = useState('');

    useEffect(() => {
        getSingleUser(_id)
            .then((res) => {
                const { fname, lname, age, gender, height, weight } = res.data.data;
                setFirstName(fname);
                setLastName(lname);
                setAge(age);
                setGender(gender);
                setHeight(height);
                setWeight(weight);
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, [_id]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('height', height);
        formData.append('weight', weight);

        updateUserApi(_id, formData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                if (error.response.status === 500 || error.response.status === 400) {
                    toast.error(error.response.data.message);
                }
            });
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    return (
        <div className="profile-container mt-5">
            <div className="profile-card shadow-sm p-4">
                <h2 className="text-center mb-4">Update Profile</h2>
                <form onSubmit={handleUpdateProfile}>
                    <div className="profile-update row">
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label>
                                    <FaUser className="icon mr-2" />
                                    First Name
                                </label>
                                <input
                                    value={fname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter first name"
                                />
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label>
                                    <FaUser className="icon mr-2" />
                                    Last Name
                                </label>
                                <input
                                    value={lname}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter last name"
                                />
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label>
                                    <FaBirthdayCake className="icon mr-2" />
                                    Age
                                </label>
                                <input
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter age"
                                />
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label>
                                    <FaVenusMars className="icon mr-2" />
                                    Gender
                                </label>
                                <select
                                    value={gender}
                                    onChange={handleGender}
                                    className="form-control"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {genderError && <p className="text-danger">{genderError}</p>}
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label>
                                    <FaArrowsAltV className="icon mr-2" />
                                    Height (cm)
                                </label>
                                <input
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter height in cm"
                                />
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <label>
                                    <FaWeight className="icon mr-2" />
                                    Weight (kg)
                                </label>
                                <input
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter weight in kg"
                                />
                            </div>
                        </div>

                        <div className="col-12 text-center mt-4">
                            <button type="submit" className="btn black-btn btn-lg w-100">
                                Make Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
