import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';

import "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'x-api-key': "4864da4a-2791-4113-931e-132644f2a3aa",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSent(true);
            } else {
                setError(data.message || "No se pudo enviar el correo");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hero_login">
            <header className='header'>
                <img className='logo_slack' src='Slack_logo.png' alt='logo_Slack' />
            </header>

            {!isSent ? (
                <>
                    <h1>Restablecer contraseña</h1>
                    <p>Introduce tu correo y te enviaremos un enlace para que vuelvas a entrar.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="nombre@work-email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="error-message-text">{error}</p>}

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? 'Enviando...' : 'Obtener enlace'}
                        </button>
                    </form>
                </>
            ) : (
                <div className="success-view">
                    <h1>¡Revisa tu correo!</h1>
                    <p>Hemos enviado instrucciones a <strong>{email}</strong></p>
                </div>
            )}

            <div className="back-to-login">
                <Link to="/login">Volver al inicio de sesión</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;