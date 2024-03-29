import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();




const ChatProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState();
    const [searchResult, setSearchResult] = useState([])
    const [notification, setNotification] = useState([])

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, searchResult, setSearchResult, notification, setNotification }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
