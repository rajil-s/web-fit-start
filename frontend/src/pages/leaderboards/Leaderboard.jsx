import React from 'react';
import './Leaderboards.css';

const Leaderboards = () => {
    const mockData = [
        { rank: 1, name: 'John Doe', points: 1200 },
        { rank: 2, name: 'Jane Smith', points: 1150 },
        { rank: 3, name: 'Michael Brown', points: 1100 },
        { rank: 4, name: 'Emily Davis', points: 1050 },
        { rank: 5, name: 'Chris Wilson', points: 1020 },
        { rank: 6, name: 'Sophia Taylor', points: 1000 },
        { rank: 7, name: 'James Anderson', points: 950 },
        { rank: 8, name: 'Isabella Martinez', points: 920 },
        { rank: 9, name: 'Oliver Garcia', points: 900 },
        { rank: 10, name: 'Emma Rodriguez', points: 880 },
    ];

    return (
        <div className="leaderboards-container">
            <h1 className="leaderboards-title">Leaderboards</h1>
            <div className="leaderboards-table-container">
                <table className="leaderboards-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((user) => (
                            <tr key={user.rank} className="leaderboards-row">
                                <td className="rank">{user.rank}</td>
                                <td className="name">{user.name}</td>
                                <td className="points">{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboards;
