import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Emailotp from './pages/Emailotp'
import Detailfillup from './pages/Detailfillup'
import FinalRegisterPage from './pages/FinalRegisterPage'
import Explore from './pages/Explore'
import CreatePage from './pages/CreatePage'
import Library from './pages/Library'
import Messages from './pages/Messages.jsx'
import PrivateRoutes from './utils/PrivateRoutes'
import AuthProvider from './context/AuthContext';
import NotFound from './pages/NotFound'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signupotp" element={<Emailotp />} />
          <Route path="/detailfillup" element={<Detailfillup />} />
          <Route path="/signupfinal" element={<FinalRegisterPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                