/*
src/
|-- assets/
|   |-- images/
|       |-- goku-background.jpg
|-- components/
|   |-- Login.js
|   |-- Dashboard.js
|   |-- FighterList.js
|   |-- FighterDetail.js
|-- services/
|   |-- api.js
|-- utils/
|   |-- config.js
|-- App.js
|-- index.js
|-- styles.css

*/

///config
// src/utils/config.js
const API_BASE_URL = "https://api.tuservidor.com";
export default API_BASE_URL;



// src/services/api.js
import axios from 'axios';
import config from '../utils/config';

const api = axios.create({
  baseURL: config,
});

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getFighters = async (token) => {
  const response = await api.get('/fighters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getFighterDetail = async (id, token) => {
  const response = await api.get(`/fighters/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};


// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import jwt_decode from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);
      localStorage.setItem('user', JSON.stringify(decoded));
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getFighters } from '../services/api';
import FighterList from './FighterList';

const Dashboard = () => {
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getFighters(token);
      setFighters(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fighter Dashboard</h1>
      <FighterList fighters={fighters} />
    </div>
  );
};

export default Dashboard;

// src/components/FighterList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FighterList = ({ fighters }) => {
  const navigate = useNavigate();

  return (
    <div>
      {fighters.map((fighter) => (
        <div key={fighter.luchador} onClick={() => navigate(`/fighter/${fighter.luchador}`)}>
          <h2>{fighter.luchador}</h2>
          <p>KI: {fighter.ki}</p>
          <p>Esferas: {fighter.esferas}</p>
          <img src={fighter.imagen} alt={fighter.luchador} />
        </div>
      ))}
    </div>
  );
};

export default FighterList;

// src/components/FighterDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFighterDetail } from '../services/api';

const FighterDetail = () => {
  const { luchador } = useParams();
  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const data = await getFighterDetail(luchador, token);
      setFighter(data);
    };

    fetchData();
  }, [luchador]);

  if (!fighter) return <div>Loading...</div>;

  return (
    <div>
      <h1>{fighter.luchador}</h1>
      <p>KI: {fighter.ki}</p>
      <p>Esferas: {fighter.esferas}</p>
      {fighter.categoria.map((category, index) => (
        <div key={index}>
          <h2>{Object.keys(category)[0]}</h2>
          {category[Object.keys(category)[0]].map((item, idx) => (
            <div key={idx}>
              <h3>{item.Motor || item.Lenguaje}</h3>
              {item.requerimiento.map((req, i) => (
                <div key={i}>
                  <p>{req.query || req.codigo}</p>
                  <p>Nota: {req.nota}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FighterDetail;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FighterDetail from './components/FighterDetail';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fighter/:luchador" element={<FighterDetail />} />
      </Routes>
    </Router>
  );
};

export default App;


/* src/styles.css */

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.login-container {
  background-image: url('./assets/images/goku-background.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.login-form h2 {
  margin-bottom: 20px;
}

.login-form input {
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
}

.login-form button {
  padding: 10px;
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #45a049;
}
