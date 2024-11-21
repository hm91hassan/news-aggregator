import axios from 'axios';

// Set up the base URL for your API
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Update to your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure cookies are included for Sanctum authentication
});

// The login function that sends email and password to the backend API
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email: email,
            password: password,
        });
        console.log(response.data);
        return response.data; // Assuming backend returns { token: 'your_token' }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

// Register function
export const register = async (name, email, password, passwordConfirmation) => {
    try {
        const response = await api.post('/auth/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        });
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
};

// Set Authorization Header for authenticated API calls
export const setAuthHeader = (token) => {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
};

// Fetch News
export const fetchNews = async (filters = {}) => {
    try {
        const response = await api.get('/news', { params: filters });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch news:', error);
        throw error;
    }
};

// Fetch User Profile
export const fetchUserProfile = async () => {
    try {
        const response = await api.get('/user'); // Endpoint to fetch authenticated user's profile
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
};

// Fetch Sources
export const fetchSources = async () => {
    try {
        const response = await api.get('/sources');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch sources:', error);
        throw error;
    }
};

// Fetch Categories
export const fetchCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

// Fetch Authors
export const fetchAuthors = async () => {
    try {
        const response = await api.get('/authors');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch authors:', error);
        throw error;
    }
};
