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

export default function Login() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          p={1.5}
          placeholder="Enter Your Email"
          name="email"
          onChange={(e) => {
            //SubmitUser(e);
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
              // SubmitUser(e);
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
      <Button colorScheme="purple" width="100%" style={{ marginTop: 15 }}>
        Log in
      </Button>
      <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }}>
        Get Guest user Credentials
      </Button>
    </VStack>
  );
}
