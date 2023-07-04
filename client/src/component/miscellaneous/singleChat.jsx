import React, { useState, useEffect } from 'react'
import { ChatState } from '../../contex/chatProvider';
import { Box, Text, IconButton, Avatar, FormControl, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import ProfileModal from '../modal/profileModal'
import GroupProfileModal from '../modal/groupProfileModal'
import { getSenderName, getSenderPic } from './myChat'
import { Spinner } from './spinner'
import axios from 'axios';
import './singleChat.css';
import ScrollableChat from './scrollableChat';
import io from 'socket.io-client';

const SingleChat = () => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false)
    let [socket, setSocket] = useState(null);
    var selectedChatCompare;
    const toast = useToast()
    const ENDPOINT = process.env.REACT_APP_BASEURL
    socket = io(ENDPOINT);
    console.log(message);
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
            //console.log(response);
            setMessage(response.data);
            setLoading(false);
            socket.emit('join chat', selectedChat._id);


        } catch (error) {
            console.log(error)
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
        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {
        if (user.id) {
            socket.emit('setUp', user);
            socket.on('connection', () => { setSocketConnected(true) })
        }
    }, [user])


    // useEffect(() => {
    //     socket.on('message received', (newMessage) => {
    //         if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
    //             // Handle the case where the received message does not match the selected chat
    //         } else {
    //             setMessage((prevMessages) => [...prevMessages, newMessage]);
    //         }
    //     });

    //     return () => {
    //         socket.off('message received'); // Clean up the event listener when the component unmounts
    //     };
    // }, [selectedChatCompare]);

    useEffect(() => {
        socket.on('message received', (newMessage) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
                // Handle the case where the received message does not match the selected chat
            } else {
                setMessage((prevMessages) => [...prevMessages, newMessage]);
            }
        });
    }, [selectedChatCompare]);







    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage) {

            const data = await axios.post(`${process.env.REACT_APP_BASEURL}/api/message`, {
                content: newMessage,
                chatId: selectedChat._id
            }, headers);

            // console.log(data);
            setNewMessage('');
            socket.emit('new message', data.data);
            setMessage([...message, data.data]);

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
                    height="98%"
                    borderRadius="lg"
                    mt='10px'
                    backgroundImage='https://themesbrand.com/doot/layouts/assets/images/bg-pattern/pattern-05.png'
                    overflowY="hidden">
                    {loading ? (<Box margin='auto' ><Spinner /></Box>) :
                        <div className='message'>
                            <ScrollableChat message={message} />
                        </div>
                    }
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