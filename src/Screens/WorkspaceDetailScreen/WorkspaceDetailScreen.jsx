import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { AuthContext } from '../../Context/AuthContext'
import './WorkspaceDetailScreen.css'
import BarraBuscador from '../../Componente/BarraBuscador/BarraBuscador.jsx'
import BarraLateral from '../../Componente/BarraLateral/BarraLateral.jsx'
import MenuLateral from '../../Componente/MenuLateral/MenuLateral.jsx'

const WorkspaceDetailScreen = () => {
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const { session } = useContext(AuthContext)

    const {
        getWorkspaceChannels,
        channels_list,
        workspace_list,
        getMessagesByChannel,
        createMessage,
        createChannel,
        create_channel_loading
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
        <div className="main-layout-container-ws-detail">
            <BarraBuscador workspaceName={currentWorkspaceName} />

            <div className="content-wrapper-ws-detail">
                <MenuLateral
                    workspaceName={currentWorkspaceName}
                    channels={channels}
                    currentChannelId={selectedChannel?._id}
                    onChannelSelect={handleChannelSelect}
                    userSession={session}
                    onAddChannelClick={handleAddChannel}
                    isLoadingChannel={create_channel_loading}
                />

                <BarraLateral
                    workspaceName={currentWorkspaceName}
                    channels={channels}
                    channel_id={selectedChannel?._id}
                    onChannelSelect={handleChannelSelect}
                />

                <main className="chat-area-ws-detail">
                    <header className="chat-header-slack-ws-detail">
                        <h1># {selectedChannel?.nombre || 'Selecciona un canal'}</h1>
                    </header>

                    {!selectedChannel ? (
                        <div className="empty-state-wrapper-ws-detail">
                            <div className="header_logo">
                                <img className='logo_slack' src='/Slack_logo.png' alt='logo_Slack' />
                            </div>
                            <div className="empty-state-text">
                                Selecciona un canal para ver los mensajes
                            </div>
                        </div>
                    ) : (
                        <div className="messages-container">

                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default WorkspaceDetailScreen;