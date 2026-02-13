import React from 'react'
import './Messages.css'

function Messages({ fk_ws_member_id, mensaje, created_at, authorId }) {
    const { session } = useContext(AuthContext);

    const esMensajePropio = fk_ws_member_id === session?.id || fk_ws_member_id === "Yo";

    return (
        <div className={esMensajePropio ? "mensaje_derecha" : "mensaje_izquierda"}>
            <div className='tarjeta_chat'>
                <span className='name_message'>
                    {fk_ws_member_id}
                </span>
                <p className='p_message'>{mensaje}</p>
                <span className='p_time'>{created_at}</span>
            </div>
        </div>
    )
}

export default Messages