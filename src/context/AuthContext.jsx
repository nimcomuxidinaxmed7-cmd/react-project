import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("shopease_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem("shopease_users")) || [];

    const existingUser = users.find(
      (item) => item.email === email
    );

    if (existingUser) {
      return false;
    }

    const newUser = { name, email, password };

    users.push(newUser);

    localStorage.setItem("shopease_users", JSON.stringify(users));

    const loggedInUser = { name, email };

    localStorage.setItem(
      "shopease_user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return true;
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("shopease_users")) || [];

    const foundUser = users.find(
      (item) => item.email === email && item.password === password
    );

    if (!foundUser) {
      return false;
    }

    const loggedInUser = {
      name: foundUser.name,
      email: foundUser.email,
    };

    localStorage.setItem(
      "shopease_user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);

    return true;
  }

  function logout() {
    localStorage.removeItem("shopease_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
