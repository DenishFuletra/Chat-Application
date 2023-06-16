import React from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider';

export default function ChatBox() {
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
    return (

        <Box  >chatBox</Box>

    )
}
