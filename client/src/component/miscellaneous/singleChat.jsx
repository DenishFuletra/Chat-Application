import React, { useState } from 'react'
import { ChatState } from '../../contex/chatProvider';
import { Box, Text, IconButton, Avatar, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import ProfileModal from '../modal/profileModal'
import GroupProfileModal from '../modal/groupProfileModal'
import { getSenderName, getSenderPic } from './myChat'
import { Spinner } from './spinner'
import { Search2Icon, CloseIcon, BellIcon } from '@chakra-ui/icons';



const SingleChat = () => {
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();


    const getSender = (loggedUser, users) => {
        if (users) {
            return users[0]._id === loggedUser.id ? users[1] : users[0];
        }
    };

    const sendMessage = () => {

    }
    const typingHandler = () => {

    }

    return (
        <Box fontSize={{ base: "28px", md: "30px" }}
            width="100%"
            height='100%'
            display="flex"
            flexDirection='column'
            justifyContent={{ base: "flex-start" }}

        >
            {selectedChat ? <Box height='90%'>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    px={5}
                    width="100%"
                    display="flex"
                    flexDirection='row'
                    justifyContent='flex-start'
                    alignItems="center"
                    pt={2}
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
                    alignItems='center'
                    p={3}
                    width="100%"
                    height="100%"
                    borderRadius="lg"
                    mt='10px'
                    backgroundImage='https://themesbrand.com/doot/layouts/assets/images/bg-pattern/pattern-05.png'
                    overflowY="hidden">
                    {loading ? (<Box margin='auto' ><Spinner /></Box>) : null}
                    <FormControl marginTop='600px' onKeyDown={sendMessage} isRequired mt={3}>
                        <InputGroup>
                            <Input
                                // variant="filled"
                                // bg="#E0E0E0"
                                placeholder="Enter a message.."
                                onChange={typingHandler}
                                value={newMessage}
                            >
                            </Input>
                            <InputRightElement>
                                <i class="fa-regular fa-paper-plane fa-beat-fade"></i>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
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