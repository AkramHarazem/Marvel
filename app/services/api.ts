import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

const baseQuery = fetchBaseQuery({
  baseUrl: `${Config.API_URL}`,
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (__DEV__) {
    console.log(api.endpoint, args, result);
  }

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
