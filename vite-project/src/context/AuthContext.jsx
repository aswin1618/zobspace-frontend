import React, { createContext } from 'react';

export const AuthContext = createContext({ name: '' });

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{ name: 'Aswin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
