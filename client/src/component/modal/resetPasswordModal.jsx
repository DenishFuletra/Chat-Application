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
    FormControl,
    Input,
    useToast

} from '@chakra-ui/react'
import { ChatState } from '../../contex/chatProvider';
import axios from 'axios'


export default function ResetPasswordModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat, searchResult, setSearchResult } = ChatState();

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')

    const toast = useToast();

    const headers = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        }
    };

    const handleResetPassword = async () => {
        try {
            const data = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            const result = await axios.put(`${process.env.REACT_APP_BASEURL}/api/user/resetPassword`, data, headers);
            if (result.data) {
                toast({
                    title: result.data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                onClose();
                return;
            }

        } catch (error) {
            console.log(error.response.data.message);
            toast({
                title: error.response ? error.response.data.message : error.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
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
                    >
                        Reset Password
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDirection='column' gap='5px'>
                            <Input
                                placeholder="Type your old password"
                                mb={3}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <Input
                                placeholder="Type your new password"
                                mb={3}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Input
                                placeholder="Retype your new password"
                                mb={3}
                                onChange={(e) => setReEnterPassword(e.target.value)}
                            />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleResetPassword} isDisabled={newPassword !== null && newPassword === reEnterPassword ? false : true}>
                            Reset Password
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div >
    )
}
