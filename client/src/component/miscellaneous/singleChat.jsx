import React from 'react'
import { ChatState } from '../../contex/chatProvider';
import { Box, Text, IconButton, Heading, Avatar } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import ProfileModal from '../modal/profileModal'
import GroupProfileModal from '../modal/groupProfileModal'
import { getSenderName, getSenderPic } from './myChat'


const SingleChat = () => {
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const getSender = (loggedUser, users) => {
        if (users) {
            return users[0]._id === loggedUser.id ? users[1] : users[0];
        }
    };

    return (
        <Box fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            height='100%'
            display="flex"
            flexDirection='column'
            justifyContent={{ base: "flex-start" }}
            border='2px solid green'
        >
            {selectedChat ? <Box border='2px solid red'>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    width="100%"
                    display="flex"
                    flexDirection='row'
                    justifyContent='flex-start'
                    alignItems="center"
                    border='2px solid pink'
                    bg='blue'
                >
                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}

                    />

                    {!selectedChat.isGroupChat ?

                        <ProfileModal user={getSender(user, selectedChat.users)}>
                            <Box display='flex'
                                gap='10px'
                                alignItems='center'
                            >
                                <Avatar size='sm' src={getSenderPic(user, selectedChat.users)} cursor='pointer' />
                                <Text >
                                    {getSenderName(user, selectedChat.users).toUpperCase()}
                                </Text>
                            </Box>
                        </ProfileModal>
                        :
                        <Box>
                            <GroupProfileModal>{selectedChat.chatName.toUpperCase()}</GroupProfileModal></Box>
                    }
                </Text>
                <Box display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    width="100%"
                    height="100%"
                    borderRadius="lg"
                    overflowY="hidden">
                    start messenging
                </Box>

            </Box> : (

                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>

            )
            }
        </Box >
    )
}

export default SingleChat