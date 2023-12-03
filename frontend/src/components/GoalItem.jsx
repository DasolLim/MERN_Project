import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

function GoalItem({ goal, onEdit }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

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
                    <button onClick={handleCancelEdit}>Cancel</button>
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
        </div>
    );
}

export default GoalItem;
