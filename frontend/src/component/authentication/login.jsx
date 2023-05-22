import React from 'react'
import { VStack } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'

export default function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        console.log(login)
    }
    return (
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
                onClick={handleSubmit}
            >
                Login
            </Button>
        </ VStack>
    )
}
