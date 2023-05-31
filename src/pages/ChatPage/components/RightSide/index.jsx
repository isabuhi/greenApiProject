import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import ChatBubbleMe from '../ChatBubbleMe/index';
import ChatBubbleYou from '../ChatBubbleYou/index';

import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

import { chatApi } from '../../../../api/chatApi';
import { addMessage} from '../../../../redux/chatSlice';

import LocalStorage from '../../../../utils/localStorage/index';
import './index.css'


function RightSide({ phoneNumber }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState();
    const profile = useSelector((store) => store.auth)
    const messages = useSelector((store) => {
        return store.chat.addedAccounts.find((account) => account.phoneNumber === phoneNumber)?.messages;
    })
    let timestamp = Math.floor(Date.now())

    useEffect(() => {
        const request = () => {
            chatApi.receiveMessage(profile)
                .then((response) => {
                    if (response.data) {
                        const text = response.data?.body?.messageData?.textMessageData?.textMessage
                        const phoneNumber = "+" + response.data?.body?.from.replace(/\D/g, "")
                        console.log(phoneNumber)
                        if(text)
                            dispatch(
                                addMessage(
                                    {
                                        phoneNumber,
                                        message:
                                        {
                                            timestamp,
                                            text,
                                            key: "received"
                                        }
                                    }
                                )
                            )
                        const receiptId = response.data?.receiptId
                        if (receiptId)
                            chatApi.deleteMessage({ ...profile, receiptId })
                                .then(() => {
                                    request();
                                })
                    }
                    else
                        request()
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        request();
         
    }, [])

    const handleSend = () => {
        chatApi.sendMessage(({ ...profile, message: message, chatId }))
            .then(() => {
                dispatch(addMessage({ phoneNumber, message: {timestamp, text: message, key: "send"} }))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleLogout = () => {
        LocalStorage.clearStorage("auth");
        navigate(0);
    }

    let chatId = phoneNumber
    if (phoneNumber)
        chatId = phoneNumber.slice(1) + "@c.us"


    return (
        <section className="right">
            <div className="chat-head">
                <div className="chat-name">
                    <h1 className="font-name">
                        {phoneNumber}
                    </h1>
                </div>
                <Button onClick={handleLogout}>
                    <LogoutIcon  />
                </Button>
            </div>
            <div className="wrap-chat">
                <div className="chat">
                {
                    chatId ?
                    <>
                        {
                            messages.map((message, index) => {
                                if (message.key === "send")
                                    return <ChatBubbleMe text={message.text} time={message.timestamp} key={index} />
                                else
                                    return <ChatBubbleYou text={message.text} time={message.timestamp} key={index} />
                            })
                        }
                    </>
                    :
                    null
                }
                </div>
                <div className="information" />
            </div>       
            {
                chatId ?
                    < div className="wrap-message">
                        <i className="fa fa-smile-o fa-lg" aria-hidden="true" />
                        <div className="message">
                            <input
                                type="text"
                                className="input-message"
                                placeholder="Message"
                                onChange={(e) => { setMessage(e.target.value) }}
                            />
                        </div>
                        <Button onClick={handleSend}>
                            <SendIcon/>
                        </Button>
                    </div>
                    :
                    null
            }
        </section>
  );
}

export default RightSide;