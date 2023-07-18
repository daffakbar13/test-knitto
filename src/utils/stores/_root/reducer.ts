import { todosApi } from '@knitto/services/todos'
import { usersApi } from '@knitto/services/users'
import { todosSlice } from '../todos'

export const rootReducer = {
  [todosSlice.name]: todosSlice.reducer,
  [todosApi.reducerPath]: todosApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
}

export type RootReducer = typeof rootReducer
