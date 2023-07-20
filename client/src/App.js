import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import { ChatState } from './contex/chatProvider';
import Cookies from 'js-cookie';


function App() {
  const { user, setUser } = ChatState();
  const userInfo = JSON.parse(localStorage.getItem('userData'));


  useEffect(() => {
    setUser(userInfo);
    // console.log(user);
  }, [userInfo, setUser]);


  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/chats' element={!user ? <Navigate to='/' /> : <Chat />} />
      </Routes>

    </div>
  );
}

export default App;
