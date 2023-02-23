import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const [show, setShow] = useState(false);

  const SubmitUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setShow(!show);
  };
  console.log(user);
  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          p={1.5}
          placeholder="Enter Your Name"
          name="name"
          onChange={(e) => {
            SubmitUser(e);
          }}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email </FormLabel>
        <Input
          p={1.5}
          placeholder="Enter Your Email"
          name="email"
          onChange={(e) => {
            SubmitUser(e);
          }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => {
              SubmitUser(e);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button colorScheme="purple" width="100%" style={{ marginTop: 15 }}>
        Sign up
      </Button>
    </VStack>
  );
}
