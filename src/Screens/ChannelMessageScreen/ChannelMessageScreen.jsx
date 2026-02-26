import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { AuthContext } from '../../Context/AuthContext'
import MessagesList from '../../Componente/MessagesList/MessagesList'
import './ChannelMessageScreen.css'
import { staticChannelsData } from "../../data/staticChannelsData.js"
import BarraBuscador from '../../Componente/BarraBuscador/BarraBuscador.jsx'
import BarraLateral from '../../Componente/BarraLateral/BarraLateral.jsx'
import MenuLateral from '../../Componente/MenuLateral/MenuLateral.jsx'




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
        createMessage,
        createChannel,
        create_channel_loading
    } = useContext(WorkspaceContext);

    const [messageInput, setMessageInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [optimisticMessages, setOptimisticMessages] = useState([]);

    //Obtener canales
    useEffect(() => {
        if (workspace_id) getWorkspaceChannels(workspace_id)
    }, [workspace_id])

    //Obtener mensajes
    useEffect(() => {
        if (workspace_id && channel_id) {
            getMessagesByChannel(workspace_id, channel_id, true);
            setOptimisticMessages([]);
        }
    }, [channel_id, workspace_id]);


    // Procedimiento de datos
    const channels = channels_list?.data?.channels || []
    const selectedChannel = channels.find(
        channel => String(channel._id) === String(channel_id))

    const apiMessages = messages_list?.data?.messages || [];

    const channelName = selectedChannel?.nombre?.toLowerCase().trim();
    const staticMessages = staticChannelsData[channelName] || [];

    const messages = [...staticMessages, ...apiMessages, ...optimisticMessages];

    const currentWorkspace = workspace_list?.data?.workspaces?.find(
        ws => String(ws.workspace_id) === String(workspace_id)
    )
    const currentWorkspaceName = currentWorkspace?.workspace_titulo || "Cargando..."

    const handleSendMessage = async (event) => {
        event.preventDefault()

        if (!messageInput.trim() || !selectedChannel || isSending) return

        const nuevoMensajeTexto = messageInput.trim()

        const mensajeTemporal = {
            _id: Date.now().toString(),
            mensaje: nuevoMensajeTexto,
            fk_ws_member_id: {
                fk_id_user: {
                    _id: session?.id,
                    username: session?.username
                }
            },
            created_at: new Date().toISOString()
        }

        setOptimisticMessages(prev => [...prev, mensajeTemporal])
        setMessageInput('')
        setIsSending(true)

        try {
            await createMessage(workspace_id, channel_id, nuevoMensajeTexto)
            setOptimisticMessages([])
        } catch (error) {
            alert("Error al enviar")
        } finally {
            setIsSending(false)
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

    const handleAddChannel = async () => {
        const nombreCanal = prompt("Nombre del nuevo canal:");

        // Validaciones básicas
        if (!nombreCanal) return;
        if (nombreCanal.trim().length < 3) {
            return alert("El nombre debe tener al menos 3 caracteres.");
        }

        try {
            await createChannel(workspace_id, nombreCanal.trim());
        } catch (error) {
            alert("No se pudo crear el canal. Intenta de nuevo.");
        }
    };

    return (
        <div className="main-layout-container">
            <BarraBuscador workspaceName={currentWorkspaceName} />

            <div className="content-wrapper">
                <MenuLateral
                    workspaceName={currentWorkspaceName}
                    channels={channels}
                    currentChannelId={channel_id}
                    onChannelSelect={handleChannelSelect}
                    userSession={session}
                    onAddChannelClick={handleAddChannel}
                    isLoadingChannel={create_channel_loading}
                />

                <BarraLateral
                    workspaceName={currentWorkspaceName}
                    channels={channels}
                    channel_ id={selectedChannel?._id}
                    onChannelSelect={handleChannelSelect}
                />

                <main className="chat-area">
                    {/* 1. Encabezado fijo arriba */}
                    <header className="chat-header-slack">
                        <h1># {selectedChannel?.nombre}</h1>
                    </header>

                    {/* 2. Lista de mensajes que ocupa el centro */}
                    <div className="message-list">
                        <MessagesList messages={messages} />
                    </div>

                    {/* 3. Footer SIEMPRE al final de la columna */}
                    <footer className="chat-input-container">
                        <div className="chat-input-box">
                            {/* Barra de herramientas superior */}
                            <div className="input-toolbar">
                                <span className="toolbar-icon">B</span>
                                <span className="toolbar-icon">I</span>
                                <span className="toolbar-icon"><s>S</s></span>
                                <span className="toolbar-icon">🔗</span>
                                <span className="toolbar-icon">≡</span>
                            </div>

                            {/* Área de escritura y botón */}
                            <form onSubmit={handleSendMessage} className="input-form">
                                <input
                                    type="text"
                                    className="main-input"
                                    placeholder={selectedChannel ? `Enviar mensaje a #${selectedChannel.nombre}` : "Selecciona un canal"}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    disabled={!selectedChannel}
                                />
                                <div className="input-actions">
                                    <button
                                        type="submit"
                                        className={`send-button ${messageInput.trim() ? 'active' : ''}`}
                                        disabled={!selectedChannel || !messageInput.trim() || isSending}
                                    >
                                        {isSending ? "..." : "➤"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </footer>
                </main>


            </div>
        </div>
    );
}

export default ChannelMessageScreen