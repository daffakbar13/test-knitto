/* eslint-disable no-param-reassign */
import { Todo, TodoList } from '@knitto/services/todos/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as TodoList,
    rowCount: 0,
    newTodo: { title: '' } as Omit<Todo, 'id'>,
    isLoadNewTodo: false,
    isLoadDeleteTodo: false,
    isOpenConfirmDelete: false,
    selectedDeleteTodoId: -1,
  },
  reducers: {
    setTodos(state, { payload }: PayloadAction<TodoList>) {
      state.todos = payload
    },
    addTodo(state, { payload }: PayloadAction<Todo>) {
      const max = Math.max(...state.todos.map((t) => t.id))
      state.todos.pop()
      state.todos.unshift({ ...payload, id: max + 1 })
      state.newTodo = { ...state.newTodo, title: '' }
      state.isLoadNewTodo = false
      state.rowCount += 1
    },
    setRowCount(state, { payload }: PayloadAction<number>) {
      state.rowCount = payload
    },
    changeNewTodo(state, { payload }: PayloadAction<Omit<Todo, 'id'>>) {
      state.newTodo = payload
    },
    loadNewTodo(state) {
      state.isLoadNewTodo = true
    },
    loadDeleteTodo(state) {
      state.isLoadDeleteTodo = true
    },
    openConfirmDelete(state, { payload }: PayloadAction<number>) {
      state.isOpenConfirmDelete = true
      state.selectedDeleteTodoId = payload
    },
    closeConfirmDelete(state) {
      state.isOpenConfirmDelete = false
      state.isLoadDeleteTodo = false
    },
  },
})

export const {
  actions: {
    addTodo,
    setTodos,
    setRowCount,
    changeNewTodo,
    loadNewTodo,
    loadDeleteTodo,
    openConfirmDelete,
    closeConfirmDelete,
  },
} = todosSlice
