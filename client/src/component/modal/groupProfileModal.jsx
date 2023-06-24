/* eslint-disable no-cond-assign */
import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    FormControl,
    Input,
    Stack,
    useToast

} from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider';
import UserBadge from './userBadge'
import axios from 'axios'
import ChatLoading from '../miscellaneous/chatLoading'
import UserList from '../miscellaneous/userList';


export default function GroupProfileModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat, searchResult, setSearchResult } = ChatState();
    const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
    const [search, setSearch] = useState('');
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (isOpen) {
            setSearch('');
        }
    }, [isOpen])
    console.log(search);
    const headers = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        }
    };


    const handleSearch = async (searchUser) => {
        setLoading(true);
        setSearch(searchUser);
        if (!searchUser) {
            setUserList([]);
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/user/getAllUsers?search=${searchUser}`, headers);
            setUserList(response.data);
        } catch (error) {
            console.log(error.message);
        }

        setLoading(false);
    };

    const handleAddUser = async (data) => {
        try {
            if (user.id === selectedChat.groupAdmin._id) {
                selectedChat.users.forEach((user) => {
                    if (user._id === data._id) {
                        toast({
                            title: "User is already exist in the group",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                            position: "top",
                        });
                        return;
                    }
                })
                const Apidata = {
                    chatId: selectedChat._id,
                    userId: data._id

                }
                const result = await axios.put(`${process.env.REACT_APP_BASEURL}/api/chat/addInGroup`, Apidata, headers);
                setSelectedChat(result.data);
                searchResult.forEach((elem) => {
                    if (elem._id === result.data._id) {
                        console.log('deny')
                        elem.users = result.data.users
                    }
                })
                console.log(searchResult)
                setSearchResult(searchResult);
            } else {
                toast({
                    title: "Only Admin can add user in the group",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                return;
            }
        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.response.data.message,
                status: "failed",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }
    const handleRemoveUser = async (elem) => {
        console.log('data', elem);
        try {
            console.log('user', user.id, 'admin', selectedChat.groupAdmin._id);
            if (user.id === selectedChat.groupAdmin._id) {
                const Apidata = {
                    chatId: selectedChat._id,
                    userId: elem._id

                }
                const result = await axios.put(`${process.env.REACT_APP_BASEURL}/api/chat/removeFromGroup`, Apidata, headers);
                setSelectedChat(result.data);
                searchResult.forEach((elem) => {
                    if (elem._id === result.data._id) {
                        console.log('deny')
                        elem.users = result.data.users
                    }
                })
                console.log(searchResult)
                setSearchResult(searchResult);
            } else {
                toast({
                    title: "Only Admin can add user in the group",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleRename = async () => {
        try {

            if (!groupChatName) {
                toast({
                    title: "Group name is not empty",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                return;
            }
            const data = {
                chatId: selectedChat._id,
                name: groupChatName
            }

            const result = await await axios.put(`${process.env.REACT_APP_BASEURL}/api/chat/renameGroupChat`, data, headers);

            toast({
                title: "Group name is updated successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            searchResult.forEach((elem) => {
                if (elem._id === result.data._id) {
                    console.log('deny')
                    elem.chatName = result.data.chatName
                }
            })
            console.log(searchResult);
            // setSelectedChat(result.data);
            setSearchResult(searchResult);
            console.log('searchResult', searchResult)
            setSelectedChat(result.data);
            console.log('selectedChat', selectedChat)

            // onClose();
            // window.location.reload();


        } catch (error) {
            toast({
                title: "Error occured!",
                description: error.response.data.message,
                status: "failed",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }
    //console.log('selectedChatdata', selectedChat)
    return (
        <div>
            {children ? (<span onClick={onOpen}>{children} </span>) : null}
            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent padding='20px'>
                    <ModalHeader
                        fontSize={30}
                        display='flex'
                        justifyContent='center'
                        fontFamily='Work sans'
                    >{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            {selectedChat.users.map(elem => {
                                return (
                                    <UserBadge key={elem._id} user={elem}
                                        handleFunction={() => handleRemoveUser(elem)} />
                                )
                            })}
                        </Box>
                        <FormControl display="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                onClick={() => handleRename()}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl mt={4}>

                            <Input placeholder="Add Users to Group"
                                mb={1}
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        {loading === true ? (
                            <ChatLoading />
                        ) : search ? (
                            <Stack width='100%' overflowY="scroll">
                                {userList.slice(0, 4).map(data => (
                                    <UserList key={data._id} user={data} handleFunction={() => handleAddUser(data)} />
                                ))}
                            </Stack>
                        ) : null}

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
