import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Task } from '../types/Task';
import { strict } from 'assert';

const initialState: {data: Task[]} = {
  data: [],
};

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state:any, action: any) {
      state.data.push(action.payload);
    },
    modifyTask: (state:any, action:any) => {
      state.data = state.data.map((task:any) => {
        if (task?.id === action.payload.id) {
          return { ...action.payload };
        }
        return task;
      });
    },
    removeTask(state, action) {
      state.data = state.data.filter((task:any) => task.id !== action.payload);
    },
    resetTask(state, action) {
      state.data = [];
    },
    sortTask: (state, action) => {
      const { field } = action.payload;
      if (field === "status") {
        state.data = state.data.sort((a:any, b:any) =>
          b[field].toLowerCase().localeCompare(a[field].toLowerCase())
        );
      } else {
        state.data = state.data.sort((a:any, b:any) => {
          var dateA = new Date(a.creationDate).getTime();
          var dateB = new Date(b.creationDate).getTime();
          return dateA > dateB ? -1 : 1;
        });
      }
    },
  }
})

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  }
});

export { store };
export const { addTask, modifyTask, removeTask, sortTask } = tasksSlice.actions;
