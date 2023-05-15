import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
