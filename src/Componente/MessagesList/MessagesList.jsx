import React, { useState } from 'react'
import Messages from '../Messages/Messages'
import "./MessagesList.css"


const MessagesList = (props) => {


    const messages_list_JSX = props.messages.map(
        (message) => {
            return (

                <Messages
                    key={message._id || message.id || Math.random()}
                    fk_ws_member_id={message.fk_ws_member_id || message.fk_user_id}
                    mensaje={message.mensaje || message.message_content}
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

