import React from 'react'
import UpperDrawer from '../component/miscellaneous/upperDrawer'
import MyChat from '../component/miscellaneous/myChat'
import ChatBox from '../component/miscellaneous/chatBox'
import { Container, Box, Text } from '@chakra-ui/react'
import './chat.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ChatState } from '../contex/chatProvider';
import Cookies from 'js-cookie';



export default function Chat() {
    const { user, setUser, selectedChat, setSearchResult } = ChatState();
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    console.log('user', user);

    const fetchChat = async () => {
        if (loading === false && search === '') {
            setLoading(true);
            try {
                const headers = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                }
                const result = await axios.get(`${process.env.REACT_APP_BASEURL}/api/chat/fetchChat`, headers);
                //console.log(result);
                setSearchResult(result.data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        }
    }
    // useEffect(() => {
    //     if (Cookies.get('id')) {
    //         const idCookieValue = Cookies.get('id');
    //         const regexPattern = /j:"(.*?)"/;
    //         const matchId = idCookieValue.match(regexPattern);
    //         let userData = {
    //             id: matchId[1],
    //             name: Cookies.get('name'),
    //             email: Cookies.get('email'),
    //             profile: Cookies.get('profile'),
    //             token: Cookies.get('token')
    //         }
    //         console.log(userData)
    //         setUser(userData)
    //         localStorage.setItem('userData', JSON.stringify(userData));
    //     }

    // }, [user])

    useEffect(() => {

        if (user.token) {
            fetchChat();
        }
    }, [user, search]);

    return (
        <div id='style-chat'>
            <Box className='responsive-box'
                display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            >
                <UpperDrawer setLoading={setLoading} search={search} setSearch={setSearch} />
                <MyChat setLoading={setLoading} loading={loading} search={search} />
            </Box>
            <Box className='style_chat_box'
                width='90%'
                display={{ base: !selectedChat ? "none" : "flex", md: "flex" }}
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                height='100vh'
                bg='#2e2e2e'
                marginRight={0}
            >
                <ChatBox />
            </Box>

        </div >

    )
}
