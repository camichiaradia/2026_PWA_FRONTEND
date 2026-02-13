import React, { useState } from 'react'
import Messages from '../Messages/Messages'
import "./MessagesList.css"


const MessagesList = (props) => {


    const messages_list_JSX = props.messages.map(
        (message) => {
            return (

                <Messages
                    key={message.message_id}
                    author={message.fk_user_id}
                    content={message.message_content}
                    timestamp={message.message_created_at}
                    id={message.message_id} />
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

