import axios from "axios";
import { API_URL } from "../utils/constantes";
import { ISprint, ICreateSprint } from "../types/ISprint";

// Exportación corregida
export const createSprint = async (newSprint: ICreateSprint): Promise<ISprint> => {
  try {
    const response = await axios.post(`${API_URL}/sprints`, {
      ...newSprint,
      id: crypto.randomUUID(),
      tareas: []
    });
    return response.data;
  } catch (error) {
    console.error("Error creating sprint:", error);
    throw error;
  }
};

export const getSprints = async (): Promise<ISprint[]> => {
  try {
    const response = await axios.get(`${API_URL}/sprints`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sprints:", error);
    throw error;
  }
};

export const getSprintById = async (id: string): Promise<ISprint> => {
  try {
    const response = await axios.get(`${API_URL}/sprints/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sprint ${id}:`, error);
    throw error;
  }
};

export const updateSprint = async (id: string, updates: Partial<ISprint>): Promise<ISprint> => {
  try {
    const response = await axios.patch(`${API_URL}/sprints/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating sprint ${id}:`, error);
    throw error;
  }
};

export const deleteSprint = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/sprints/${id}`);
  } catch (error) {
    console.error(`Error deleting sprint ${id}:`, error);
    throw error;
  }
};