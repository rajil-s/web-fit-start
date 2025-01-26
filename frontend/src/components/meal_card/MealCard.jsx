import './MealCard.css';
import { FaClock} from 'react-icons/fa';

const MealCard = ({ mealInformation }) => {
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
                        <h5 className="card-title text-danger"><FaClock/> {mealInformation.mealTime} minutes</h5>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column align-items-center">
                            <span>{mealInformation.mealProteins}g</span>
                            <span>proteins</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <span>{mealInformation.mealCalories}</span>
                            <span>calories</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <span>{mealInformation.mealCarbs}g</span>
                            <span>carbs</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
};

export default MealCard;
