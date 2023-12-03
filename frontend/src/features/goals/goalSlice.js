import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    publicGoals: [], // Ensure this property is defined
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get public goals
export const getPublicGoals = createAsyncThunk(
    'goals/public',
    async (_, thunkAPI) => {
        try {
            console.log('Fetching public goals...');

            // No need to fetch public goals with a token
            const response = await goalService.getPublicGoals();

            console.log('Public goals fetched:', response);

            return response;
        } catch (error) {
            console.error('Error fetching public goals:', error);

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update user goal
// Update user goal
export const updateGoal = createAsyncThunk(
    'goals/update',
    async ({ goalId, updatedGoal }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const response = await goalService.updateGoal(goalId, updatedGoal, token);
            return response;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create new goal
// Async thunks are functiosn that dispatch actions at different lifecycle stages of 
// an asynchronous operation (pending, fulfilled, rejected).
export const createGoal = createAsyncThunk(
    'goals/create',
    async (goalData, thunkAPI) => {
        try {
            // Attempt to get the user's token from the Redux store
            /*
            A "token" usually refers to an access token. 
            An access token is a piece of data that represents the authorization granted to a user 
            and is used to access protected resources.
            */
            const token = thunkAPI.getState().auth.user.token;
            // Call the 'createGoal' function from 'goalService' with the goalData and token

            // Pass isPrivate from goalData to the createGoal function
            return await goalService.createGoal({ ...goalData, isPrivate: goalData.isPrivate || false }, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            // Reject the promise with the error message using 'rejectWithValue'
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user goals
export const getGoals = createAsyncThunk(
    'goals/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const includePrivate = true; // Set to true to include private goals on the Dashboard
            return await goalService.getGoals(token, includePrivate);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete user goal
export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await goalService.deleteGoal(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

/* 
'createSlice' is used to create a Redux slice, 
which includes the reducer function, action creators, and the initial state.
*/
export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        // Resets the state to its initial state when dispatched.
        reset: (state) => initialState,
    },
    // Logic for handling actions dispatched by the async thunks.
    // Lifecycle: pending, fulfilled, and rejected
    extraReducers: (builder) => {
        builder
            // createGoal
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // getGoals
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // deleteGoal
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id).slice();
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPublicGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPublicGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.publicGoals = action.payload; // Update publicGoals state
            })
            .addCase(getPublicGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                // Find the index of the updated goal in the goals array
                const updatedIndex = state.goals.findIndex(
                    (goal) => goal._id === action.payload._id
                );

                if (updatedIndex !== -1) {
                    // Update the goal in the array
                    state.goals[updatedIndex] = action.payload;
                }
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
})

// exporting reset from goalSlice
export const { reset } = goalSlice.actions
export default goalSlice.reducer