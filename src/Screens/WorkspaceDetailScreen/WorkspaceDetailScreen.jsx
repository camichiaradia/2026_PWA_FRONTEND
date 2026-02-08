import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { AuthContext } from '../../Context/AuthContext'
import './WorkspaceDetailScreen.css'

const WorkspaceDetailScreen = () => {
    const { workspace_id } = useParams() // Obtiene el ID del workspace de la URL
    const { session } = useContext(AuthContext)
    const { getWorkspaceChannels, channels_list, channels_list_loading, channels_list_error, workspace_list } = useContext(WorkspaceContext);

    const [selectedChannel, setSelectedChannel] = useState(null)
    const [messageInput, setMessageInput] = useState('')
    // Simulamos mensajes (en una app real vendrían de la API)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Cargar los canales del workspace cuando el componente se monte o el workspace_id cambie
        if (workspace_id) {
            getWorkspaceChannels(workspace_id)
        }
    }, [workspace_id])

    // Lógica para cuando los canales se cargan, seleccionar el primero por defecto
    useEffect(() => {
        const channels = channels_list?.data?.channels
        if (channels && channels.length > 0 && !selectedChannel) {
            setSelectedChannel(channels[0])
            loadMessagesForChannel(channels[0]._id) // Usamos _id de MongoDB
        }
    }, [channels_list, selectedChannel]) // Dependencias para evitar bucles infinitos

    const loadMessagesForChannel = (channelId) => {
        // Simulación de carga de mensajes. En una app real, harías una llamada a la API.
        console.log(`Cargando mensajes para el canal: ${channelId}`)
        setMessages([
            { id: 1, user: 'Bot', text: `¡Bienvenido al canal principal de este workspace!`, timestamp: '10:00 AM' },
            { id: 2, user: session?.nombre || 'Tú', text: `Hola a todos, ¿cómo están?`, timestamp: '10:05 AM' }
        ])
        // Implementar aquí la lógica real para obtener mensajes del backend
    };

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (messageInput.trim() && selectedChannel) {
            const newMessage = {
                id: messages.length + 1,
                user: session?.nombre || 'Usuario Anónimo', // Usa el nombre del usuario logueado
                text: messageInput.trim(),
                timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            }
            setMessages([...messages, newMessage])
            setMessageInput('')
            // Aquí iría la llamada a la API para enviar el mensaje
            console.log(`Mensaje enviado al canal ${selectedChannel.channel_id}: "${newMessage.text}"`);
        }
    };

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel)
        loadMessagesForChannel(channel._id)
    }

    /*  // Función para manejar la selección de un canal
     if (channels_list_loading) return <div className="loader"></div>
     if (channels_list_error) return <div className="error">Error: {channels_list_error.message}</div> */

    // Obtener datos de forma segura
    const channels = channels_list?.data?.channels || channels_list?.data || [];
    console.log("Datos recibidos de la API:", channels_list);

    const currentWorkspace = workspace_list?.data?.workspaces?.find(
        ws => String(ws.workspace_id) === String(workspace_id))

    // Si no lo encuentra (porque aún carga o no existe), usamos un fallback
    const currentWorkspaceName = currentWorkspace?.workspace_titulo || "Cargando workspace...";

    return (
        <div className="workspace-detail-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>{currentWorkspaceName}</h2>
                    <span className="user-status">🟢 {session?.nombre || 'Usuario'}</span>
                </div>
                <nav className="channels-nav">
                    <h3>Canales</h3>
                    <ul>
                        {channels_list_loading ? (
                            <li>Cargando...</li>
                        ) : channels.length > 0 ? (
                            channels.map(channel => (
                                <li key={channel._id} onClick={() => handleChannelSelect(channel)}>
                                    # {channel.nombre}
                                </li>
                            ))
                        ) : (
                            <li>No hay canales</li>
                        )}
                    </ul>
                    <button className="create-channel-btn">+ Añadir canal</button>
                </nav>
            </aside>

            <main className="chat-area">
                <header className="chat-header">
                    {selectedChannel ? (
                        <>
                            <h2># {selectedChannel.nombre}</h2>
                            <p>{selectedChannel.description || 'Sin descripción'}</p>
                        </>
                    ) : (
                        <h2>Selecciona un canal</h2>
                    )}
                </header>

                <div className="message-list">
                    {messages.length > 0 ? (
                        messages.map(msg => (
                            <div key={msg.id} className="message-item">
                                <div className="message-avatar">
                                    {msg.user.charAt(0).toUpperCase()}
                                </div>
                                <div className="message-content">
                                    <span className="message-user">{msg.user}</span>
                                    <span className="message-timestamp">{msg.timestamp}</span>
                                    <p className="message-text">{msg.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-chat">
                            <p>Sé el primero en enviar un mensaje en este canal.</p>
                        </div>
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
                        <button type="submit" disabled={!selectedChannel || !messageInput.trim()}>Enviar</button>
                    </form>
                </footer>
            </main>
        </div>
    );
};

export default WorkspaceDetailScreen;