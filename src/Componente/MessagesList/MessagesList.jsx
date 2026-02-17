import React, { useState } from 'react'
import Messages from '../Messages/Messages'
import "./MessagesList.css"

const MessagesList = (props) => {
    if (!props.messages || props.messages.length === 0) {
        return (
            <div className="empty-chat">
                <p>No hay mensajes en este canal.</p>
            </div>
        )
    }

    const messages_list_JSX = props.messages.map(
        (message) => {
            return (

                <Messages
                    key={message._id}
                    fk_ws_member_id={message.fk_ws_member_id}
                    mensaje={message.mensaje}
                    created_at={message.created_at}
                />
            )
        }
    )

    return (
        <div className="chat-container">
            {messages_list_JSX}
        </div>
    )
}

export default MessagesList

