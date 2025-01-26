import React, { useEffect, useState } from 'react';
import { getAllMeals } from '../../../apis/Api';
import MealUserCard from '../../../components/user_meal_card/MealUserCard';
import './MealUser.css';

const MealUser = () => {
    const [meals, setMeals] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getAllMeals().then((res) => {
            setMeals(res.data.data);
            setFilteredMeals(res.data.data); // Set initial filtered meals
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        // Filter meals whenever searchQuery changes
        const filtered = meals.filter(meal =>
            meal.mealName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMeals(filtered);
    }, [searchQuery, meals]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='container mt-3'>
            <div className="search-bar mb-3">
                <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search meals" 
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </form>
            </div>
            <div className='meal-cards mt-3'>
                {
                    filteredMeals.map((meal) => (
                        <MealUserCard key={meal._id} mealInformation={meal} />
                    ))
                }
            </div>
        </div>
    );
};

export default MealUser;
