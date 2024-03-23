// ExpenseForm.js
import React, { useState, useContext } from 'react';
import './ExpenseForm.css';
import { AuthContext } from '../../Context/auth-context';

const ExpenseForm = ({ setExpenses }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const authContext = useContext(AuthContext);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dbUrl = `https://react-auth-with-9cd6e-default-rtdb.firebaseio.com/expenses/${authContext.userId}.json`;

    try {
      const response = await fetch(dbUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          description: description,
          category: category,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to store data in the database. Firebase Error: ${errorMessage}`);
      }

      const responseData = await response.json();
      const newExpense = {
        id: responseData.name,
        amount: amount,
        description: description,
        category: category,
      };

      setAmount('');
      setDescription('');
      setCategory('');

      // Update expenses state with the new expense
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="amount" className="label">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="label">
          Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="label">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          required
          className="select-field"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
