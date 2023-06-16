import React, { useState } from 'react'
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
    Stack
} from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider';
import axios from 'axios'
import ChatLoading from '../miscellaneous/chatLoading'
import UserList from '../miscellaneous/userList';


export default function GroupChatModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, setUser } = ChatState();

    const handleSearch = async (search) => {
        if (!search) {
            return;
        }
        try {
            setLoading(true);
            const headers = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const result = await axios.get(`${process.env.REACT_APP_BASEURL}/api/user/getAllUsers?search=${search}`, headers);
            console.log(result);
            setSearchResult(result.data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
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
                        ) :
                            <Stack overflowY="scroll">
                                {searchResult.map(data => (
                                    <UserList key={data._id} user={data} />
                                ))}
                            </Stack>
                        }

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
