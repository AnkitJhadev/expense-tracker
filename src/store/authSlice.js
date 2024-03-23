import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || '',
  userId: localStorage.getItem('userId') || null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  userEmail: localStorage.getItem('userEmail') || '', // Initialize userEmail with stored value
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token, userId, userEmail } = action.payload;
      state.token = token;
      state.userId = userId;
      state.userEmail = userEmail; // Set userEmail in state
      state.isLoggedIn = true;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', userEmail); // Store userEmail in localStorage
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout(state) {
      state.token = '';
      state.userId = null;
      state.userEmail = ''; // Clear userEmail when logging out
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail'); // Remove userEmail from localStorage
      localStorage.removeItem('isLoggedIn');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
