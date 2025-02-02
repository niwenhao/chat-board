'use client';
import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  return (
    <AuthContext.Provider value={{ username, setUsername, address, setAddress, email, setEmail, tel, setTel }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };