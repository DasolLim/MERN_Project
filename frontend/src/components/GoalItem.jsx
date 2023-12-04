import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

function GoalItem({ goal, onEdit }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
        onEdit(goal);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteGoal(goal._id));
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle the value
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',  // Adjust the gap as needed
    };

    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            {isEditing ? (
                <div>
                    <button
                        onClick={handleEditClick}
                        style={{
                            display: 'block',
                            margin: '10px auto 10px',
                        }}
                        className='btn'
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <h2>{goal.text}</h2>
                    <p>Description: {goal.description}</p>
                    <button onClick={handleDeleteClick} className='close'>
                        X
                    </button>
                    <button
                        onClick={handleEditClick}
                        style={{
                            display: 'block',
                            margin: '10px auto 10px',
                        }}
                        className='btn'
                    >
                        Edit
                    </button>
                </>
            )}

            {showConfirmation && (
                <div>
                    <p>Confirmation: Delete Goal?</p>
                    <div style={buttonContainerStyle}>
                        <button onClick={handleConfirmDelete} className='btn'>
                            Yes
                        </button>
                        <button onClick={handleCancelDelete} className='btn'>
                            No
                        </button>
                    </div>
                </div>
            )}

            {isExpanded && (
                <div className="superhero-details">
                    {/* Display superhero IDs from goal.superheroIds */}
                    <div className='attribute'>
                        <div className='attribute'>
                            <p><strong>Superhero IDs:</strong> {goal.superheroIds.join(', ')} {goal.superheroIds.join(', ')}</p>
                            <p><strong>Name: </strong> Abomination</p>
                            <p><strong>Publisher: </strong> Dark Horse Comics</p>
                            <p><strong>Powers: </strong>"Durability", "Cold Resistance","Energy Absorption","Super Strength",
                                "Invulnerability","Elemental Transmogrification","Fire Resistance","Natural Armor"</p>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={handleToggleExpand}
                style={{
                    display: 'block',
                    margin: '10px auto 10px',
                }}
                className='btn'>
                {isExpanded ? 'Collapse' : 'Expand'}
            </button>
        </div>
    );
}

export default GoalItem;
