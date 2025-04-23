import axios from "axios";
import { API_URL } from "../utils/constantes";
import { ITask } from "../types/ITask";
import { ICreateTask } from "../types/ICreateTask";

export const getTasks = async (): Promise<ITask[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: ICreateTask): Promise<ITask> => {
  const response = await axios.post(`${API_URL}/tasks`, {
    ...task,
    estado: 'pendiente',
    id: crypto.randomUUID()
  });
  return response.data;
};

export const updateTask = async (id: string, updates: Partial<ITask>): Promise<ITask> => {
  const response = await axios.patch(`${API_URL}/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};