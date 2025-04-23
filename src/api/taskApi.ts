import axios from "axios";
import { ITask } from "../types/ITask";

const API_URL = "http://localhost:3006"; // Asegúrate que el puerto coincida

export const taskApi = {
  getTasks: async (): Promise<ITask[]> => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return []; // Retorna array vacío en caso de error
    }
  },

  createTask: async (task: Omit<ITask, 'id'>): Promise<ITask> => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  updateTask: async (id: string, updates: Partial<ITask>): Promise<ITask> => {
    const response = await axios.patch(`${API_URL}/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${id}`);
  }
};