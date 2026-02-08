import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { login } from '../../services/authservice'
import useLogin from '../../hooks/useLogin'
import "../LoginScreen/LoginScreen.css"


const LoginScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useLogin()

    return (
        <div className="hero_login">
            <header className='header'>
                <div className="header_logo">
                    <img className='logo_slack' src='Slack_logo.png' alt='logo_Slack'>
                    </img>
                </div>
            </header>
            <h1>Primero, introduce tu correo electrónico</h1>
            <p>Te sugerimos que uses la <strong>dirección de correo electrónico que usas en el trabajo.</strong></p>
            <form onSubmit={onSubmitForm}>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nombre@work-email.com"
                        onChange={onChangeFieldValue}
                        value={form_state.email} />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={onChangeFieldValue}
                        placeholder="Contraseña"
                        value={form_state.password} />
                </div>
                {
                    error && <span style={{ color: '#e01e5a', marginBottom: '10px' }}>{error.message}</span>
                }
                {
                    response
                    &&
                    response.ok
                    &&
                    <span style={{ color: 'yellowgreen' }}>
                        Te has logueado exitosamente
                    </span>
                }
                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
            </form>
            <span>
                Aun no tienes cuenta? <Link to="/register">Registrate</Link>
            </span>
        </div>
    )
}

export default LoginScreen