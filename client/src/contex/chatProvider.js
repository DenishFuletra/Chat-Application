import { createContext, useContext, useState } from 'react';
import axios from 'axios';
const ChatContext = createContext();

export const api = axios.create({
    baseURL: 'https://api.example.com',
});

api.interceptors.request.use(
    function (config) {
        console.log('deny');
        config.headers['Authorization'] = 'Bearer your_access_token';
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

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
