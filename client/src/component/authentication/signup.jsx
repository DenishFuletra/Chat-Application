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
import FormData from 'form-data';
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import OtpModal from '../modal/otpModal';

export default function Signup() {
  const toast = useToast()
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: null
  })
  const [show, setShow] = useState(false);
  console.log(signup);

  const uploadImage = async (pics) => {
    try {
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dtetm6j63");

        fetch("https://api.cloudinary.com/v1_1/dtetm6j63/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setsignup({ ...signup, profile: data.url.toString() })
            console.log(data.url.toString());
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
    }
  }

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
    <form onSubmit={(e) => handleSubmit(e)} >
      <VStack width='100%'>
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
              uploadImage(e.target.files[0])
            }} />
        </FormControl>

        <OtpModal >
          <Button width="100%" border='2px'
            borderColor='purple.500'
            style={{ marginTop: 30 }}
            // isDisabled={signup.password !== '' && signup.password === signup.confirmPassword ? false : true}
            onClick={handleSubmit}
          >
            Signup
          </Button>
        </OtpModal>
      </ VStack >
    </form>
  )
}