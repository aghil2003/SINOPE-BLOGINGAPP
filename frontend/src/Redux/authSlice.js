import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../services/api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
  'auth/login',
  async ({ credentials, navigate }, { rejectWithValue }) => {
    try {
      const res = await loginUser(credentials);
      Cookies.set('token', res.data.token, {expires: 7,path: '/',secure: false,sameSite: 'Lax' });
      toast.success('Logged in successfully!');
      navigate('/');
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const res = await registerUser(userData);
      Cookies.set('token', res.data.token, {expires: 7,path: '/',secure: false,sameSite: 'Lax' });
      toast.success('Registered successfully!');
      navigate('/');
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove('token');
      state.user = null;
      toast.success('Logged out successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
