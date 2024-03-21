import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children, memberId }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3005');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the webserver');
      if (memberId) {
        newSocket.emit('member_connected', { memberId });
      }
    });

    newSocket.on('unread_count', (count) => {
      setUnreadCount(count);
    });

    return () => {
      newSocket.off('connect');
      newSocket.off('unread_count');
      newSocket.close();
    };
  }, [memberId]);

  return (
    <WebSocketContext.Provider value={{ unreadCount }}>
      {children}
    </WebSocketContext.Provider>
  );
};
