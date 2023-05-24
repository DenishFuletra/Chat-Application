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

import { useState } from 'react'

export default function Signup() {
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: null
  })
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    console.log(signup)
  }
  return (
    <VStack>
      <FormControl>
        <FormLabel>Name </FormLabel>
        <Input type='text' placeholder='Enter your name' required onChange={(e) => {
          setsignup({
            ...signup,
            name: e.target.value
          })
        }} />
      </FormControl>

      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type='email' placeholder='Enter your email' required onChange={(e) => {
          setsignup({
            ...signup,
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
              setsignup({
                ...signup,
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

      <FormControl>
        <FormLabel>Confirm Password </FormLabel>
        <Input type='password' placeholder='Enter Confirm Password' required onChange={(e) => {
          setsignup({
            ...signup,
            confirmPassword: e.target.value
          })
        }} />
      </FormControl>

      <FormControl>
        <FormLabel>Upload your picture  </FormLabel>
        <Input type='file'
          accept='image/*'
          onChange={(e) => {
            setsignup({
              ...signup,
              profile: e.target.files[0]
            })
          }} />
      </FormControl>



      <Button width="100%" border='2px'
        borderColor='purple.500'
        style={{ marginTop: 30 }}
        onClick={handleSubmit}
      >
        signup
      </Button>
    </ VStack>
  )
}
