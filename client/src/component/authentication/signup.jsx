import React, { useRef } from 'react'
import { VStack } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText
} from '@chakra-ui/react';
import FormData from 'form-data';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import OtpModal from '../modal/otpModal';

export default function Signup() {
  const toast = useToast()
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: null
  })
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

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
            setSignup({ ...signup, profile: data.url.toString() })
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
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/user/sendOTP`, { email: signup.email });
      toast({
        title: response.data.message,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
        variant: 'left-accent'
      })
      setLoading(false);
      setShowOtpModal(true);
      formRef.current.reset();

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
  }

  const validatePassword = (password) => {
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:'<>?/\\[\]\-~]).{6,}$/;
    return true // passwordRegex.test(password);
  };

  return (
    <form type='submit' ref={formRef} onSubmit={(e) => handleSubmit(e)} >
      <VStack width='100%'>
        <FormControl>
          <FormLabel>Name </FormLabel>
          <Input type='text' placeholder='Enter your name' required onChange={(e) => {
            setSignup({
              ...signup,
              name: e.target.value
            })
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' placeholder='Enter your email' required onChange={(e) => {
            setSignup({
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
              isInvalid={signup.password && !validatePassword(signup.password)}
              onChange={(e) => {
                setSignup({
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
          {signup.password && !validatePassword(signup.password) && (
            <FormHelperText color="red.500">
              The password must be at least 6 characters long and must include at least one uppercase letter, one lowercase letter, one number, and one special character.
            </FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Confirm Password </FormLabel>
          <Input type='password' placeholder='Enter Confirm Password' required onChange={(e) => {
            setSignup({
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

        <OtpModal signup={signup} setSignup={() => setSignup({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          profile: null
        })} isOpen={showOtpModal} onClose={() => setShowOtpModal(false)}>

          <Button width="100%" border='1px'
            borderColor='purple.500'
            style={{ marginTop: 30 }}
            isDisabled={signup.password !== '' && signup.password === signup.confirmPassword ? false : true}
            //onClick={handleSubmit}
            isLoading={loading}
            type='submit'
          >
            Signup
          </Button>

        </OtpModal>

      </ VStack >
    </form>
  )
}