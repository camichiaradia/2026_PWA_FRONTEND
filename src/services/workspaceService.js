import { ServerError } from "../utils/errorUtils"

const URL_API = import.meta.env.VITE_API_URL
const API_KEY = '4864da4a-2791-4113-931e-132644f2a3aa';

export async function getWorkspaceList() {
    const auth_token = localStorage.getItem('auth_token');

    const response_http = await fetch(
        URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
                'Authorization': `Bearer ${auth_token}`,
                'Content-Type': 'application/json',
            },
        }
    )
    const response = await response_http.json()
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}
export const getChannelsByWorkspaceService = async (workspace_id) => {
    const auth_token = localStorage.getItem('auth_token');

    const response_http = await fetch(
        URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
                'Authorization': `Bearer ${auth_token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const response = await response_http.json()
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}