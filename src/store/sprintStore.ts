import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface SprintState {
  sprints: ISprint[];
  currentSprint: ISprint | null;
  setSprints: (sprints: ISprint[]) => void;
  addSprint: (sprint: ISprint) => void;
  updateSprint: (id: string, updates: Partial<ISprint>) => void;
  deleteSprint: (id: string) => void;
}

export const useSprintStore = create<SprintState>((set) => ({
  sprints: [],
  currentSprint: null,
  setSprints: (sprints) => set({ sprints }),
  addSprint: (sprint) => set((state) => ({ sprints: [...state.sprints, sprint] })),
  updateSprint: (id, updates) =>
    set((state) => ({
      sprints: state.sprints.map((sprint) =>
        sprint.id === id ? { ...sprint, ...updates } : sprint
      ),
    })),
  deleteSprint: (id) =>
    set((state) => ({ sprints: state.sprints.filter((sprint) => sprint.id !== id) })),
}));