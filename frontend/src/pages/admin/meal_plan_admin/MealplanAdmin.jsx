import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { createMealApi, deleteMealApi, getAllMeals, searchMeal } from '../../../apis/Api';
import './MealplanAdmin.css';

const MealplanAdmin = () => {
    const [meals, setMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery) {
            searchMeal(searchQuery).then((res) => {
                setMeals(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            getAllMeals().then((res) => {
                setMeals(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [searchQuery]);


    const [mealImage, setMealImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const [mealName, setMealName] = useState('');
    const [mealDescription, setMealDescription] = useState('');
    const [mealCalories, setMealCalories] = useState('');
    const [mealProteins, setMealProteins] = useState('');
    const [mealCarbs, setMealCarbs] = useState('');
    const [mealTime, setMealTime] = useState('');

    const handleImage = (e) => {
        const file = e.target.files[0];
        setMealImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('mealName', mealName);
        formData.append('mealDescription', mealDescription);
        formData.append('mealCalories', mealCalories);
        formData.append('mealProteins', mealProteins);
        formData.append('mealCarbs', mealCarbs);
        formData.append('mealTime', mealTime);
        formData.append('mealImage', mealImage);

        console.log(formData.get('mealImage'));

        createMealApi(formData).then((res) => {
            if (res.status === 201) {
                toast.success(res.data.message);
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
        const confirmDialog = window.confirm('Are you sure you want to delete this meal?');
        if (confirmDialog) {
            deleteMealApi(id).then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    setMeals(meals.filter(meal => meal._id !== id));
                }
            }).catch((error) => {
                if (error.res.status === 500){
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
                <div className='meal-cards mt-3'>
                    {
                        meals.map((singleMeal) => (
                            <div className="meal-card" key={singleMeal._id}>
                                <img src={`http://localhost:5000/products/${singleMeal.mealImage}`} alt='' className="meal-card-img"/>
                                <div className="meal-card-body">
                                    <h5 className="meal-card-title">{singleMeal.mealName}</h5>
                                    <p className="meal-card-text">Time: {singleMeal.mealTime} min</p>
                                    <p className="meal-card-text">Calories: {singleMeal.mealCalories}</p>
                                    <p className="meal-card-text">Proteins: {singleMeal.mealProteins}</p>
                                    <p className="meal-card-text">Carbs: {singleMeal.mealCarbs}</p>
                                    <div className="meal-card-actions">
                                        <Link to={`/admin/update_meal/${singleMeal._id}`} className="btn btn-edit">Edit</Link>
                                        <button onClick={() => handleDelete(singleMeal._id)} className="btn btn-delete">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <button type="button" className="btn btn-add-meal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    +
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new meal plan</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action=''>
                                    <label>Meal Name</label>
                                    <input onChange={(e) => setMealName(e.target.value)} type="text" className='form-control' placeholder='Enter meal name'></input>
                                    <label className='mt-2'>Meal Description</label>
                                    <textarea onChange={(e) => setMealDescription(e.target.value)} type="text" className='form-control' rows={3} placeholder='Enter meal description'></textarea>
                                    <label className='mt-2'>Meal Time</label>
                                    <input onChange={(e) => setMealTime(e.target.value)} type="number" className='form-control' placeholder='Enter meal time'></input>
                                    <label className='mt-2'>Meal Calories</label>
                                    <input onChange={(e) => setMealCalories(e.target.value)} type="number" className='form-control' placeholder='Enter meal calories'></input>
                                    <label className='mt-2'>Meal Proteins</label>
                                    <input onChange={(e) => setMealProteins(e.target.value)} type="number" className='form-control' placeholder='Enter meal proteins'></input>
                                    <label className='mt-2'>Meal Carbs</label>
                                    <input onChange={(e) => setMealCarbs(e.target.value)} type="number" className='form-control' placeholder='Enter meal carbs'></input>
                                    <label className='mt-2'>Choose meal image</label>
                                    <input onChange={handleImage} type='file' className='form-control'/>
                                    {
                                        previewImage && <img src={previewImage} className='img-fluid rounded mt-2' alt='Preview'></img>
                                    }
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

export default MealplanAdmin;
