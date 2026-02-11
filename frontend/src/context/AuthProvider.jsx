import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if(token && user){
                setUser(JSON.parse(user));
                setIsAuthenticated(true);
            }

        } catch (error) {
            console.error(`Authentication check failed:`, error);
            logout();
        } finally {
            setLoading(false)
        }
    };

    checkAuthStatus();

  }, []);

  const login = ( user, token ) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/'
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}