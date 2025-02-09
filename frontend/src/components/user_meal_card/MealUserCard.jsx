import React, { useState } from 'react';
import './MealUserCard.css';
import { FaClock, FaInfoCircle } from 'react-icons/fa';

const MealUserCard = ({ mealInformation }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <div className="card custom-card" style={{ width: '18rem' }}>
                <img 
                    src={`http://localhost:5000/products/${mealInformation.mealImage}`} 
                    className="card-img-top custom-card-img" 
                    alt={mealInformation.mealName}
                />
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{mealInformation.mealName}</h5>
                        <h5 className="card-title text-muted"><FaClock/> {mealInformation.mealTime} min</h5>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column align-items-center">
                            <span>{mealInformation.mealProteins}g</span>
                            <span>Proteins</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <span>{mealInformation.mealCalories}</span>
                            <span>Calories</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <span>{mealInformation.mealCarbs}g</span>
                            <span>Carbs</span>
                        </div>
                    </div>
                    <button className="btn btn-outline-dark w-100 mt-2" onClick={handleShowModal}>
                        <FaInfoCircle/> Details
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{mealInformation.mealName}</h5>
                                <button type="button" className="close-btn" onClick={handleCloseModal}>×</button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-body-content">
                                    <img 
                                        src={`http://localhost:5000/products/${mealInformation.mealImage}`} 
                                        className="modal-img" 
                                        alt={mealInformation.mealName}
                                    />
                                    <div className="modal-description">
                                        <p>{mealInformation.mealDescription}</p>
                                        <div className="nutritional-info">
                                            <div className="info-item">
                                                <h6>Proteins:</h6>
                                                <p>{mealInformation.mealProteins}g</p>
                                            </div>
                                            <div className="info-item">
                                                <h6>Calories:</h6>
                                                <p>{mealInformation.mealCalories}</p>
                                            </div>
                                            <div className="info-item">
                                                <h6>Carbs:</h6>
                                                <p>{mealInformation.mealCarbs}g</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>        
    );
};

export default MealUserCard;
