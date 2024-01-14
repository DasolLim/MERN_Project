import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPublicGoals, reset } from '../features/goals/goalSlice';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Admin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const publicGoals = useSelector((state) => state.goals.publicGoals || []);

    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    )

    const [expandedGoalId, setExpandedGoalId] = useState(null);
    const [activeUsers, setActiveUsers] = useState({}); // Track the active state for each user

    useEffect(() => {
        // Fetch up to 10 public goals from the server when the component mounts
        dispatch(getPublicGoals());
    }, [dispatch]);

    // Indicate that content is still loading
    if (isLoading) {
        return <Spinner />;
    }

    const toggleExpand = (goalId) => {
        setExpandedGoalId(expandedGoalId === goalId ? null : goalId);
    };

    const handleToggleEditing = (userId) => {
        // Toggle the active state for the specific user
        setActiveUsers((prevActiveUsers) => ({
            ...prevActiveUsers,
            [userId]: !prevActiveUsers[userId],
        }));
    };

    return (
        <div>
            <h1><strong>Admin Dashboard</strong></h1>
            <div>
                <h2>Manage User IDs</h2>
                {publicGoals.map((goal) => (
                    <div key={goal._id} className="goal">
                        <div className='attribute'>
                            <h2>User ID: {goal._id}</h2>
                        </div>

                        <button onClick={() => handleToggleEditing(goal._id)}
                            style={{
                                display: 'block',
                                margin: '10px auto 10px',
                            }} className='btn btn-block'>
                            {activeUsers[goal._id] ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                ))}
            </div>

            <section>
                <h2>Manage User Lists</h2>
                {publicGoals.map((goal) => (
                    <div key={goal._id} className="goal">
                        <div className='attribute'>
                            <h2>{goal.text}</h2>
                            <p><strong>Last Modified:</strong> {new Date(goal.lastModified).toLocaleString()}</p>
                            <p><strong>Description:</strong> {goal.description}</p>
                            <p><strong>Rating:</strong> {goal.rating}/5</p>
                            <p><strong>Comment:</strong> {goal.comment}</p>
                        </div>

                        {expandedGoalId === goal._id && (
                            <div className="superhero-details">
                                {/* Display superhero details */}
                                <div className='attribute'>
                                    <p><strong>Name: </strong> Abomination</p>
                                    <p><strong>Publisher: </strong> Dark Horse Comics</p>
                                    <p><strong>Powers: </strong>"Durability", "Cold Resistance", "Energy Absorption", "Super Strength",
                                        "Invulnerability", "Elemental Transmogrification", "Fire Resistance", "Natural Armor"</p>
                                </div>
                            </div>
                        )}

                        <button onClick={() => toggleExpand(goal._id)}
                            style={{
                                display: 'block',
                                margin: '10px auto 10px',
                            }} className='btn btn-block'>
                            {expandedGoalId === goal._id ? 'Collapse' : 'Expand'}
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Admin;
