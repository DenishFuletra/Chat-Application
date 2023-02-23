import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
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
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input
          mt="10px"
          placeholder="Enter Your Name"
          name="name"
          onChange={(e) => {
            SubmitUser(e);
          }}
        />
      </FormControl>

      <FormControl id="email">
        <FormLabel>Email </FormLabel>
        <Input
          mt="10px"
          placeholder="Enter Your Email"
          name="email"
          onChange={(e) => {
            SubmitUser(e);
          }}
        />
      </FormControl>

      <FormControl id="password">
        <FormLabel>Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            mt="10px"
            placeholder="Enter Your Password"
            name="password"
            onChange={(e) => {
              SubmitUser(e);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" h="1.75rem" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Email </FormLabel>
        <Input
          type="file"
          mt="10px"
          placeholder="Enter Your Email"
          name="email"
          onChange={(e) => {
            SubmitUser(e);
          }}
          accept="image/*"
        />
      </FormControl>
      <Button colorScheme="purple" width="100%" mt="15">
        Sing up
      </Button>
    </VStack>
  );
}
