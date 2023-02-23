import React from "react";
import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Login() {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const SubmitUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const SumbmitUser = async () => {
    setLoading(true);
    if (!user.email || !user.password) {
      toast({
        title: `Please fill required Details`,
        status: "warning",
        position: "top",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const data = await axios.post(
        "http://localhost:5000/api/user/login",
        user
      );
      console.log(data);
      toast({
        title: "Login successful",
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Login Failed",
        description: err.response.data.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          p={1.5}
          placeholder="Enter your Email"
          name="email"
          onChange={(e) => {
            SubmitUser(e);
          }}
          isRequired
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="password"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => {
              SubmitUser(e);
            }}
            isRequired
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={SumbmitUser}
      >
        Log in
      </Button>
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }}>
        Get Guest user Credentials
      </Button>
    </VStack>
  );
}
