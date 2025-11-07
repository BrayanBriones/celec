import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { loginRequest, logoutRequest, sessionRequest, refreshRequest } from '@/services/authService';

const AuthContext = createContext({
  user: null,
  accessToken: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  refreshAccessToken: async () => null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = useCallback((value) => {
    if (!value) {
      return null;
    }
    return { ...value, type: value.type ?? value.role };
  }, []);

  const initializeSession = useCallback(async () => {
    try {
      const data = await sessionRequest();
      setUser(normalizeUser(data.user));
      setAccessToken(data.accessToken ?? null);
    } catch (error) {
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, [normalizeUser]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  const login = useCallback(
    async ({ email, password }) => {
      const data = await loginRequest({ email, password });
      const nextUser = normalizeUser(data.user);
      setUser(nextUser);
      setAccessToken(data.accessToken ?? null);
      return nextUser;
    },
    [normalizeUser],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.warn('No se pudo cerrar la sesión en el servidor:', error);
    }
    setUser(null);
    setAccessToken(null);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (!user) {
      return null;
    }
    try {
      const data = await refreshRequest();
      const nextUser = normalizeUser(data.user);
      setUser(nextUser);
      setAccessToken(data.accessToken ?? null);
      return data.accessToken ?? null;
    } catch (error) {
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  }, [normalizeUser, user]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      isAuthenticated: Boolean(user && accessToken),
      login,
      logout,
      refreshAccessToken,
    }),
    [user, accessToken, loading, login, logout, refreshAccessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
