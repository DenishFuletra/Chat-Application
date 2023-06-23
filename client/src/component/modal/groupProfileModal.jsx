import React, { useState } from 'react'
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
    Image,
    Text,
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
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);
    const toast = useToast();

    console.log(selectedChat);

    const handleRemove = (user) => {

    }
    const headers = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        }
    };
    const handleSearch = async (searchUser) => {
        setLoading(true);
        setSearch(searchUser);

        if (!searchUser) {
            setSearchResult([]);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/user/getAllUsers?search=${searchUser}`, headers);
            setSearchResult(response.data);
        } catch (error) {
            console.log(error.message);
        }

        setLoading(false);
    };

    const handleGroup = (data) => {
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

            console.log(result);

        } catch (error) {

        }
    }

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
                                        handleFunction={() => handleRemove(elem)} />
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
                                onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        {loading === true ? (
                            <ChatLoading />
                        ) : search ? (
                            <Stack width='100%' overflowY="scroll">
                                {searchResult.slice(0, 4).map(data => (
                                    <UserList key={data._id} user={data} handleFunction={() => handleGroup(data)} />
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
