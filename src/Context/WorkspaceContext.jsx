import { createContext, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { getWorkspaceList, getChannelsByWorkspaceService } from "../services/workspaceService";


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
    const { loading, response, error, sendRequest } = useRequest()
    const URL_API = import.meta.env.VITE_API_URL;

    useEffect(
        () => {
            listRequest.sendRequest(
                getWorkspaceList
            )
        },
        []
    )

    const getWorkspaceChannels = async (workspace_id) => {
        await channelsRequest.sendRequest(
            () => getChannelsByWorkspaceService(workspace_id)
        );
    }

    const provider_values = {
        // Valores para HomeScreen
        workspace_list_loading: listRequest.loading,
        workspace_list: listRequest.response,
        workspace_list_error: listRequest.error,

        // Valores para WorkspaceDetailScreen
        channels_list_loading: channelsRequest.loading,
        channels_list: channelsRequest.response,
        channels_list_error: channelsRequest.error,
        getWorkspaceChannels
    }
    return (
        <WorkspaceContext.Provider
            value={provider_values}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider