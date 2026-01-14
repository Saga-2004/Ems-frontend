import { createSlice, configureStore } from "@reduxjs/toolkit";
// import urls from "../../Common/routes";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    activeTask: 0,
    newTask: 0,
    completedTask: 0,
    failedTask: 0,
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.newTask = action.payload.filter((t) => t.status === "new").length;
      state.activeTask = action.payload.filter(
        (t) => t.status === "active"
      ).length;
      state.completedTask = action.payload.filter(
        (t) => t.status === "completed"
      ).length;
      state.failedTask = action.payload.filter(
        (t) => t.status === "failed"
      ).length;
    },
    incrementActiveTask: (state) => {
      state.activeTask += 1;
    },
    decrementActiveTask: (state) => {
      if (state.activeTask > 0) {
        state.activeTask -= 1;
      }
    },
    incrementNewTask: (state) => {
      state.newTask += 1;
    },
    incrementCompletedTask: (state) => {
      state.completedTask += 1;
    },
    incrementFailedTask: (state) => {
      state.failedTask += 1;
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find((t) => t._id === taskId);
      if (task) {
        const oldStatus = task.status;
        task.status = status;

        // Update task counts based on old and new status
        // Decrement old status count
        if (oldStatus === "new") {
          state.newTask = Math.max(0, state.newTask - 1);
        } else if (oldStatus === "active") {
          state.activeTask = Math.max(0, state.activeTask - 1);
        } else if (oldStatus === "completed") {
          state.completedTask = Math.max(0, state.completedTask - 1);
        } else if (oldStatus === "failed") {
          state.failedTask = Math.max(0, state.failedTask - 1);
        }

        // Increment new status count
        if (status === "new") {
          state.newTask += 1;
        } else if (status === "active") {
          state.activeTask += 1;
        } else if (status === "completed") {
          state.completedTask += 1;
        } else if (status === "failed") {
          state.failedTask += 1;
        }
      }
    },
  },
});

export const {
  incrementActiveTask,
  incrementNewTask,
  incrementCompletedTask,
  incrementFailedTask,
  setTasks,
  decrementActiveTask,
  updateTaskStatus,
} = employeeSlice.actions;

const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer,
  },
});

export default store;
