import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import md5 from 'md5';
import Config from 'react-native-config';

const baseQuery = fetchBaseQuery({
  baseUrl: `${Config.API_URL}`,
});
const timeStamp = Date.now();

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (typeof args === 'string') {
    args = {url: args};
  }
  args.params = {
    ...args.params,
    apikey: Config.PUBLIC_KEY,
    hash: md5(timeStamp + Config.PRIVATE_KEY! + Config.PUBLIC_KEY),
    ts: timeStamp,
  };

  let result = await baseQuery(args, api, extraOptions);

  // if (__DEV__) {
  //   console.log(api.endpoint, args, result);
  // }

  if (result.error) {
    return {
      error: result.error,
      meta: result.meta,
    };
  }

  return {
    data: result.data,
    meta: result.meta,
  };
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
