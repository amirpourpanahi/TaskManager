import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data:[],
};

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action) {
      state.data.push(action.payload);
    },
    modifyTask: (state, action) => {
      state.data = state.data.map((task) => {
        if (task?.id === action.payload.id) {
          return { ...action.payload };
        }
        return task;
      });
    },
    removeTask(state, action) {
      state.data = state.data.filter((task) => task.id !== action.payload);
    },
    sortTask: (state, action) => {
      console.log("action.payload: ", action.payload)
      const { field } = action.payload;
      if (field === "status") {
        state.data = state.data.sort((a, b) =>
          b[field].toLowerCase().localeCompare(a[field].toLowerCase())
        );
      } else {
        state.data = state.data.sort((a, b) => {
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
    tasks: tasksSlice.reducer
  }
});

// console.log(store.getState())

export { store };
export const { addTask, modifyTask, removeTask, sortTask } = tasksSlice.actions;
