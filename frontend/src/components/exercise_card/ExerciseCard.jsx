import './ExerciseCard.css';
import { FaBurn, FaClock } from 'react-icons/fa';

const ExerciseCard = ({ exerciseInformation, color }) => {
    return (
        <div className="exercise-card">
            <div className="card custom-card">
                <span style={{ backgroundColor: color }} className="badge exercise-level-badge">
                    {exerciseInformation.exerciseLevel}
                </span>
                <div className="card-body">
                    <h5 className="card-title exercise-name">{exerciseInformation.exerciseName}</h5>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="exercise-calories">
                            <FaBurn className="icon" /> {exerciseInformation.exerciseCalories} cal
                        </p>
                        <p className="exercise-time">
                            <FaClock className="icon" /> {exerciseInformation.exerciseTime} mins
                        </p>
                    </div>
                    <div className="exercise-video mt-4">
                        <p className="fw-bold mb-2">Watch the Exercise:</p>
                        <iframe
                            width="100%"
                            height="150"
                            src={exerciseInformation.exerciseVideo}
                            title={exerciseInformation.exerciseName}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;
