import React, { useState, useEffect } from 'react'
import { ChatState } from '../../contex/chatProvider';
import { Box, Text, IconButton, Avatar, FormControl, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import ProfileModal from '../modal/profileModal'
import GroupProfileModal from '../modal/groupProfileModal'
import { getSenderName, getSenderPic } from './myChat'
import { Spinner } from './spinner'
import axios from 'axios';



const SingleChat = () => {
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const toast = useToast()

    const headers = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        }
    }

    const getSender = (loggedUser, users) => {
        if (users) {
            return users[0]._id === loggedUser.id ? users[1] : users[0];
        }
    };

    const fetchMessage = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/message/${selectedChat._id}`, headers);
            console.log(response);
            setMessage(response.data);
            setLoading(false);


        } catch (error) {
            toast({
                title: 'Error occured while fetching message',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            })
        }
    }

    useEffect(() => {
        fetchMessage();
    }, [selectedChat])


    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage) {

            const data = await axios.post(`${process.env.REACT_APP_BASEURL}/api/message`, {
                content: newMessage,
                chatId: selectedChat._id
            }, headers);

            console.log(data);
            setNewMessage('');
            setMessage([...message, data.data.content]);
        }

    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value);
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
                <Box
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
                </Box>
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
                                onChange={(e) => typingHandler(e)}
                                value={newMessage}
                            >
                            </Input>
                            <InputRightElement>
                                <i className="fa-regular fa-paper-plane fa-beat-fade"></i>
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