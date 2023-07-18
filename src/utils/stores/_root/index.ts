import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { todosApi } from '@knitto/services/todos'
import { usersApi } from '@knitto/services/users'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { rootReducer } from './reducer'

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware(gdm) {
      return gdm().concat([todosApi.middleware, usersApi.middleware])
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })

export const useAppStore: TypedUseSelectorHook<RootState> = useSelector
