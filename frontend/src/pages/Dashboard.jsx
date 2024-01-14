// useEffect is React hook used for side effects in functional componenets
import React, { useEffect, useState } from 'react';
// Provide the ability to navigate to different parts of your application
import { useNavigate } from 'react-router-dom'
// Allow extracting data from the Redux store state
// Provide reference to the Redux store 'dispatch' function
import { useSelector, useDispatch } from 'react-redux'

import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset, updateGoal } from '../features/goals/goalSlice'

/*
Functional components:
Simple javascript function
Accepts the data in the form of props and returns the react elements
*/
function Dashboard() {
    const [rating, setRating] = useState(0); // Declare rating state
    const [comment, setComment] = useState(''); // Declare comment state

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Look into store.js
    // Used to get the 'user' from the 'auth' slice
    // Used to get the 'goals', 'isLoading', 'isError', 'message' from 'goal' slice
    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    )
    const [editingGoal, setEditingGoal] = useState(null);

    const handleEditGoal = (goal) => {
        setEditingGoal(goal);
        setRating(goal.rating || 0);
        setComment(goal.comment || '');
    };

    // The useEffect hook is used to perform side effects in the component
    // Runs whenever the dependencies in the dependency array ([user, navigate, isError, message, dispatch]) change.
    useEffect(() => {
        /*
        Inside the useEffect, it checks for errors, navigates to the login page 
        if there's no user, dispatches the getGoals action, and returns a cleanup function 
        that dispatches the reset action when the component unmounts 
        */
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getGoals())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    // Indictates that content is still loading
    if (isLoading) {
        return <Spinner />
    }

    // If it is not loading, then render the main content
    return (
        <>
            <section className='heading'>
                {/* Display welcome message with a specific user */}
                <h1>Welcome {user && user.name}</h1>
                <p>Lists Dashboard</p>
            </section>

            {editingGoal ? (
                <GoalForm
                    initialData={editingGoal}
                    onSubmit={(updatedData) => {
                        // Update rating and comment in the updatedData
                        const dataWithReview = { ...updatedData, rating, comment };
                        dispatch(updateGoal(dataWithReview));
                        setEditingGoal(null);
                    }}
                    isEditing={true} // Pass isEditing prop to GoalForm
                    rating={rating} // Pass rating prop to GoalForm
                    comment={comment} // Pass comment prop to GoalForm
                />
            ) : (
                <>
                    <GoalForm />
                </>
            )}

            < section className='content'>
                {goals.length > 0 ? (
                    <div className='goals'>
                        {goals.map((goal) => (
                            // listing goals and its components
                            <GoalItem key={goal._id} goal={goal} onEdit={handleEditGoal} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any lists</h3>
                )}
            </section >
        </>
    )
}

export default Dashboard