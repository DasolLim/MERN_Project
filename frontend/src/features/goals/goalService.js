// Used to manage goals
/* 
Provide a set of functions for
creating, retrieving, and deleting goals by making HTTP requests

Each function includes the necessary logic for handling user authentication through a token 
and uses Axios for making the HTTP requests. 
*/


// 'axios' used for making HTTP requests
import axios from 'axios'

// Defining the base URL for the goals API
// The actual endpoint paths will be appended to this base URL in the functions below
const API_URL = '/api/goals/'

// Create new goal
// goalData contain data for the new goal
// token is a user authenticaiton token used for authorization
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    // POST request to the API endpoint with goalData and authorization configuration
    const response = await axios.post(API_URL, { ...goalData, isPrivate: goalData.isPrivate }, config);

    // return the data from the server response
    return response.data
}

// Get user goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    // GET request to the API endpoint (API_URL) with the authorization configuration.
    const response = await axios.get(API_URL, config)

    return response.data
}

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
    return response.data;
}

// Exporting three functions
const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
    getPublicGoals,
}

export default goalService