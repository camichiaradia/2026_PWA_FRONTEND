import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authservice'
import useRequest from '../../hooks/useRequest'
import useRegister from '../../hooks/useRegister'
import "../RegisterScreen/RegisterScreen.css"

const RegisterScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useRegister()

    return (
        <div className="hero_register">
            <header className='header'>
                <div className="header_logo">
                    <img className='logo_slack' src='Slack_logo.png' alt='logo_Slack'>
                    </img>
                </div>
            </header>

            <h1>Registrate en la aplicacion</h1>
            <form onSubmit={onSubmitForm}>
                <div>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form_state.username}
                        onChange={onChangeFieldValue}
                        placeholder="Nombre de usuario"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form_state.password}
                        onChange={onChangeFieldValue}
                        placeholder="Contraseña"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form_state.email}
                        onChange={onChangeFieldValue}
                        placeholder="nombre@work-email.com"
                    />
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
                        Usuario registrado exitosamente, te enviaremos un mail con instrucciones.
                    </span>
                }
                <br />
                <button type="submit" disabled={loading}>Registrarse</button>
            </form>
            <span>
                Ya tienes una cuenta? <Link to="/login">iniciar sesion</Link>
            </span>
        </div>
    )
}

export default RegisterScreen