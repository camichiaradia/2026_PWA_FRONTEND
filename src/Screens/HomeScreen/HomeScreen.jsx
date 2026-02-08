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
    const workspaces = workspace_list?.data?.workspaces || [];

    const handleOpenWorkspace = (id) => {
        navigate(`/workspace/${id}`)
    }

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
                                    </div>
                                </div>
                                <button
                                    className="workspace-btn"
                                    onClick={() => handleOpenWorkspace(workspace.workspace_id)}>
                                    ABRIR
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No tienes workspaces registrados</div>
                    )}                    {workspaces.length === 0 && <span>No tienes workspaces</span>}
                    {workspaces.map(workspace => (
                        <div key={workspace.workspace_id} className="workspace-item">
                            <div className="workspace-info">
                                <div className="workspace-icon">
                                    {workspace.workspace_titulo.charAt(0).toUpperCase()}
                                </div>
                                <div className="workspace-details">
                                    <div className="workspace-name">{workspace.workspace_titulo}</div>
                                    <div className="workspace-members">{workspace.miembros_count} miembros</div>
                                </div>
                            </div>
                            <button className="workspace-btn">Entrar</button>
                        </div>
                    ))}
                    {/* {workspace_list.data.workspaces && workspace_list.data.workspaces.length > 0 && workspace_list.data.workspaces.map(
                        workspace => <div key={workspace.workspace_id}>{workspace.workspace_titulo}</div>)}

                    {workspace_list.data.workspaces && workspace_list.data.workspaces.length === 0 && <span>No tienes workspaces</span>} */}
                </div>
            </main>
        </div>
    )
}

export default HomeScreen