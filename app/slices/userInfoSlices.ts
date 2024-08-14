import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type UserInfo = {
  image?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type UserInfoState = {
  userInfo: UserInfo;
};

const initialState: UserInfoState = {
  userInfo: {
    image: '',
    name: '',
    email: '',
    phone: '',
  },
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setUserInfo} = userInfoSlice.actions;

export const userInfoReducer = userInfoSlice.reducer;
