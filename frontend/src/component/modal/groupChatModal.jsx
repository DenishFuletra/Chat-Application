import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast
} from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider';
import axios from 'axios'
import ChatLoading from '../miscellaneous/chatLoading'
import UserList from '../miscellaneous/userList';


export default function GroupChatModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, setUser } = ChatState();
    const toast = useToast();

    useEffect(() => {
        if (!search) {
            setSearchResult([]);
        }
    }, [search])

    // const handleSearch = async (searchUser) => {
    //     // console.log(searchUser)
    //     setSearch(searchUser);
    //     if (!searchUser) {
    //         setSearchResult([])
    //         return;
    //     }
    //     try {
    //         setLoading(true);
    //         const headers = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             }
    //         };
    //         if (searchUser) {
    //             const result = await axios.get(`${process.env.REACT_APP_BASEURL}/api/user/getAllUsers?search=${searchUser}`, headers);
    //             console.log(searchUser);
    //             setTimeout(() => {
    //                 setSearchResult(result.data)
    //             }, 500);
    //             setLoading(false);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    const handleSearch = async (searchUser) => {
        setLoading(true);
        setSearch(searchUser);

        if (!searchUser) {
            setSearchResult([]);
            setLoading(false);
            return;
        }

        try {
            const headers = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/user/getAllUsers?search=${searchUser}`, headers);
            setSearchResult(response.data);
        } catch (error) {
            console.log(error.message);
        }

        setLoading(false);
    };




    const handleGroup = (id) => {

        if (selectedUser.includes(id)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        setSelectedUser([...selectedUser, id]);
    }


    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        display="flex"
                        justifyContent="center"
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input placeholder="Enter the Group name"
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>

                            <Input placeholder="Add Users eg: Denish, Bharat, Shantanu"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>

                        {loading === true ? (
                            <ChatLoading />
                        ) : search ? (
                            <Stack overflowY="scroll">
                                {searchResult.map(data => (
                                    <UserList key={data._id} user={data} handleFunction={() => handleGroup(data._id)} />
                                ))}
                            </Stack>
                        ) : null}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Create Chat
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
