import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleExercise, updateExerciseApi } from '../../../apis/Api';
import './UpdateExercise.css';

const UpdateExercise = () => {
    const { id } = useParams();

    useEffect(() => {
        getSingleExercise(id)
            .then((res) => {
                setExerciseName(res.data.data.exerciseName);
                setExerciseTime(res.data.data.exerciseTime);
                setExerciseCalories(res.data.data.exerciseCalories);
                setExerciseLevel(res.data.data.exerciseLevel);
                setExerciseReps(res.data.data.exerciseReps);
                setExerciseSets(res.data.data.exerciseSets);
                setExerciseDescription(res.data.data.exerciseDescription);
                setExerciseVideo(res.data.data.exerciseVideo); // Pre-fill the form with the existing video URL
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const [exerciseName, setExerciseName] = useState('');
    const [exerciseTime, setExerciseTime] = useState('');
    const [exerciseCalories, setExerciseCalories] = useState('');
    const [exerciseLevel, setExerciseLevel] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [exerciseVideo, setExerciseVideo] = useState(''); // Stores the video URL

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = {
            exerciseName,
            exerciseTime,
            exerciseCalories,
            exerciseLevel,
            exerciseReps,
            exerciseSets,
            exerciseDescription,
            exerciseVideo, // Updated video URL
        };

        updateExerciseApi(id, formData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    toast.error(error.response.data.message);
                } else if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                }
            });
    };

    return (
        <div className='update-exercise-container mt-3'>
            <h2>Update Exercise: {exerciseName}</h2>
            <div className='form-container'>
                <form>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label>Exercise Name</label>
                            <input
                                value={exerciseName}
                                onChange={(e) => setExerciseName(e.target.value)}
                                className='form-control'
                                type='text'
                                placeholder='Enter exercise name'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Exercise Time</label>
                            <input
                                value={exerciseTime}
                                onChange={(e) => setExerciseTime(e.target.value)}
                                className='form-control'
                                type='number'
                                placeholder='Enter exercise time'
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label>Exercise Calories</label>
                            <input
                                value={exerciseCalories}
                                onChange={(e) => setExerciseCalories(e.target.value)}
                                className='form-control'
                                type='number'
                                placeholder='Enter exercise calories'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Choose Level</label>
                            <select
                                value={exerciseLevel}
                                onChange={(e) => setExerciseLevel(e.target.value)}
                                className='form-control'
                            >
                                <option value='Beginner'>Beginner</option>
                                <option value='Amateur'>Amateur</option>
                                <option value='Advanced'>Advanced</option>
                                <option value='Elite'>Elite</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label>Exercise Reps</label>
                            <input
                                value={exerciseReps}
                                onChange={(e) => setExerciseReps(e.target.value)}
                                className='form-control'
                                type='number'
                                placeholder='Enter exercise reps'
                            />
                        </div>
                        <div className='form-group'>
                            <label>Exercise Sets</label>
                            <input
                                value={exerciseSets}
                                onChange={(e) => setExerciseSets(e.target.value)}
                                className='form-control'
                                type='number'
                                placeholder='Enter exercise sets'
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label>Exercise Description</label>
                            <textarea
                                value={exerciseDescription}
                                onChange={(e) => setExerciseDescription(e.target.value)}
                                className='form-control'
                                placeholder='Enter exercise description'
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-group'>
                            <label>Exercise Video (YouTube URL)</label>
                            <input
                                value={exerciseVideo}
                                onChange={(e) => setExerciseVideo(e.target.value)}
                                className='form-control'
                                type='text'
                                placeholder='Enter YouTube video URL'
                            />
                        </div>
                    </div>
                    <button onClick={handleUpdate} className='btn black-btn w-100 mt-2'>
                        Update Exercise
                    </button>
                </form>
                <div className='preview-section mt-3'>
                    <h6>Preview Current Video</h6>
                    {exerciseVideo && (
                        <iframe
                            width="100%"
                            height="315"
                            src={exerciseVideo}
                            title="Current Exercise Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateExercise;
