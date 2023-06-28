import React from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider';
import SingleChat from './singleChat';

export default function ChatBox() {
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
    return (

        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDirection="row"
            justifyContent='center'
            //p={3}
            height='100%'
            mt='-12px'
            // bg="white"
            w={{ base: "100%", md: "100%" }}
           // borderRadius="lg"
            // borderWidth="1px"
            
        // border='2px solid red'

        >
            <SingleChat />
        </Box>

    )
}