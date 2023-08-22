import React, { useState, useEffect } from 'react'
import { ChatState } from '../../contex/chatProvider';
import { Box, Text, Avatar, FormControl, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import ProfileModal from '../modal/profileModal'
import GroupProfileModal from '../modal/groupProfileModal'
import { getSenderName, getSenderPic } from './myChat'
import { Spinner } from './spinner'
import './singleChat.css';
import ScrollableChat from './scrollableChat';
import io from 'socket.io-client';
import Animation from '../animation/animation'
import { api } from '../../App';


const SingleChat = () => {
    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    //console.log(selectedChat);

    let socket;
    var selectedChatCompare;
    const toast = useToast()
    const ENDPOINT = process.env.REACT_APP_BASEURL
    socket = io(ENDPOINT);

    useEffect(() => {


        socket.emit('setUp', user);
        socket.on("connected", () => setSocketConnected(true));
    }, [user])

    useEffect(() => {
        socket.on('typing', (id) => {
            if (id !== user.id) {
                setIsTyping(true);
            }
        })

        socket.on('stop typing', (id) => {
            if (id !== user.id) {
                setIsTyping(false);
            }
        });
    });

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
            const response = await api.get(`/api/message/${selectedChat._id}`, headers);
            //console.log(response);
            setMessage(response.data);
            setLoading(false);
            socket.emit('join chat', selectedChat._id);


        } catch (error) {
            // console.log(error)
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
    // console.log(message[message.length - 1]);


    useEffect(() => {
        const receivedMessageIds = new Set();
        socket.on('message received', (newMessage) => {
            if (newMessage.sender._id !== user.id && !receivedMessageIds.has(newMessage._id)) {
                // console.log(message);
                setMessage((prevMessages) => [...prevMessages, newMessage]);
                receivedMessageIds.add(newMessage._id);
            }
        });
    });


    useEffect(() => {
        socket.on('notification received', (newMessage) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
                console.log('deny');
                if (!notification.includes(newMessage)) {
                    setNotification((prevNotifications) => [newMessage, ...prevNotifications]);

                }
            }
        });
    });

    console.log(notification);

    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage) {
            // socket.emit('stop typing', selectedChat._id, user.id);
            let m = newMessage
            setNewMessage('');
            const data = await api.post(`/api/message`, {
                content: m,
                chatId: selectedChat._id
            }
                , headers);
            socket.emit('new message', data.data);
            setMessage([...message, data.data]);
        }
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id, user.id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id, user.id);
                setTyping(false);
            }
        }, timerLength);
    };

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
                    <ChevronLeftIcon display={{ base: "flex", md: "none" }}
                        icon={<ChevronLeftIcon />}
                        onClick={() => setSelectedChat("")}
                        marginRight={2} />
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
                        {isTyping ? (<div style={{ marginBottom: '-20px' }}><Animation /></div>) : null}
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