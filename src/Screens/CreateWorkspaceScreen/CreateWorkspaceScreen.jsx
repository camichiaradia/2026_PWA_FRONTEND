import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import './CreateWorkspaceScreen.css'


const CreateWorkspaceScreen = () => {
    const navigate = useNavigate()

    const validateForm = (formValues) => {
        const errors = {}
        const { titulo, description } = formValues

        if (!titulo.trim()) {
            errors.titulo = 'El nombre del espacio de trabajo es obligatorio'
        }

        if (!description.trim()) {
            errors.description = 'La descripción es obligatoria'
        } else if (description.length > 1000) {
            errors.description = 'La descripción no puede superar los 1000 caracteres'
        }

        return errors
    }

    const { form_state, onChangeFieldValue, onSubmitForm, errors } = useForm({
        initial_form_fields: {
            titulo: '',
            description: ''
        },
        onSubmit: async (formValues) => {
            console.log('Form submitted:', formValues)
            try {
                const response = await fetch('http://localhost:8080/api/workspace', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': '4864da4a-2791-4113-931e-132644f2a3aa',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    },
                    body: JSON.stringify(formValues)
                });

                const result = await response.json();

                if (result.ok) {
                    navigate('/home');
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
                alert('No se pudo conectar con el servidor');
            }
        },
        validate: validateForm
    })


    return (
        <div className="create-workspace-container">
            <div className="header_logo">
                <img className='logo_slack' src='Slack_logo.png' alt='logo_Slack'>
                </img>
            </div>
            <header className="create-workspace-header">
                <h1>Crear un nuevo espacio de trabajo</h1>
                <p>¡Es gratis! Pruébalo con tu equipo.</p>
            </header>

            <div className="create-workspace-box">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="titulo" className="form-label">Nombre del espacio de trabajo</label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            className="form-input"
                            placeholder="Ej. Proyecto X"
                            value={form_state.titulo}
                            onChange={onChangeFieldValue}
                        />
                        {errors.titulo && <div className="error-message">{errors.titulo}</div>}

                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-textarea"
                            placeholder="¿De qué trata este espacio?"
                            value={form_state.description}
                            onChange={onChangeFieldValue}
                        />
                        <div className="char-counter">
                            {form_state.description.length} / 1000
                        </div>
                        {errors.description && <div className="error-message">{errors.description}</div>}

                        <button type="submit" className="btn-primary">Crear espacio</button>
                        <Link to="/home" className="btn-back">Volver a lista de espacios de trabajo</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWorkspaceScreen