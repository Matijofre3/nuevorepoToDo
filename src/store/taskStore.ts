import { create } from "zustand";
import { ITask } from "../types/ITask";

interface TaskState {
  tasks: ITask[];
  currentTask: ITask | null;
  setTasks: (tasks: ITask[]) => void;
  addTask: (task: ITask) => void;
  updateTask: (id: string, updates: Partial<ITask>) => void;
  deleteTask: (id: string) => void;
  moveToSprint: (taskId: string, sprintId: string) => void;
  moveToBacklog: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  currentTask: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  moveToSprint: (taskId, sprintId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, sprintId } : task
      ),
    })),
  moveToBacklog: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, sprintId: null } : task
      ),
    })),
}));