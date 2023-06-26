import React from 'react'
import UpperDrawer from '../component/miscellaneous/upperDrawer'
import MyChat from '../component/miscellaneous/myChat'
import ChatBox from '../component/miscellaneous/chatBox'
import { Container, Box, Text } from '@chakra-ui/react'
import './chat.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ChatState } from '../contex/chatProvider';



export default function Chat() {
    const { user, selectedChat, setSearchResult } = ChatState();
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    // console.log('user', user);

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

    useEffect(() => {

        if (user.token) {
            fetchChat();
        }
    }, [user, search]);

    return (
        <div id='style-chat'>
            <Box
                display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'
                alignContent='cenrter'
                gap="10px"
                padding="10px"
                width='35%'
                height='100%'
                boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
            >
                <UpperDrawer setLoading={setLoading} search={search} setSearch={setSearch} />
                <MyChat setLoading={setLoading} loading={loading} search={search} />
            </Box>
            <Box width='90%'
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                height='95vh'
                border='5px solid blue'
                marginRight={4}
            >
                <ChatBox />
            </Box>

        </div>

    )
}