import axios from '../axios';

const register = async (userData) => {
    try {
        const response = await axios.post('Users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const login = async (credentials) => {
    try {
        const response = await axios.post('Users/authenticate', credentials);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
