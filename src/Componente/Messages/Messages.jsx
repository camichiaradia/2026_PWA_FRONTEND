import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import './Messages.css'

function Messages({ fk_ws_member_id, mensaje, created_at }) {
    const { session } = useContext(AuthContext);
    const miUserId = session?.id || session?._id;

    let esMensajePropio = false;

    if (fk_ws_member_id === "Yo") {
        esMensajePropio = true;
    } else if (typeof fk_ws_member_id === "object") {
        const autorId = fk_ws_member_id?.fk_id_user?._id;
        esMensajePropio = miUserId && autorId && String(miUserId) === String(autorId);
    }

    let nombreParaMostrar = "Usuario";
    if (esMensajePropio) {
        nombreParaMostrar = session?.username || "Yo";
    } else {
        nombreParaMostrar = typeof fk_ws_member_id === "object"
            ? fk_ws_member_id?.fk_id_user?.username
            : fk_ws_member_id;
    }


    const formatearFecha = (fecha) => {
        if (!fecha) return "";
        if (fecha.length <= 5) return fecha;
        const d = new Date(fecha);
        return isNaN(d) ? fecha : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={esMensajePropio ? "mensaje_derecha" : "mensaje_izquierda"}>
            <div className='tarjeta_chat'>
                <span className='name_message'>{nombreParaMostrar}</span>
                <p className='p_message'>{mensaje}</p>
                <span className='p_time'>{formatearFecha(created_at)}</span>
            </div>
        </div>
    )
}

export default Messages