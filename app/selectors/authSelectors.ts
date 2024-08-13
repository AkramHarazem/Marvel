import {RootState} from '@store/index';
export const getToken = (state: RootState) => state.token.token;
