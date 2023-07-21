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
  }, []);

  useEffect(() => {
    if (Cookies.get('id')) {
      const idCookieValue = Cookies.get('id');
      const regexPattern = /j:"(.*?)"/;
      const matchId = idCookieValue.match(regexPattern);
      let userData = {
        id: matchId[1],
        name: Cookies.get('name'),
        email: Cookies.get('email'),
        profile: Cookies.get('profile'),
        token: Cookies.get('token')
      }
      console.log(userData)
      setUser(userData)
      localStorage.setItem('userData', JSON.stringify(userData));
    }

  }, [])



  return (
    <div className="App">

      <Routes>
        {/* <Route path='/' element={<Home />} /> */}

        <Route path='/' element={user ? <Navigate to='/chats' /> : <Home />} />
        <Route path='/chats' element={!user ? <Navigate to='/' /> : <Chat />} />
      </Routes>

    </div>
  );
}

export default App;
