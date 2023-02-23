import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");

  const SubmitUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: `Please Select an Image`,
        status: "warning",
        position: "top",
        isClosable: true,
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dtetm6j63");
      fetch("https://api.cloudinary.com/v1_1/dtetm6j63/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // setPic(data.url.toString());
          setUser({
            ...user,
            profile: data.url.toString(),
          });
          // console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: `Please Select an Image`,
        status: "warning",
        position: "top",
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  const handleClick = () => {
    setShow(!show);
  };

  const SumbmitUser = async () => {
    setLoading(true);
    if (!user.name || !user.email || !user.password) {
      toast({
        title: `Please fill required Details`,
        status: "warning",
        position: "top",
        isClosable: true,
      });
      setLoading(false);
      return;
    } else {
      if (user.password !== confirmPassword) {
        toast({
          title: `Confirm password did not match`,
          status: "warning",
          position: "top",
          isClosable: true,
        });
        return;
      }
    }
    try {
      const data = await axios.post(
        "http://localhost:5000/api/user/register",
        user
      );
      console.log(data);
      toast({
        title: "Registration successful",
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
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
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="password"
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="password"
            type={show ? "text" : "password"}
            placeholder="Enter your Confirm Password"
            onChange={(e) => {
              setconfirmPassword(e.target.value);
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
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={SumbmitUser}
      >
        Sign up
      </Button>
    </VStack>
  );
}
