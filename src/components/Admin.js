import React, { useState } from 'react';

const Admin = () => {
    const [formData, setFormData] = useState({
        name: '',
        score: '',
        sport: '',
        team: ''
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple authentication check
        if (loginData.username === 'admin' && loginData.password === 'password') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    points: parseInt(formData.score, 10),
                    sport: formData.sport,
                    team: formData.team
                })
            });
            if (response.ok) {
                alert('Score updated successfully');
            } else {
                alert('Failed to update score');
            }
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            {!isAuthenticated ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={loginData.username} onChange={handleLoginChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Score:</label>
                        <input type="number" name="score" value={formData.score} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Sport:</label>
                        <input type="text" name="sport" value={formData.sport} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Team:</label>
                        <input type="text" name="team" value={formData.team} onChange={handleChange} />
                    </div>
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
};

export default Admin;
