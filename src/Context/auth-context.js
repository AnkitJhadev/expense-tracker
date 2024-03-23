import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userId: null, // Add userId to the context
  login: (token, userId) => {}, // Modify login function to accept userId
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // State to store userId

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  // const userIsLoggedIn = !!token;

  // const loginHandler = (token, userId) => { // Modify loginHandler to accept userId
  //   setToken(token);
  //   setUserId(userId); // Store userId in state
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("userId", userId); // Store userId in localStorage
  // };

  // const logoutHandler = () => {
  //   setToken(null);
  //   setUserId(null); // Clear userId from state
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId"); // Remove userId from localStorage
  // };

  const contextValue = {
    token: token,
    // isLoggedIn: userIsLoggedIn,
    userId: userId, // Include userId in the context value
    // login: loginHandler,
    // logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
