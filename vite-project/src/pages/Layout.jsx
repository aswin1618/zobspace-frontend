import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/NavBar';

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 ',marginRight:"7%" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
