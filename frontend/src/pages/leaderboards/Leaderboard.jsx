import React, { useEffect, useState } from "react";
import { getLeaderboardApi } from "../../apis/Api";
import "./Leaderboards.css"; // Import CSS
import { FaCrown, FaMedal } from "react-icons/fa";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const response = await getLeaderboardApi();
            if (response.success) {
                setLeaderboard(response.leaderboard);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <div className="leaderboard-wrapper">
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.length > 0 ? (
                            leaderboard.map((user, index) => (
                                <tr key={index} className={`rank-${index + 1}`}>
                                    <td>
                                        {index === 0 ? (
                                            <FaCrown className="gold-rank" />
                                        ) : index === 1 ? (
                                            <FaMedal className="silver-rank" />
                                        ) : index === 2 ? (
                                            <FaMedal className="bronze-rank" />
                                        ) : (
                                            index + 1
                                        )}
                                    </td>
                                    <td className="user-name">{user.fullName || "Unknown"}</td>
                                    <td>{user.points}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="no-data">No leaderboard data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
