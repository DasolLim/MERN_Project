// PublicGoalsList.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicGoals } from '../features/goals/goalSlice';

const PublicGoalsList = () => {
    const dispatch = useDispatch();
    const publicGoals = useSelector((state) => state.goals.publicGoals || []);

    useEffect(() => {
        // Fetch 10 public goals from the server when the component mounts
        dispatch(getPublicGoals());
    }, [dispatch]);

    return (
        <div>
            <h2>Public Goals</h2>
            <ul>
                {publicGoals.map((goal) => (
                    <li key={goal._id}>
                        <p>Name: {goal.text}</p>
                        {/* <p>Creator's Nickname: {goal.creatorNickname}</p> */}
                        <p>Last Modified: {new Date(goal.lastModified).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PublicGoalsList;
