import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  token: string;
};
const initialState: AuthState = {
  token: '',
};
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetToken: state => {
      state.token = '';
    },
  },
});

export const {setToken, resetToken} = tokenSlice.actions;

export const tokenReducer = tokenSlice.reducer;
