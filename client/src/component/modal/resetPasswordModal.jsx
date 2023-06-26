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


export default function ResetPasswordModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat, searchResult, setSearchResult } = ChatState();

    const toast = useToast();


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
                    >
                        Reset Password
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDirection='column' gap='5px'>
                            <Input
                                placeholder="Type your old password"
                                mb={3}
                                onChange={(e) => console.log('object')}
                            />
                            <Input
                                placeholder="Type your new password"
                                mb={3}
                                onChange={(e) => console.log('object')}
                            />
                            <Input
                                placeholder="Retype your new password"
                                mb={3}
                                onChange={(e) => console.log('object')}
                            />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Reset Password
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
