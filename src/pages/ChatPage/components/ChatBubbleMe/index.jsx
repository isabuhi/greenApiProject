import React from 'react';

function ChatBubbleMe({ text, time }) {
    const date = new Date(time)
    const timeX = date.getHours() + " :" + date.getMinutes() + " :" + date.getSeconds();

    return (
        <div className="chat-bubble me">
            <div className="my-mouth" />
            <div className="content">{ text }</div>
            <div className="time">{ timeX }</div>
        </div>
    );
}

export default ChatBubbleMe;