import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicGoals } from '../features/goals/goalSlice';

const PublicGoalsList = () => {
    const dispatch = useDispatch();
    const publicGoals = useSelector((state) => state.goals.publicGoals || []);
    const [expandedGoalId, setExpandedGoalId] = useState(null);

    useEffect(() => {
        // Fetch up to 10 public goals from the server when the component mounts
        dispatch(getPublicGoals());
    }, [dispatch]);

    const toggleExpand = (goalId) => {
        setExpandedGoalId(expandedGoalId === goalId ? null : goalId);
    };

    return (
        <section>
            {publicGoals.map((goal) => (
                <div key={goal._id} className="goal">
                    <div className='attribute'>
                        <h2><strong>Public Goals</strong></h2>
                        <p><strong>Name:</strong> {goal.text}</p>
                        <p><strong>Description:</strong> {goal.description}</p>
                        <p><strong>Last Modified:</strong> {new Date(goal.lastModified).toLocaleString()}</p>
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
    );
}

export default PublicGoalsList;
