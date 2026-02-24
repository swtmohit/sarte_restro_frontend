"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  name?: string; // Keep for backward compatibility
  username?: string;
  deliveryAddress?: string;
  pinCode?: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call - in production, this would call your backend
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const userData: User = { email, name: email.split("@")[0] };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        resolve();
      }, 500);
    });
  };

  const signup = async (data: SignupData) => {
    // Simulate API call - in production, this would call your backend
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          profilePicture: data.profilePicture,
          name: `${data.firstName} ${data.lastName}`, // For backward compatibility
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

