import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Please log in.</p>
  );
};

export default Dashboard;
