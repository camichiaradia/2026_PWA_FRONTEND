import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { AuthContext } from '../../Context/AuthContext'
import MessagesList from '../../Componente/MessagesList/MessagesList'
import './ChannelMessageScreen.css'
import { createMessageService } from '../../services/workspaceService'



const ChannelMessageScreen = () => {
    const { workspace_id, channel_id } = useParams()
    const navigate = useNavigate()
    const { session } = useContext(AuthContext)

    const {
        getWorkspaceChannels,
        channels_list,
        channels_list_loading,
        workspace_list,
        getMessagesByChannel,
        messages_list,
        messages_list_loading
    } = useContext(WorkspaceContext);

    const [messageInput, setMessageInput] = useState('')
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        if (workspace_id) getWorkspaceChannels(workspace_id)
    }, [workspace_id])

    useEffect(() => {
        if (workspace_id && channel_id) getMessagesByChannel(workspace_id, channel_id)
    }, [channel_id, workspace_id])

    // --- PROCESAMIENTO DE DATOS ---
    const channels = channels_list?.data?.channels || []
    const selectedChannel = channels.find(c => String(c._id) === String(channel_id))

    // Lógica de UNIFICACIÓN (Solo una declaración de 'messages')
    const messages = messages_list?.data?.messages || []

    const currentWorkspace = workspace_list?.data?.workspaces?.find(
        ws => String(ws.workspace_id) === String(workspace_id)
    )
    const currentWorkspaceName = currentWorkspace?.workspace_titulo || "Cargando..."

    const handleSendMessage = async (event) => {
        event.preventDefault()
        if (messageInput.trim() && selectedChannel && !isSending) {
            try {
                setIsSending(true)
                const mensajeEnviar = messageInput.trim();
                setMessageInput('')
                await createMessageService(workspace_id, channel_id, mensajeEnviar);
                await getMessagesByChannel(workspace_id, channel_id);
            } catch (error) {
                console.error("Error al enviar:", error);
                alert("No se pudo enviar el mensaje.");
            } finally {
                setIsSending(false)
            }
        }
    }

    const handleChannelSelect = (channel) => {
        navigate(`/workspace/${workspace_id}/channel/${channel._id}`)
    }

    if (channels_list_loading && channels.length === 0) {
        return (
            <div className="workspace-detail-loading">
                <div className="loader"></div>
                <p>Cargando Workspace...</p>
            </div>
        )
    }

    return (
        <div className="workspace-detail-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div>
                        <h2>{currentWorkspaceName}</h2>
                    </div>
                    <div>
                        <button
                            className="back-btn"
                            onClick={() => navigate('/home')}
                            title="Volver a mis workspaces">
                            <i className="bi bi-arrow-left-short"></i>
                        </button>
                    </div>
                </div>
                <nav className="channels-nav">
                    <h3>Canales</h3>
                    <ul>
                        {channels.length > 0 ? (
                            channels.map(channel => (
                                <li
                                    key={channel._id}
                                    onClick={() => handleChannelSelect(channel)}
                                    className={channel._id === channel_id ? "active" : ""}
                                >
                                    # {channel.nombre}
                                </li>
                            ))
                        ) : (
                            <li>No hay canales</li>
                        )}
                    </ul>
                </nav>
            </aside>

            <main className="chat-area">
                <header className="chat-header">
                    <h1># {selectedChannel ? selectedChannel.nombre : "Selecciona un canal"}</h1>
                </header>

                <div className="message-list">
                    {messages_list_loading ? (
                        <div className="loading-messages">Cargando mensajes...</div>
                    ) : (
                        <MessagesList messages={messages} />
                    )}
                </div>

                <footer className="chat-input-area">
                    <form onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder={selectedChannel ? `Enviar mensaje a #${selectedChannel.nombre}` : "Selecciona un canal"}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            disabled={!selectedChannel}
                        />
                        <button type="submit" disabled={!selectedChannel || !messageInput.trim() || isSending}>
                            {isSending ? "..." : "Enviar"}
                        </button>
                    </form>
                </footer>
            </main>
        </div>
    )
}

export default ChannelMessageScreen