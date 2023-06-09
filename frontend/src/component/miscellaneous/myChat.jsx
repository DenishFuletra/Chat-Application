import React, { useEffect } from 'react'
import ChatLoading from './chatLoading'
import UserList from './userList';
import { ChatState } from '../../contex/chatProvider';
import axios from 'axios'
import ExistChats from './existChats';

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
      setSelectedChat(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }

  return (
    <div style={{ width: '90%' }}>
      {loading === true ? (
        <ChatLoading />
      ) : (
        loading === false && search !== '' ? (
          searchResult.map(data => (
            <UserList key={data._id} user={data} handleFunction={() => accessChat(data._id)} />
          ))
        ) :
          (
            searchResult.map(data => (
              <ExistChats key={data._id} user={data} handleFunction={() => accessChat(data._id)} />
            ))
          )
      )}
    </div>
  );
}

