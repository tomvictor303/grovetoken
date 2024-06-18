import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define the context type
interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
  syncUserInfo: () => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<any>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    console.log('userprovider rendered!!!')
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('jwtToken');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setJwtToken(storedToken);
    }

    const syncDataAcrossTabs = (event: StorageEvent) => {
      if (event.key === 'user') {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
      if (event.key === 'jwtToken') {
        setJwtToken(event.newValue);
      }
    };

    window.addEventListener('storage', syncDataAcrossTabs);

    return () => {
      window.removeEventListener('storage', syncDataAcrossTabs);
    };
  }, []);

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (jwtToken !== null) {
      localStorage.setItem('jwtToken', jwtToken);
    } else {
      localStorage.removeItem('jwtToken');
    }
  }, [jwtToken]);

  const syncUserInfo = async () => {
    try {
      let response = await fetch(`${API_URL}/users/my_profile_info`);
      let { success, msg, user } = await response.json();
      setUser(user);
    } catch(error: any) {
      console.log(error);
      dispatch(showSnackBar({ type: 'error', message: `Error while sync up userinfo.` })); 
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, jwtToken, setJwtToken, syncUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
