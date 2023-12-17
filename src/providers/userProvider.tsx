import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  email: string;
  password: string;
};

const UserContext = React.createContext<{
  user: User | null;
  isLoggedIn: boolean;
}>({
  user: null,
  isLoggedIn: false,
});

const UserProvider = ({ children }: any) => {
 
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const token = localStorage.getItem("LLMUNI_TOKEN");

  const decodedTokenValue = decodedToken(token);


  useEffect(() => {
    if (!decodedTokenValue || decodedTokenValue?.exp * 1000 < Date.now()) {
      localStorage.removeItem("LLMUNI_TOKEN");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [ navigate, decodedTokenValue]);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn,
    login,
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
