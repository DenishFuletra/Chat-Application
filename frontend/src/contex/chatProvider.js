import { createContext, useContext, useState, useEffect } from 'react';
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState({});
    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
