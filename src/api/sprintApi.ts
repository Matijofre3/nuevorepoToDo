import axios from "axios";
import { ISprint } from "../types/ISprint";
import { API_URL } from "../utils/constantes";

export const sprintApi = {
  getSprints: async (): Promise<ISprint[]> => {
    const response = await axios.get(`${API_URL}/sprints`);
    return response.data;
  },

  createSprint: async (sprint: Omit<ISprint, 'id'>): Promise<ISprint> => {
    const response = await axios.post(`${API_URL}/sprints`, {
      ...sprint,
      id: crypto.randomUUID()
    });
    return response.data;
  },

  updateSprint: async (id: string, updates: Partial<ISprint>): Promise<ISprint> => {
    const response = await axios.patch(`${API_URL}/sprints/${id}`, updates);
    return response.data;
  },

  deleteSprint: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/sprints/${id}`);
  }
};