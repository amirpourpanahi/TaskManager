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

const projectsSlice = createSlice({
  name: 'project',
  initialState: ["Project1", "Project2", "Project3"],
  reducers: {
    addProject(state:any, action: any) {
      state.push(action.payload);
    },
    removeProject(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1)
    },
    resetProject(state, action) {
      return [];
    },
  }
})

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    projects: projectsSlice.reducer,
  }
});

console.log(store.getState())

export { store };
export const { addTask, modifyTask, removeTask, resetTask, sortTask } = tasksSlice.actions;
export const { addProject, removeProject, resetProject } = projectsSlice.actions;
