import React, { useState } from 'react';
import { login } from '../services/api';
import '../styles/styles.css';
import { toast } from 'react-toastify';
// useHistory fue removido de react-router-dom v6
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../utils/util';
// para usar useNavigate se debe instalar react-router-dom v6 y se debe configurar en app.js


export function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // login devuelve data y status

            const { token, status } = await login(userName, password);
            console.log(token);
            console.log('despues del post');
            console.log(status);
            //const { role } = jwt_decode(token);

            localStorage.setItem('token', token);
            showNotification("Bienvenido", "success");
            //localStorage.setItem('role', role);
            Navigate('/dashboard');
        } catch (error) {
            if (error.response.status !== 200) {
                toast.error("Usuario o contraseña incorrectos");
                console.error("Error en login", error);

                return;
            }
            if (error.response.status === 500) {
                toast.error(error.response.data.msg);
                return;
            }
            console.error("Error en login", error);
        }
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className='login-titulo'>Ingresar al Torneo</h2>
                <input
                    type="text"
                    placeholder="Ingreso nombre de Usuario"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar a pelear</button>
            </form>
        </div>
    )
}