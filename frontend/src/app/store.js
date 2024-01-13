// Setting up a Redux store using the 'configureStore'
// Redux is a state management library commmonly used with React applications

import { configureStore } from '@reduxjs/toolkit'
// Importing two reducer functions
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'

// Called with an object as an arguement, a way for you to provide more information to a function
export const store = configureStore({
  // 'reducer' is an object itself
  // Used to define how the Redux store's satate should be updated
  reducer: {
    /*
    The terms "slice" in Redux refer to a piece of the overall state 
    managed by a specific reducer. Each reducer is responsible for managing a slice of the state, 
    and combined, they form the complete state tree.
    */
    auth: authReducer,  // authReducer is associated with the auth slice of the state.
    goals: goalReducer, // goalReducer is associated with the goals slice of the state.
  },
})