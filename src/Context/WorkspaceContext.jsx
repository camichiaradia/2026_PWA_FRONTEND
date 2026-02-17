import { createContext, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { getWorkspaceList, getChannelsByWorkspaceService, getMessagesByChannelService, createMessageService, createChannelService } from "../services/workspaceService";


export const WorkspaceContext = createContext(
    {
        workspace_list_loading: false,
        workspace_list: null,
        workspace_list_error: null
    }
)

const WorkspaceContextProvider = ({ children }) => {
    const listRequest = useRequest();
    const channelsRequest = useRequest();
    const messagesRequest = useRequest();
    const createMessageRequest = useRequest();
    const createChannelRequest = useRequest();
    const URL_API = import.meta.env.VITE_API_URL;



    useEffect(
        () => {
            listRequest.sendRequest(
                getWorkspaceList
            )
        },
        []
    )
    //FUNCIÓN: Obtener canales
    const getWorkspaceChannels = async (workspace_id) => {
        await channelsRequest.sendRequest(
            () => getChannelsByWorkspaceService(workspace_id)
        );
    }

    //FUNCIÓN: Obtener mensajes
    const getMessagesByChannel = async (workspace_id, channel_id) => {
        await messagesRequest.sendRequest(
            () => getMessagesByChannelService(workspace_id, channel_id)
        );
    }

    //FUNCIÓN: Crear mensaje
    const createMessage = async (workspace_id, channel_id, mensaje) => {
        await createMessageRequest.sendRequest(
            () => createMessageService(workspace_id, channel_id, mensaje)
        );
        // Opcional: Recargar mensajes después de crear uno
        await getMessagesByChannel(workspace_id, channel_id);
    }

    //FUNCIÓN: Crear canal
    const createChannel = async (workspace_id, channel_name) => {
        await createChannelRequest.sendRequest(
            () => createChannelService(workspace_id, channel_name)
        );
        // Opcional: Recargar canales después de crear uno
        await getWorkspaceChannels(workspace_id);
    }

    const provider_values = {
        // Workspaces (HomeScreen)
        workspace_list_loading: listRequest.loading,
        workspace_list: listRequest.response,
        workspace_list_error: listRequest.error,

        // Canales (WorkspaceDetailScreen)
        channels_list_loading: channelsRequest.loading,
        channels_list: channelsRequest.response,
        channels_list_error: channelsRequest.error,
        getWorkspaceChannels,
        createChannel,
        create_channel_loading: createChannelRequest.loading,


        // Mensajes (ChannelMessageScreen)
        messages_list_loading: messagesRequest.loading,
        messages_list: messagesRequest.response,
        messages_list_error: messagesRequest.error,
        getMessagesByChannel,
        createMessage,
        create_message_loading: createMessageRequest.loading // Exponer loading para deshabilitar botón mientras envía
    };

    return (
        <WorkspaceContext.Provider
            value={provider_values}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider