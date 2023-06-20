import React from 'react'
import { ChatState } from '../../contex/chatProvider';
import { Box, Text } from '@chakra-ui/react'


const SingleChat = () => {
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

    return (
        <Box fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            
            display="flex"
            justifyContent={{ base: "center" }}
            alignItems="center">
            {selectedChat ? <></> : (

                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </Box>
    )
}

export default SingleChat