import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

function GoalForm() {
    const [text, setText] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [description, setDescription] = useState(''); // New state for description

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        // Explicitly set isPrivate to false if it's a public goal
        console.log('isPrivate state:', isPrivate);

        console.log('description text:', description);

        // Explicitly set isPrivate to false if it's a public goal
        dispatch(createGoal({ text, isPrivate: isPrivate, description }));
        setText('');
        setDescription('');
    };

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                {/* Include a checkbox to mark the goal as private */}
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

                {/* New input field for the optional description */}
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
                    <button className='btn btn-block' type='submit'>
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
