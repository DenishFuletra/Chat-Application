import React from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider';
import SingleChat from './singleChat';

export default function ChatBox() {
    const {  selectedChat } = ChatState();
    return (

        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDirection="row"
            justifyContent='center'
            height='100%'
            width={{ base: "100%", md: "100%" }}
            borderRadius='15px'
            
        >
            <SingleChat />
        </Box>

    )
}