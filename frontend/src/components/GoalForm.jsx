import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal, updateGoal } from '../features/goals/goalSlice';
import { getSuperheroById } from '../features/search/searchService';

function GoalForm({ initialData, onSubmit }) {
    const [text, setText] = useState(initialData ? initialData.text : '');
    const [isPrivate, setIsPrivate] = useState(initialData ? initialData.isPrivate : true);
    const [description, setDescription] = useState(initialData ? initialData.description : '');
    const [superheroIds, setSuperheroIds] = useState('');
    const [rating, setRating] = useState(initialData ? initialData.rating : 0); // New state for rating
    const [comment, setComment] = useState(initialData ? initialData.comment : ''); // New state for comment
    const [isEditing, setIsEditing] = useState(!!initialData);
    const dispatch = useDispatch();

    useEffect(() => {
        // Set form fields based on initialData when provided
        if (initialData) {
            setText(initialData.text);
            setIsPrivate(initialData.isPrivate);
            setDescription(initialData.description);
            // Assuming you have a field in initialData that contains superhero IDs
            setSuperheroIds(initialData.superheroIds.join(', '));
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trim any leading/trailing spaces in superheroIds
        const superheroIdArray = superheroIds.split(',').map(id => id.trim());

        const reviewData = { rating, comment }; // New review data

        if (isEditing) {
            // If editing, dispatch the updateGoal action with the updatedGoal and reviewData
            dispatch(updateGoal({ goalId: initialData._id, updatedGoal: { text, isPrivate, description, superheroIds, ...reviewData } }));
        } else {
            // If not editing, dispatch the createGoal action with the goalData and reviewData
            dispatch(createGoal({ text, isPrivate, description, superheroIds: superheroIdArray, ...reviewData }));
        }

        // Clear the form fields including rating and comment
        setText('');
        setIsPrivate(true);
        setDescription('');
        setSuperheroIds('');
        setRating(0);
        setComment('');
        setIsEditing(false);
    };

    return (
        <section className='form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='isPrivate'>Private Goal</label>
                    <input
                        type='checkbox'
                        name='isPrivate'
                        id='isPrivate'
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
                    <input
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        name='description'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='superheroIds'>Superhero IDs (comma-separated):</label>
                    <input
                        type='text'
                        name='superheroIds'
                        id='superheroIds'
                        value={superheroIds}
                        onChange={(e) => setSuperheroIds(e.target.value)}
                    />
                </div>

                {isEditing && (
                    <>
                        <div className='form-group'>
                            <label htmlFor='rating'>Rating</label>
                            <input
                                type='number'
                                name='rating'
                                id='rating'
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value, 10))}
                                min="0"
                                max="5"
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='comment'>Comment</label>
                            <textarea
                                name='comment'
                                id='comment'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div className='form-group'>
                    {/* Conditionally render "Update Goal" or "Add Goal" button */}
                    <button className='btn btn-block' type='submit'>
                        {isEditing ? 'Update Goal' : 'Add Goal'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
