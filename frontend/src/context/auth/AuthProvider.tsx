import { useAuth } from '../../hooks';
import { AuthContext } from './authContext';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { isLoggedIn, login, logout, register, loadUser } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
