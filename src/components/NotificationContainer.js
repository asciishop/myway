import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css'

import socketIOClient from "socket.io-client";
import {FiBell} from "react-icons/fi";
import {Badge} from "react-bootstrap";
const ENDPOINT = "https://myways.cl:4000";




function NotificationContainer() {

    const [response, setResponse] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.emit('authenticate', {token: localStorage.getItem("token")});
        socket.on("FromAPI", data => {
            setResponse(data);
        });
        socket.on("message", data => {
            setResponse(data);
            messages.push(data)
            setMessages(messages)
        });
    }, []);


    return (

                <p>
                    <FiBell/> <Badge variant="info">{messages.length +1}</Badge>
                    It's Message <h2>{messages}</h2>
                </p>

    )
}

export default NotificationContainer
