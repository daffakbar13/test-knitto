import { myEnv } from '@knitto/configs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { Todo, TodoList } from './types'

export const todosApi = createApi({
  reducerPath: 'todosApi',
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
    getTodoById: builder.query<Todo, string>({
      query: (id) => `todos/${id}`,
    }),
    getTodoList: builder.query<TodoList, void>({
      query: () => 'todos',
    }),
    createTodo: builder.mutation<Todo, Omit<Todo, 'id'>>({
      query: (body) => ({ url: 'todos', method: 'POST', body }),
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (body) => ({ url: `todos/${body.id}`, method: 'PUT', body }),
    }),
    deleteTodo: builder.mutation<TodoList, number>({
      query: (id) => ({ url: `todos/${id}`, method: 'DELETE' }),
    }),
  }),
})

export const {
  useGetTodoByIdQuery,
  useGetTodoListQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  util: { getRunningQueriesThunk },
} = todosApi

export const { getTodoById, getTodoList, createTodo, updateTodo } = todosApi.endpoints
