import { createContext } from 'react';

const defaultValue = {
  isLoggedIn: false,

  login: async (address: string) => {},
  logout: async () => {},
  register: async (nickname: string, address: string) => {},
  loadUser: async (token: string) => {},
};

export const AuthContext = createContext(defaultValue);
