import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    HStack,
    ModalBody,
    ModalCloseButton,
    Button,
    PinInput,
    PinInputField,
    Box,
    ModalFooter

} from '@chakra-ui/react'

export default function OtpModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');

    return (
        <div style={{ width: '100%' }}>
            {children ? (<Box onClick={onOpen}>{children} </Box>) : null}
            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent padding='20px'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    margin='auto'
                >
                    <ModalHeader
                        fontSize={40}
                        display='flex'
                        justifyContent='center'
                        fontFamily='Work sans'
                    >Enter the OTP
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack margin='auto' display='flex' justifyContent='center'>
                            <PinInput>
                                <PinInputField onChange={(e) => setPin1(e.target.value)} />
                                <PinInputField onChange={(e) => setPin2(e.target.value)} />
                                <PinInputField onChange={(e) => setPin3(e.target.value)} />
                                <PinInputField onChange={(e) => setPin4(e.target.value)} />
                            </PinInput>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' margin='auto' mt={5} onClick={onClose}>
                            Submit
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
