import { myEnv } from '@knitto/configs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { User, UserList } from './types'
import { TodoList } from '../todos/types'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: myEnv.JSONPLACEHOLDER_API,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return false
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
    getUserList: builder.query<UserList, { start?: number; limit?: number }>({
      query: ({ start, limit }) => ({
        url: 'users',
        params: { _start: start, _limit: limit },
      }),
    }),
    getUserTodos: builder.query<TodoList, { id: string; start?: number; limit?: number }>({
      query: ({ id, start, limit }) => ({
        url: `users/${id}/todos`,
        params: { _start: start, _limit: limit },
      }),
    }),
  }),
})

export const {
  useGetUserByIdQuery,
  useGetUserListQuery,
  useGetUserTodosQuery,
  util: { getRunningQueriesThunk },
} = usersApi

export const { getUserById, getUserList, getUserTodos } = usersApi.endpoints
