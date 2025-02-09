import React, { useEffect, useState } from 'react';
import { getAllExercises, addPointsApi } from '../../../apis/Api';
import { FaBurn, FaClock, FaFilter, FaInfoCircle, FaCheckCircle, FaPause, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ExerciseUser.css';
import { FaStairs } from 'react-icons/fa6';

const UserExercise = () => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showTimerPopup, setShowTimerPopup] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        getAllExercises()
            .then((res) => {
                setExercises(res.data.data);
                setFilteredExercises(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleLevelChange = (e) => {
        const level = e.target.value;
        setSelectedLevel(level);
        if (level === 'All') {
            setFilteredExercises(exercises);
        } else {
            setFilteredExercises(exercises.filter((exercise) => exercise.exerciseLevel === level));
        }
    };

    const handleShowModal = (exercise) => {
        setSelectedExercise(exercise);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedExercise(null);
    };

    // ✅ Start Timer
    const handleStartTimer = (exercise) => {
        setSelectedExercise(exercise);
        const duration = parseInt(exercise.exerciseTime) * 60; // Convert minutes to seconds
        setTimeLeft(duration);
        setShowTimerPopup(true);
        setIsPaused(false);
        setTimerActive(true);
    };

    // ✅ Cancel Timer
    const handleCancelTimer = () => {
        setShowTimerPopup(false);
        setSelectedExercise(null);
        setTimeLeft(0);
        setIsPaused(false);
        setTimerActive(false);
    };

    // ✅ Pause/Resume Timer
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    // ✅ Award Points
    const handleCompleteExercise = async () => {
        const pointsEarned = 10;

        const response = await addPointsApi(pointsEarned);

        if (response.success) {
            toast.success(`Exercise completed! +${pointsEarned} points`);
        } else {
            toast.error("Failed to add points. Try again.");
        }

        setShowTimerPopup(false);
        setSelectedExercise(null);
        setTimeLeft(0);
        setTimerActive(false);
    };

    // ✅ Timer Countdown Logic
    useEffect(() => {
        let timer;
        if (timerActive && !isPaused && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0 && timerActive) {
            handleCompleteExercise();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, isPaused, timerActive]);

    // ✅ Format Time (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="container mt-3">
            <div className="filter-section mb-3">
                <label htmlFor="levelFilter" className="form-label">
                    <FaFilter /> Filter Exercises by Level:
                </label>
                <select
                    id="levelFilter"
                    className="form-select"
                    value={selectedLevel}
                    onChange={handleLevelChange}
                >
                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Amateur">Amateur</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Elite">Elite</option>
                </select>
            </div>

            <div className="exercise-cards mt-3">
                {filteredExercises.map((singleExercise) => (
                    <div className="exercise-card" key={singleExercise._id}>
                        <div className="exercise-card-body">
                            <h5 className="exercise-card-title">{singleExercise.exerciseName}</h5>
                            <p className="exercise-card-text">
                                <FaClock /> Time: {singleExercise.exerciseTime} min
                            </p>
                            <p className="exercise-card-text">
                                <FaBurn /> Calories: {singleExercise.exerciseCalories}
                            </p>
                            <p className="exercise-card-text">
                                <FaStairs /> Level: {singleExercise.exerciseLevel}
                            </p>
                            {/* ✅ Video Preview */}
                            <div className="exercise-card-video mt-2">
                                <iframe
                                    width="100%"
                                    height="150"
                                    src={singleExercise.exerciseVideo}
                                    title={singleExercise.exerciseName}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="exercise-card-actions mt-3">
                                <button
                                    className="btn black-btn btn-details"
                                    onClick={() => handleShowModal(singleExercise)}
                                >
                                    <FaInfoCircle /> Details
                                </button>
                                {/* ✅ Start Timer Button */}
                                <button
                                    className="btn success-btn btn-done"
                                    onClick={() => handleStartTimer(singleExercise)}
                                >
                                    <FaCheckCircle /> Start Exercise
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Timer Popup */}
            {showTimerPopup && selectedExercise && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Exercise Timer</h2>
                        <p>🏋️ {selectedExercise.exerciseName}</p>
                        <h3>{formatTime(timeLeft)}</h3>
                        <div className="modal-buttons">
                            <button className="btn btn-warning" onClick={handlePauseResume}>
                                {isPaused ? "Resume" : "Pause"} <FaPause />
                            </button>
                            <button className="btn btn-danger" onClick={handleCancelTimer}>
                                Cancel <FaTimes />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Exercise Details Modal */}
            {showModal && selectedExercise && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog custom-modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedExercise.exerciseName}</h5>
                            </div>
                            <div className="modal-body">
                                <p><strong>Description:</strong> {selectedExercise.exerciseDescription}</p>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={selectedExercise.exerciseVideo}
                                    title={selectedExercise.exerciseName}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
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

export default UserExercise;
