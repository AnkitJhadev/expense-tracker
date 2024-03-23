// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Correct file name
import expensesReducer from './expenseSlice'


 const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer
  }
});

export default store;