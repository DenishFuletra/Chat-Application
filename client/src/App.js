import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/home';
import Chat from './pages/chat';
import { ChatState } from './contex/chatProvider';
import Cookies from 'js-cookie';
import ForgotPassword from './component/authentication/forgotPassword'
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

function App() {
  const { user, setUser } = ChatState();
  let userInfo = JSON.parse(localStorage.getItem('userData'));

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response && error.response.status === 401) {
        try {
          if (!userInfo) {
            console.error("User info not found");
            return Promise.reject(error);
          }
          const refreshTokenResponse = await axios.post(`${process.env.REACT_APP_BASEURL}/api/user/refreshToken`, {
            token: userInfo.token,
            refreshToken: userInfo.refresh_token
          });
          console.log("refreshToken", refreshTokenResponse);

          userInfo = {
            ...userInfo,
            token: refreshTokenResponse.data.userData.token,
            refresh_token: refreshTokenResponse.data.userData.refresh_token
          };

          localStorage.setItem('userData', JSON.stringify(userInfo));
          setUser(userInfo);

          error.config.headers['Authorization'] = `Bearer ${refreshTokenResponse.data.userData.token}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    setUser(userInfo);
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
        <Route path='/' element={user !== null || undefined ? <Navigate to='/chats' /> : <Home />} />
        <Route path='/chats' element={user === null || undefined ? <Navigate to='/' /> : <Chat />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
      </Routes>

    </div>
  );
}

export default App;