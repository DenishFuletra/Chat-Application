import React from 'react'
import UpperDrawer from '../component/miscellaneous/upperDrawer'
import MyChat from '../component/miscellaneous/myChat'
import ChatBox from '../component/miscellaneous/chatBox'
import { Container, Box, Text } from '@chakra-ui/react'
import './chat.css';
import { useState } from 'react'


export default function Chat() {
    const [searchResult, setSearchResult] = useState('')

    return (
        <div id='style-chat'>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='center'
                alignContent='cenrter'
                // border='2px solid red'
                gap="10px"
                padding="10px"
                width="30%"
                boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"

            >
                <UpperDrawer setSearchResult={setSearchResult} />
                <MyChat searchResult={searchResult} />
            </Box>
            <ChatBox />
        </div>

    )
}
