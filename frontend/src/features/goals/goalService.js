// Used to manage goals
/* 
Provide a set of functions for
creating, retrieving, and deleting goals by making HTTP requests

Each function includes the necessary logic for handling user authentication through a token 
and uses Axios for making the HTTP requests. 
*/

// 'axios' used for making HTTP requests
import axios from 'axios'
import { toast } from 'react-toastify';

// Defining the base URL for the goals API
// The actual endpoint paths will be appended to this base URL in the functions below
const API_URL = '/api/goals/'

// goalData contain data for the new goal
// token is a user authenticaiton token used for authorization
// Create new goal
const createGoal = async (goalData, token) => {
    const userGoals = await getGoals(token);
    const isDuplicateName = userGoals.some((goal) => goal.text === goalData.text);

    if (isDuplicateName) {
        toast.error('Error: Duplicate Name');
        throw new Error('Duplicate goal name.');
    }

    if (userGoals.length >= 20) {
        toast.error('Error: Reached Maximum Limit of 20 Goals');
        throw new Error('You have reached the maximum limit of 20 goals.');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, goalData, config);
    // Log response
    console.log(response.data);
    return response.data;
}

// Get user goals
const getGoals = async (token, includePrivate = true) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // GET request to the API endpoint (API_URL) with the authorization configuration.
    const response = await axios.get(API_URL, config);

    // Filter out private goals if includePrivate is false
    const filteredGoals = includePrivate ? response.data : response.data.filter(goal => !goal.isPrivate);

    return filteredGoals;
};

// Delete user goal
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    // DELETE request to the specific goal endpoint (API_URL + goalId) with the authorization configuration.
    const response = await axios.delete(API_URL + goalId, config)

    return response.data
}

// Get public goals
const getPublicGoals = async () => {
    // No need for a token to fetch public goals
    const response = await axios.get(API_URL + 'public');
    return response.data.filter(goal => !goal.isPrivate).sort((a, b) => b.lastModified - a.lastModified).slice(0, 10); // Filter out private goals and sort by last modified date
}

// Add the following function to update an existing goal
const updateGoal = async (goalId, updatedGoal, token) => {
    console.log('Token:', token);
    console.log('Goal ID:', goalId);
    console.log('Updated Goal:', updatedGoal);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(`${API_URL}${goalId}`, updatedGoal, config);

    return response.data;
}

// Exporting three functions
const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
    getPublicGoals,
    updateGoal,
}

export default goalService