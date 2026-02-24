import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPasswodScreen.css'

const ResetPasswordScreen = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/reset-password', {
                method: 'PUT',
                headers: {
                    'x-api-key': "4864da4a-2791-4113-931e-132644f2a3aa",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Contraseña cambiada! Ya puedes iniciar sesión.");
                navigate('/login');
            } else {
                alert(data.message || "Error al cambiar la contraseña");
            }
        } catch (err) {
            alert("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero_login">
            <header className='header'>
                <img className='logo_slack' src='Slack_logo.png' alt='logo_Slack' />
            </header>

            <h1>Crea tu nueva contraseña</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn-login">Restablecer contraseña</button>
            </form>
        </div>
    );
};

export default ResetPasswordScreen;