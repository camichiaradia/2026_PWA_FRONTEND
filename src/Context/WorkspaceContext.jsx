import { createContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import {
    getWorkspaceList,
    getChannelsByWorkspaceService,
    createMessageService,
    createChannelService
} from "../services/workspaceService";

export const WorkspaceContext = createContext({
    workspace_list_loading: false,
    workspace_list: null,
    workspace_list_error: null
});

const WorkspaceContextProvider = ({ children }) => {
    const listRequest = useRequest();
    const channelsRequest = useRequest();
    const createMessageRequest = useRequest();
    const createChannelRequest = useRequest();

    const [messages_list, setMessagesList] = useState({
        data: { messages: [] },
        loading: false,
        error: null
    });

    // Cargar Workspaces al inicio
    useEffect(() => {
        listRequest.sendRequest(getWorkspaceList);
    }, []);

    // FUNCIÓN: Obtener canales
    const getWorkspaceChannels = async (workspace_id) => {
        await channelsRequest.sendRequest(
            () => getChannelsByWorkspaceService(workspace_id)
        );
    };

    // FUNCIÓN: Obtener mensajes (Corregida con limpieza lógica)
    const getMessagesByChannel = async (workspace_id, channel_id, isNewChannel = false) => {
        if (isNewChannel) {
            setMessagesList({
                data: { messages: [] },
                loading: true,
                error: null
            });
        }

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`http://localhost:8080/api/workspace/${workspace_id}/channels/${channel_id}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-api-key': '4864da4a-2791-4113-931e-132644f2a3aa'
                }
            });
            const result = await response.json();

            if (result.ok) {
                setMessagesList({
                    data: { messages: result.data.messages || [] },
                    loading: false,
                    error: null
                });
            }
        } catch (error) {
            console.error("Error en getMessagesByChannel:", error);
            setMessagesList(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
        }
    };

    // FUNCIÓN: Crear mensaje
    const createMessage = async (workspace_id, channel_id, mensaje) => {
        await createMessageRequest.sendRequest(
            () => createMessageService(workspace_id, channel_id, mensaje)
        );
        // Actualización silenciosa (isNewChannel = false)
        await getMessagesByChannel(workspace_id, channel_id, false);
    };

    // FUNCIÓN: Crear canal
    const createChannel = async (workspace_id, channel_name) => {
        await createChannelRequest.sendRequest(
            () => createChannelService(workspace_id, channel_name)
        );
        await getWorkspaceChannels(workspace_id);
    };

    const provider_values = {
        // Workspaces
        workspace_list_loading: listRequest.loading,
        workspace_list: listRequest.response,
        workspace_list_error: listRequest.error,

        // Canales
        channels_list_loading: channelsRequest.loading,
        channels_list: channelsRequest.response,
        channels_list_error: channelsRequest.error,
        getWorkspaceChannels,
        createChannel,
        create_channel_loading: createChannelRequest.loading,

        // Mensajes
        messages_list_loading: messages_list.loading,
        messages_list: messages_list,
        messages_list_error: messages_list.error,
        getMessagesByChannel,
        createMessage,
        create_message_loading: createMessageRequest.loading
    };

    return (
        <WorkspaceContext.Provider value={provider_values}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceContextProvider;