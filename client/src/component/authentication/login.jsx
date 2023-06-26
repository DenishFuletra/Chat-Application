import React from 'react'
import { VStack } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { useState } from 'react'
import { ChatState } from '../../contex/chatProvider';

export default function Login() {
    const toast = useToast()
    const navigate = useNavigate();
    const { user, setUser } = ChatState();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/user/login`, login);
            console.log(response);
            toast({
                title: response.data.message,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            })
            localStorage.setItem('userData', JSON.stringify(response.data.userData));
            setUser(response.data.userData);
            navigate('/chats');
        } catch (err) {
            console.log(err);
            toast({
                title: err.response ? err.response.data.message : err.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent'
            })
        }

    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} >
            <VStack>
                <FormControl>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' placeholder='Enter your email' required onChange={(e) => {
                        setLogin({
                            ...login,
                            email: e.target.value
                        })
                    }} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            onChange={(e) => {
                                setLogin({
                                    ...login,
                                    password: e.target.value
                                })
                            }}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button width="100%" border='2px'
                    borderColor='purple.500'
                    style={{ marginTop: 30 }}
                    type="submit"
                >
                    Login
                </Button>

            </ VStack>
        </form>
    )
}
