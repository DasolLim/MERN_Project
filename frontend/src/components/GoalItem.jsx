import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import { useState } from 'react';

function GoalItem({ goal, onEdit }) {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
        onEdit(goal);

        console.log('Editing goal with ID:', goal._id)
    };

    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.text}</h2>
            <p>Description: {goal.description}</p>
            <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
                X
            </button>
            <button
                onClick={handleEditClick}
                style={{
                    display: 'block',
                    margin: '15px auto 0',
                }}
                className='btn'
            >
                Edit
            </button>

        </div>
    )
}

export default GoalItem