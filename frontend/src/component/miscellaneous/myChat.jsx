import React, { useEffect } from 'react'
import ChatLoading from './chatLoading'
import UserList from './userList';
import { ChatState } from '../../contex/chatProvider';
import axios from 'axios'

export default function MyChat({ searchResult, loading, search, setSearchResult }) {
  const { user } = ChatState();

  const accessChat = (id) => {

  }

  // useEffect(() => {
  //   const headers = {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     }
  //   }
  //   const fetchData = async () => {
  //     if (search === '' && loading === false) {
  //       try {
  //         const result = await axios.get(`${process.env.REACT_APP_BASEURL}/api/chat/fetchChat`, headers);
  //         console.log(result);
  //         //setSearchResult(result.data)

  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [searchResult]);
  return (
    <div style={{ width: '90%' }}>
      {loading === true ? <ChatLoading /> : searchResult.map(data => <UserList key={data._id} user={data}
        handleFunction={() => accessChat(data._id)} />)}
    </div>
  );
}

