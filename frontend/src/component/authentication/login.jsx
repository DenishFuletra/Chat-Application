import React from 'react'
import { VStack } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react'

export default function Login() {
    return (
        <VStack>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
            </FormControl>

        </ VStack>
    )
}
