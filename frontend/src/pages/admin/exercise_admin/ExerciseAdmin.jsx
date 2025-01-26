import React, { useEffect, useState } from 'react';
import { createExerciseApi, deleteExerciseApi, getAllExercises, searchExercise } from '../../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './ExerciseAdmin.css';

const ExerciseAdmin = () => {
    const [exercises, setExercises] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery) {
            searchExercise(searchQuery).then((res) => {
                setExercises(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            getAllExercises().then((res) => {
                setExercises(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [searchQuery]);

    const [exerciseVideo, setExerciseVideo] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseCalories, setExerciseCalories] = useState('');
    const [exerciseTime, setExerciseTime] = useState('');
    const [exerciseLevel, setExerciseLevel] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('exerciseName', exerciseName);
        formData.append('exerciseCalories', exerciseCalories);
        formData.append('exerciseTime', exerciseTime);
        formData.append('exerciseLevel', exerciseLevel);
        formData.append('exerciseReps', exerciseReps);
        formData.append('exerciseSets', exerciseSets);
        formData.append('exerciseDescription', exerciseDescription);
        formData.append('exerciseVideo', exerciseVideo); // Now only handles YouTube URL

        createExerciseApi(formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
                setExercises((prev) => [...prev, res.data.data]);
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.warning(error.response.data.message);
                } else if (error.response.status === 500) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Something went wrong');
                }
            } else {
                toast.error('Something went wrong');
            }
        });
    };

    const handleDelete = (id) => {
        const confirmDialog = window.confirm('Are you sure you want to delete this exercise?');
        if (confirmDialog) {
            deleteExerciseApi(id).then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    setExercises(exercises.filter(exercise => exercise._id !== id));
                }
            }).catch((error) => {
                if (error.res.status === 500) {
                    toast.error(error.res.data.message);
                }
            });
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Trigger the useEffect to call the search API
    };

    return (
        <>
            <div className='container mt-3'>
                <div>
                    <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </form>
                </div>
                <div className="exercise-cards mt-3">
                    {
                        exercises.map((singleExercise) => (
                            <div className="exercise-card" key={singleExercise._id}>
                                <div className="exercise-card-body">
                                    <h5 className="exercise-card-title">{singleExercise.exerciseName}</h5>
                                    <p className="exercise-card-text">Time: {singleExercise.exerciseTime} min</p>
                                    <p className="exercise-card-text">Calories: {singleExercise.exerciseCalories}</p>
                                    <p className="exercise-card-text">Level: {singleExercise.exerciseLevel}</p>
                                    <p className="exercise-card-text">Video:</p>
                                    <iframe 
                                        width="100%" 
                                        height="150" 
                                        src={singleExercise.exerciseVideo} 
                                        title="Exercise Video" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen>
                                    </iframe>
                                    <div className="exercise-card-actions">
                                        <Link to={`/admin/update_exercise/${singleExercise._id}`} className="btn btn-edit">Edit</Link>
                                        <button onClick={() => handleDelete(singleExercise._id)} className="btn btn-delete">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <button type="button" className="btn btn-add-exercise" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    +
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new exercise</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body modal-body-scrollable">
                                <form>
                                    <label>Exercise Name</label>
                                    <input onChange={(e) => setExerciseName(e.target.value)} type="text" className='form-control' placeholder='Enter exercise name'></input>
                                    <label className='mt-2'>Exercise Time</label>
                                    <input onChange={(e) => setExerciseTime(e.target.value)} type="number" className='form-control' placeholder='Enter exercise time'></input>
                                    <label className='mt-2'>Exercise Calories</label>
                                    <input onChange={(e) => setExerciseCalories(e.target.value)} type="number" className='form-control' placeholder='Enter exercise calories'></input>
                                    <label className='mt-2'>Choose Exercise Level</label>
                                    <select onChange={(e) => setExerciseLevel(e.target.value)} className='form-control'>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Amateur">Amateur</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Elite">Elite</option>
                                    </select>
                                    <label className='mt-2'>Exercise Reps</label>
                                    <input onChange={(e) => setExerciseReps(e.target.value)} type="number" className='form-control' placeholder='Enter exercise reps'></input>
                                    <label className='mt-2'>Exercise Sets</label>
                                    <input onChange={(e) => setExerciseSets(e.target.value)} type="number" className='form-control' placeholder='Enter exercise sets'></input>
                                    <label className='mt-2'>Exercise Description</label>
                                    <textarea onChange={(e) => setExerciseDescription(e.target.value)} className='form-control' placeholder='Enter exercise description'></textarea>
                                    <label className='mt-2'>Exercise Video (YouTube URL)</label>
                                    <input onChange={(e) => setExerciseVideo(e.target.value)} type='text' className='form-control' placeholder='Enter YouTube video URL'></input>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleSubmit} type="button" className="btn black-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ExerciseAdmin;
