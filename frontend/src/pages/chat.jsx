import React from 'react'
import UpperDrawer from '../component/miscellaneous/upperDrawer'
import MyChat from '../component/miscellaneous/myChat'
import ChatBox from '../component/miscellaneous/chatBox'
import { Container, Box, Text } from '@chakra-ui/react'
import './chat.css';


export default function Chat() {
    return (
        <div id='style-chat'>
            <Box

                display='flex'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'
                alignContent='cenrter'
                border='2px solid red'
                gap="10px"
                width="30%"
            >
                <UpperDrawer />
                <MyChat />
            </Box>
            <ChatBox />
        </div>

    )
}
