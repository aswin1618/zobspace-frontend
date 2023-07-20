import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)
const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
    );
    const navigate = useNavigate();
    let [loading, setLoading] = useState(true)
    const [count, setCount] = useState()

    const loginUser = async (email, password, onSuccess) => {
        try {
            const response = await fetch(`${API_URL}/auth/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setAuthTokens(data);
                localStorage.setItem('authTokens', JSON.stringify(data));
                onSuccess(); // Call the onSuccess callback after successful login
            } else {
                let errorMessage = 'Something went wrong';
                if (data && data.detail) {
                  errorMessage = data.detail;
                }
                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error('Error during login:', error);
              throw new Error('An error occurred during login');
            }
    };


    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    useEffect(() => {
        if (authTokens) {
            const decodedUser = jwt_decode(authTokens.access);
            setUser(decodedUser);
            console.log(user);
        }
    }, [authTokens]);





    let updateToken = async (email, password) => {

        const response = await fetch(`${API_URL}/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: authTokens.refresh,
            }),
        });
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }


    //userprofile
    const [profile, setProfile] = useState()
    useEffect(() => {
        userProfile(),
        NotificationsCount()
    }, [authTokens])

    const userProfile = async () => {
        const response = await fetch(`${API_URL}/auth/profile/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)

            }
        })
        let data = await response.json()
        setProfile(data)
        console.log(data)
    }

    const NotificationsCount = async () => {
        const response = await fetch(`${API_URL}/feed/notification_count/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        });
        let data = await response.json();
        setCount(data.count);
        console.log(count)
    };


    const contextData = {
        user: user,
        profile: profile,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        count: count,
    };

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
