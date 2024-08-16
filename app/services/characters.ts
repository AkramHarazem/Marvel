import {api} from './api';

interface CharacterData {
  offset: number;
  total: number;
  count: number;
  results: Array<any>;
}
interface ApiResponse {
  data: CharacterData;
}

const mergeFunc = (
  currentCacheData: ApiResponse,
  responseData: ApiResponse,
) => {
  if (!currentCacheData.data.results) return responseData;
  return {
    data: {
      offset: responseData.data.offset,
      total: responseData.data.total,
      count: responseData.data.count,
      results: [...currentCacheData.data.results, ...responseData.data.results],
    },
  };
};

export const charactersApi = api.injectEndpoints({
  endpoints: build => ({
    getAllCharacters: build.query({
      query: ({offset, nameStartsWith}) => ({
        url: 'characters',
        method: 'GET',
        params: {
          offset,
          ...(nameStartsWith.length > 0 && {nameStartsWith}),
        },
      }),
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCacheData, responseData) =>
        mergeFunc(currentCacheData, responseData),
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    getCharacterById: build.query({
      query: ({id}) => ({
        url: `characters/${id}`,
        method: 'GET',
      }),
    }),
    getCharacterAllComics: build.query({
      query: ({offset, id}) => ({
        url: `characters/${id}/comics`,
        method: 'GET',
        params: {
          offset,
        },
      }),
      keepUnusedDataFor: 0,
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCacheData, responseData) =>
        mergeFunc(currentCacheData, responseData),
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
