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

export default function OtpModal({ signup, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');

    console.log(signup);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', signup.name);
        formData.append('email', signup.email);
        formData.append('password', signup.password);
        formData.append('confirmPassword', signup.confirmPassword);
        formData.append('profile', signup.profile);
        // try {
        //   const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/user/signup`, formData);
        //   console.log(response);
        //   toast({
        //     title: response.data.message,
        //     status: 'success',
        //     duration: 4000,
        //     isClosable: true,
        //     position: 'top-right',
        //     variant: 'left-accent'
        //   })
        // } catch (err) {
        //   console.log(err.response.data.message);
        //   toast({
        //     title: err.response.data.message,
        //     status: 'error',
        //     duration: 4000,
        //     isClosable: true,
        //     position: 'top-right',
        //     variant: 'left-accent'
        //   })
        // }
    }

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
                        <Button colorScheme='blue' margin='auto' mt={5} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
