import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: []
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    }
  }
});

export const { setExpenses, addExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
