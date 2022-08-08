import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export default function App() {
  const [userInfo, setUserInfo] = useState({
    id: null,
    firstname: null,
    lastname: null,
    role: null,
  });

  return (
    <div className='app-container'>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='auth' element={<Auth />} />
            <Route path='profil' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
