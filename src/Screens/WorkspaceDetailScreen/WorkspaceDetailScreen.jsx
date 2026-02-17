import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { AuthContext } from '../../Context/AuthContext'
import './WorkspaceDetailScreen.css'
import MessagesList from '../../Componente/MessagesList/MessagesList'

const WorkspaceDetailScreen = () => {
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const { session } = useContext(AuthContext)

    // Consolidamos todo en una sola extracción del Context
    const {
        getWorkspaceChannels,
        channels_list,
        channels_list_loading,
        workspace_list,
        getMessagesByChannel,
        messages_list,
        messages_list_loading,
        createMessage,
        createChannel
    } = useContext(WorkspaceContext);

    const [selectedChannel, setSelectedChannel] = useState(null)
    const [messageInput, setMessageInput] = useState('')

    useEffect(() => {
        if (workspace_id) {
            getWorkspaceChannels(workspace_id)
        }
    }, [workspace_id])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (messageInput.trim() && selectedChannel) {
            try {
                await createMessage(workspace_id, selectedChannel._id, messageInput.trim());
                setMessageInput('')
            } catch (error) {
                console.error("Error al enviar mensaje:", error);
            }
        }
    };

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel)
        getMessagesByChannel(workspace_id, channel._id)
        // Navegación opcional si manejas rutas de canales
        navigate(`/workspace/${workspace_id}/channel/${channel._id}`)
    }

    const handleAddChannel = async () => {
        const nombre = prompt("Introduce el nombre del nuevo canal:");
        if (nombre && nombre.trim().length > 0) {
            try {
                await createChannel(workspace_id, nombre.trim());
                getWorkspaceChannels(workspace_id);
            } catch (error) {
                console.error("Error al crear el canal:", error);
                alert("No se pudo crear el canal.");
            }
        }
    };

    // Helpers de datos
    const channels = channels_list?.data?.channels || channels_list?.data || [];
    const currentWorkspace = workspace_list?.data?.workspaces?.find(
        ws => String(ws.workspace_id) === String(workspace_id))
    const currentWorkspaceName = currentWorkspace?.workspace_titulo || "Cargando...";

    return (
        <div className="workspace-detail-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>{currentWorkspaceName}</h2>
                    {/* Flecha alineada a la derecha */}
                    <button
                        className="back-btn"
                        onClick={() => navigate('/home')}
                        title="Volver a mis workspaces"
                    >
                        <i className="bi bi-arrow-left-short"></i>
                    </button>
                </div>

                <nav className="channels-nav">
                    <h3>Canales</h3>
                    <ul>
                        {channels_list_loading ? (
                            <li>Cargando...</li>
                        ) : channels.length > 0 ? (
                            channels.map(channel => (
                                <li
                                    key={channel._id}
                                    className={selectedChannel?._id === channel._id ? 'active' : ''}
                                    onClick={() => handleChannelSelect(channel)}
                                >
                                    # {channel.nombre}
                                </li>
                            ))
                        ) : (
                            <li>No hay canales</li>
                        )}
                    </ul>
                    <button className="create-channel-btn" onClick={handleAddChannel}>
                        + Añadir canal
                    </button>
                </nav>
            </aside>

            <main className="chat-area">
                <header className="chat-header">
                    <h1>{selectedChannel ? `# ${selectedChannel.nombre}` : `Bienvenidos a ${currentWorkspaceName}!`}</h1>
                </header>

                <div className="message-list-container">
                    {messages_list_loading && !messages_list ? (
                        <div className="loader-container"><span className="loader"></span></div>
                    ) : selectedChannel ? (
                        <>
                            <MessagesList messages={messages_list?.data?.messages || messages_list?.data || []} />

                            {/* Input solo aparece si hay canal */}
                            <div className="chat-input-area">
                                <form onSubmit={handleSendMessage}>
                                    <input
                                        type="text"
                                        placeholder={`Enviar mensaje a #${selectedChannel.nombre}`}
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                    <button type="submit">Enviar</button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state-wrapper">
                            <div className="header_logo">
                                <img className='logo_slack' src='/Slack_logo.png' alt='logo_Slack' />
                            </div>
                            <div className="empty-state-text">
                                Selecciona un canal para ver los mensajes
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default WorkspaceDetailScreen;