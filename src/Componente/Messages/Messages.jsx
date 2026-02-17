import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext"
import './Messages.css'

function Messages({ fk_ws_member_id, mensaje, created_at, authorId }) {
    const { session } = useContext(AuthContext);

    const nombreAMostrar = typeof fk_ws_member_id === 'object'
        ? fk_ws_member_id?.fk_id_user?.username
        : fk_ws_member_id;

    const esMensajePropio = nombreAMostrar === "Yo" || nombreAMostrar === session?.username;

    const fecha = new Date(created_at);
    const hora = !isNaN(fecha.getTime())
        ? fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : created_at;

    return (
        <div className={esMensajePropio ? "mensaje_derecha" : "mensaje_izquierda"}>
            <div className='tarjeta_chat'>
                <span className='name_message'>
                    {esMensajePropio ? "Tú" : nombreAMostrar}
                </span>
                <p className='p_message'>{mensaje}</p>
                <span className='p_time'>{hora}</span>
            </div>
        </div>
    )
}

export default Messages