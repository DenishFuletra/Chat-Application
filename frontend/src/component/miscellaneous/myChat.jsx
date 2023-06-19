import React, { useEffect } from 'react'
import ChatLoading from './chatLoading'
import UserList from './userList';
import { ChatState } from '../../contex/chatProvider';
import axios from 'axios'
import ExistChats from './existChats';
import { Box, Button, Stack, Text, Avatar } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import GroupChatModal from '../modal/groupChatModal';

export default function MyChat({ searchResult, loading, search, setSearchResult, setLoading }) {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const accessChat = async (id) => {
    setLoading(true);
    try {
      const headers = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      const result = await axios.post(`${process.env.REACT_APP_BASEURL}/api/chat/accessChat`, { userId: id }, headers);
      // console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  const getSenderName = (loggedUser, users) => {
    if (users) {
      return users[0]._id === loggedUser.id ? users[1].name : users[0].name;
    }
  };
  const getSenderPic = (loggedUser, users) => {
    if (users) {
      return users[0]._id === loggedUser.id ? users[1].picture : users[0].picture;
    }
  };

  useEffect(() => {

  }, [search])

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      width='100%'
      height='100%'
      borderRadius="lg"
      borderWidth="1px"
    >

      <Box

        fontSize={{ base: "25px", md: "25px" }}
        display="flex"
        flexDirection='row'
        justifyContent="space-between"
        alignItems="center"
        // border='2px solid red'
        width='100%'
      // gap='150px'
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            flexDirection='row'
            fontSize={{ base: "15px", md: "10px", lg: "15px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        width="100%"
        marginTop="10px"
        borderRadius="lg"
        overflowY="hidden"
      >
        {loading === true ? (
          <ChatLoading />
        ) : (
          loading === false && search !== '' ? (
            <Stack overflowY="scroll">
              {searchResult.map(data => (
                <UserList key={data._id} user={data} handleFunction={() => accessChat(data._id)} />
              ))}
            </Stack>
          ) :
            (
              <Stack overflowY="scroll">
                {searchResult.map(chat => (

                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                    display='flex'
                    flexDirection='row'
                    justifyContent='flex-start'
                  >
                    <Avatar
                      mr={2}
                      size="sm"
                      cursor="pointer"
                      name={getSenderName(user, chat.users)}
                      src={getSenderPic(user, chat.users)}
                    />
                    <Box>
                      <Text>
                        {!chat.isGroupChat ? getSenderName(user, chat.users) : chat.chatName}
                      </Text>
                      {chat.latestMessage && (
                        <Text fontSize="xs">
                          <b>{chat.latestMessage.sender.name} : </b>
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) + "..."
                            : chat.latestMessage.content}
                        </Text>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            )
        )}
      </Box>
    </Box>
  );
}
