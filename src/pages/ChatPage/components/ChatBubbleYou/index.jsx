import React from 'react';

function ChatBubbleYou({ text, time }) {
    const timeX = new Date(time).getTime();
    return (
        <div className="chat-bubble you">
            <div className="your-mouth" />
            <div className="content"> { text }</div>
            <div className="time">{ timeX }</div>
        </div>
    );
}

export default ChatBubbleYou;