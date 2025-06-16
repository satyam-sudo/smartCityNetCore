import { useAppSelector, useAppDispatch } from './redux';
import { loginUser, registerUser, logoutUser, clearError } from '../store/authSlice';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const result = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      } else {
        return { success: false, error: result.payload || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (credentials: { email: string; password: string }) => {
    try {
      const result = await dispatch(registerUser(credentials));
      if (registerUser.fulfilled.match(result)) {
        return { success: true, data: result.payload };
      } else {
        return { success: false, error: result.payload || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await dispatch(logoutUser());
    router.push('/login');
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    ...auth,
    login,
    register,
    logout,
    clearAuthError,
  };
};
