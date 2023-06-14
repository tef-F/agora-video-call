import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const SocketProvider = ({ children }) => {
    var today = new Date();
    const authData = JSON.parse(localStorage.getItem('authData'));
    const time = today.toLocaleString();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState(1);
    const [name, setName] = useState('Unknown User');
    useEffect(() => {
        socket.on('me', (id) => {
            console.log('ID Socket: ', id);
            setMe(id);
            if (authData) {
                setName(authData.data.username);
            }
        });
    }, []);
    useEffect(() => {
        socket.on('chat', (data) => {
            setMessages([...messages, data]);
        });
    }, [messages]);

    const logout = (userId) => {
        socket.emit('logout', userId);
        setMe('');
        setName('');
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendClick = () => {
        socket.emit('chat', {
            id: authData.data._id || me,
            linkAvt: authData.data.linkAvt,
            message: message,
            type: 'text',
            time: time,
        });
        setMessage('');
    };
    return (
        <SocketContext.Provider
            value={{
                me,
                name,
                message,
                messages,
                handleSendClick,
                handleMessageChange,
                logout,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };
