import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleUser } from '../../apis/Api';
import { FaUser, FaBirthdayCake, FaVenusMars, FaArrowsAltV, FaWeight } from 'react-icons/fa';
import './Profilepage.css';

const ProfilePage = () => {
    const { _id } = useParams();

    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

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

    return (
        <div className="profile-container mt-5">
            <div className="profile-card shadow-sm p-4">
                <h2 className="text-center mb-4">{fname} {lname}</h2>
                <div className="profile-details row">
                    <div className="col-md-6 mb-3">
                        <div className="profile-info">
                            <FaUser className="icon mr-2" />
                            <strong>First Name: </strong>
                            <p className="ml-2"> {fname}</p>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="profile-info">
                            <FaUser className="icon mr-2" />
                            <strong>Last Name: </strong>
                            <p className="ml-2">{lname}</p>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="profile-info">
                            <FaBirthdayCake className="icon mr-2" />
                            <strong>Age: </strong>
                            <p className="ml-2">{age}</p>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="profile-info">
                            <FaVenusMars className="icon mr-2" />
                            <strong>Gender: </strong>
                            <p className="ml-2">{gender}</p>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="profile-info">
                            <FaArrowsAltV className="icon mr-2" />
                            <strong>Height: </strong>
                            <p className="ml-2">{height} cm</p>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="profile-info">
                            <FaWeight className="icon mr-2" />
                            <strong>Weight: </strong>
                            <p className="ml-2">{weight} kg</p>
                        </div>
                    </div>

                    <div className="col-12 text-center mt-4">
                        <Link to={`/update_profile/${_id}`} className="btn black-btn btn-lg">
                            Update Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
