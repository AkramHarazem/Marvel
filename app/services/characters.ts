import {api} from './api';
import Config from 'react-native-config';
import md5 from 'md5';

export const charactersApi = api.injectEndpoints({
  endpoints: build => ({
    getAllCharacters: build.query({
      query: ({offset, nameStartsWith, timeStamp}) => ({
        url: 'characters',
        method: 'GET',
        params: {
          apikey: Config.PUBLIC_KEY,
          hash: md5(timeStamp + Config.PRIVATE_KEY + Config.PUBLIC_KEY),
          ts: timeStamp,
          offset,
          ...(nameStartsWith.length > 0 && {nameStartsWith}),
        },
      }),
      serializeQueryArgs: queryArgs => {
        const {offset} = queryArgs;
        return offset;
      },
      merge: (currentCacheData, responseData) => {
        if (!currentCacheData.data.results) return responseData;
        return {
          data: {
            offset: responseData.data.offset,
            total: responseData.data.total,
            count: responseData.data.count,
            results: [
              ...currentCacheData.data.results,
              ...responseData.data.results,
            ],
          },
        };
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    getCharacterById: build.query({
      query: ({timeStamp, id}) => ({
        url: `characters/${id}`,
        method: 'GET',
        params: {
          apikey: Config.PUBLIC_KEY,
          hash: md5(timeStamp + Config.PRIVATE_KEY + Config.PUBLIC_KEY),
          ts: timeStamp,
        },
      }),
    }),
    getCharacterAllComics: build.query({
      query: ({timeStamp, offset, id}) => ({
        url: `characters/${id}/comics`,
        method: 'GET',
        params: {
          apikey: Config.PUBLIC_KEY,
          hash: md5(timeStamp + Config.PRIVATE_KEY + Config.PUBLIC_KEY),
          ts: timeStamp,
          offset,
        },
      }),
      keepUnusedDataFor: 0,
      serializeQueryArgs: queryArgs => {
        const {offset} = queryArgs;
        return offset;
      },
      merge: (currentCacheData, responseData) => {
        if (!currentCacheData.data.results) return responseData;
        return {
          data: {
            offset: responseData.data.offset,
            total: responseData.data.total,
            count: responseData.data.count,
            results: [
              ...currentCacheData.data.results,
              ...responseData.data.results,
            ],
          },
        };
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllCharactersQuery,
  useLazyGetAllCharactersQuery,
  useGetCharacterByIdQuery,
  useLazyGetCharacterByIdQuery,
  useGetCharacterAllComicsQuery,
  useLazyGetCharacterAllComicsQuery,
} = charactersApi;
