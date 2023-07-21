import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Emailotp from './pages/Emailotp'
import Detailfillup from './pages/Detailfillup'
import FinalRegisterPage from './pages/FinalRegisterPage'
import Explore from './pages/Explore'
import Messages from './pages/Messages.jsx'
import PrivateRoutes from './utils/PrivateRoutes'
import AuthProvider from './context/AuthContext';
import NotFound from './pages/NotFound'
import Notifications from './pages/Notifications'
import ProfilePage from './pages/ProfilePage'
import OtherArtistProfile from './pages/OtherArtistProfile'
import AdminLogin from './pages/admin/AdminLogin'
import AdminRoutes from './utils/AdminRoutes'
import AdminHome from './pages/admin/AdminHome'
import UserManagement from './pages/admin/UserManagement'
import PostManagement from './pages/admin/PostManagement'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signupotp" element={<Emailotp />} />
          <Route path="/detailfillup" element={<Detailfillup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/signupfinal" element={<FinalRegisterPage />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/profile/:artistId" element={<OtherArtistProfile />} />
          </Route>
          <Route path="/admin" element={<AdminRoutes />} >
            <Route index element={<AdminHome />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/posts" element={<PostManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       