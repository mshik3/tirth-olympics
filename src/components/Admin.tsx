import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  points: number;
  sport: string;
}

interface LoginData {
  username: string;
  password: string;
}

const Admin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    points: 0,
    sport: "",
  });
  const [participants, setParticipants] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/scores`);
        const data = await response.json();
        setParticipants(data.map((participant: { name: string }) => participant.name));
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    }
    fetchParticipants();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "points" ? parseInt(value, 10) : value });
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
      const response = await fetch(
        `https://tirtholympicsbackend.mshik3.workers.dev/api/scores`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Score updated successfully");
      } else {
        alert("Failed to update score");
      }
    } catch (error) {
      console.error("Error updating score:", error);
      alert("An error occurred");
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
            <select name="name" value={formData.name} onChange={handleChange}>
              <option value="">Select a participant</option>
              {participants.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Points:</label>
            <input
              type="number"
              name="points"
              value={formData.points}
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
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Admin;
