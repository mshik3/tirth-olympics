import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  score: number;
  sport: string;
  team: string;
}

interface LoginData {
  username: string;
  password: string;
}

const Admin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    score: 0,
    sport: "",
    team: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "score" ? parseInt(value, 10) : value });
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simple authentication check
    if (loginData.username === "admin" && loginData.password === "password") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Score updated successfully");
      } else {
        alert("Failed to update score");
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Score:</label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Sport:</label>
            <input
              type="text"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Team:</label>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Admin;
