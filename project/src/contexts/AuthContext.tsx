import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: Partial<User> & { password: string }) => Promise<User>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users data
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'renter',
    approved: true,
    createdAt: '2024-01-15',
    phone: '+1-555-0123',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'owner',
    approved: true,
    createdAt: '2024-01-10',
    phone: '+1-555-0124',
    password: 'password123'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@househunt.com',
    role: 'admin',
    approved: true,
    createdAt: '2024-01-01',
    password: 'admin123'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('househunt_user');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('househunt_user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<User> => {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User & { password: string } = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'renter',
      approved: userData.role === 'renter' ? true : false,
      createdAt: new Date().toISOString().split('T')[0],
      phone: userData.phone,
      password: userData.password
    };

    mockUsers.push(newUser);
    
    if (newUser.role === 'renter') {
      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('househunt_user', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }

    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('househunt_user');
  };

  const updateUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('househunt_user', JSON.stringify(user));
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};