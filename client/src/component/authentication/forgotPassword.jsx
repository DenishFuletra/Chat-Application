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
    useToast,
    Text

} from '@chakra-ui/react'
import axios from 'axios'
import OtpModal from '../modal/otpModal';


export default function ForgotPassword({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const toast = useToast()
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async () => {
        if (isValidEmail(email)) {
            console.log(email);
            try {
                setLoading(true);
                // const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/user/sendOTP`, { email: email });
                // toast({
                //     title: response.data.message,
                //     status: 'success',
                //     duration: 4000,
                //     isClosable: true,
                //     position: 'top-right',
                //     variant: 'left-accent'
                // })
                setLoading(false);
                setShowOtpModal(true);
            } catch (err) {
                console.log(err.response.data.message);
                toast({
                    title: err.response.data.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'left-accent'
                })
                setLoading(false);
            }


        } else {
            setIsValid(false);
        }
    }

    return (
        <div>
            <ModalContent padding='20px'>
                <ModalHeader
                    fontSize={30}
                    display='flex'
                    justifyContent='center'
                >
                    Password Reset
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text bg='#FFFFE0' p={5}>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</Text>
                    <FormControl display="flex" flexDirection='column' gap='5px' mt={6}>
                        <Input
                            placeholder="Type your Email Address"
                            type='email'
                            mb={3}
                            isRequired={true}
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setIsValid(true); }}
                        />
                        {!isValid && (
                            <Text color="red" fontSize="sm">
                                Invalid email address. Please enter a valid email.
                            </Text>
                        )}

                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <OtpModal isOpen={showOtpModal} onClose={() => setShowOtpModal(false)}>
                        <Button colorScheme='blue' mr={3} onClick={handleResetPassword} isLoading={loading} >
                            Reset My Password
                        </Button>
                    </OtpModal>
                </ModalFooter>
            </ModalContent>

        </div >
    )
}
