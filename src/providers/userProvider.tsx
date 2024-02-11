import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {accessTokenVerification, refreshToken} from "../api/tokenApi";
import useToast from "../hooks/useToast";
import { toast } from "react-toastify";

type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: string;
};

type UserContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loginUser: (user: User) => void;
  logout: () => void;
};

/* eslint-disable @typescript-eslint/no-empty-function */
export const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  loginUser: () => {},
  logout: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */


const UserProvider = ({ children }: any) => {
 
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const token = localStorage.getItem("LLMUNI_TOKEN");

  const decodedTokenValue = decodedToken(token);

  useEffect(() => {
    if (!decodedTokenValue || decodedTokenValue?.exp * 1000 < Date.now()) {
      refreshToken({ email: user?.email }).then((response) => {
        if (response.success) {
          localStorage.setItem("LLMUNI_TOKEN", response.accessToken);
          setIsLoggedIn(true);
          console.log("Token refreshed");
        } else {
          localStorage.removeItem("LLMUNI_TOKEN");
          setIsLoggedIn(false);
          if(isLoggedIn){
            toast.error("Session expired, please sign in again");
            navigate('/signin');
          }
          console.log("Token not refreshed");
        }
      }).catch((error) => {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("LLMUNI_TOKEN");
        setIsLoggedIn(false);
        navigate('/signin');
      });
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate, decodedTokenValue, user]);
  
  
  useEffect(() => {
    if (decodedTokenValue) {
      setUser(decodedTokenValue);
    }
  }, [isLoggedIn]);

  const loginUser = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('LLMUNI_TOKEN');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  const value = {
    user,
    isLoggedIn,
    loginUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

const decodedToken = (token: string | null) => {
  if (!token) {
    return null;
  }

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const decodedToken = JSON.parse(window.atob(base64));
  return decodedToken;
};
