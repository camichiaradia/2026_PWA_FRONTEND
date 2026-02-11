import React, { useContext } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { Link, useNavigate } from 'react-router-dom'
import './HomeScreen.css'

const HomeScreen = () => {
    const { workspace_list_loading, workspace_list_error, workspace_list } = useContext(WorkspaceContext)
    const navigate = useNavigate()
    console.log("Datos recibidos:", workspace_list?.data?.workspaces);


    if (workspace_list_loading || !workspace_list) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )
    }
    const workspaces = workspace_list?.data?.workspaces || []

    const handleOpenWorkspace = (id) => {
        navigate(`/workspace/${id}`)
    }

    const handleEliminar = async (workspace_id) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este espacio?')) return;

        try {
            const response = await fetch(`http://localhost:8080/api/workspace/${workspace_id}`, {
                method: 'DELETE',
                headers: {
                    'x-api-key': '4864da4a-2791-4113-931e-132644f2a3aa',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });

            const result = await response.json();
            if (result.ok) {
                alert('Espacio eliminado correctamente');
                window.location.reload();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    const handleEditar = async (workspace_id, tituloActual) => {
        const nuevoNombre = prompt("Nuevo nombre para el espacio:", tituloActual);
        if (!nuevoNombre || nuevoNombre === tituloActual) return;

        try {
            const response = await fetch(`http://localhost:8080/api/workspace/${workspace_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '4864da4a-2791-4113-931e-132644f2a3aa',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ titulo: nuevoNombre })
            });

            const result = await response.json();
            if (result.ok) {
                window.location.reload();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error("Error al editar:", error);
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="header_logo">
                    <img className='logo_slack' src='Slack_logo.png' alt='logo_Slack'>
                    </img>
                </div>
                <h1>Bienvenido nuevamente</h1>
                <p>Elige un espacio de trabajo para volver a <strong>comunicarte con tu equipo.</strong></p>
                <span>O si quieres puedes: <Link to="/create-workspace">Crear un nuevo espacio de trabajo.</Link></span>
            </header>

            <main className="workspace-card-container">
                {workspace_list_error && <span className="error-msg">{workspace_list_error.message}</span>}

                <div className="workspace-list">
                    <p className="list-label">Espacios de trabajo para <strong>tu email</strong></p>
                    {workspaces.length > 0 ? (
                        workspaces.map(workspace => (
                            <div key={workspace.workspace_id} className="workspace-item">
                                <div className="workspace-info">
                                    <div className="workspace-icon">
                                        {workspace.workspace_titulo.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="workspace-details">
                                        <span className="workspace-name">{workspace.workspace_titulo}</span>
                                        <span className="workspace-members">Miembros activos</span>

                                        <div className="workspace-actions-row">
                                            <button
                                                className="btn-action-text edit"
                                                onClick={() => handleEditar(workspace.workspace_id, workspace.workspace_titulo)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn-action-text delete"
                                                onClick={() => handleEliminar(workspace.workspace_id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="workspace-btn"
                                    onClick={() => handleOpenWorkspace(workspace.workspace_id)}>
                                    Entrar
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No tienes workspaces registrados</div>

                    )}

                    {/* {workspace_list.data.workspaces && workspace_list.data.workspaces.length > 0 && workspace_list.data.workspaces.map(
                        workspace => <div key={workspace.workspace_id}>{workspace.workspace_titulo}</div>)}

                    {workspace_list.data.workspaces && workspace_list.data.workspaces.length === 0 && <span>No tienes workspaces</span>} */}
                </div>
            </main>
        </div>
    )
}

export default HomeScreen