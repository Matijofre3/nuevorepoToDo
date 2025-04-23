import { useSprintStore } from "../store/sprintStore";
import { ISprint, ICreateSprint } from "../types/ISprint";
import { sprintApi } from "../api/sprintApi";

export const useSprint = () => {
  const { sprints, setSprints, addSprint, updateSprint: updateStoreSprint } = useSprintStore();

  const fetchSprints = async () => {
    const data = await sprintApi.getSprints();
    setSprints(data);
  };

  const createSprint = async (sprint: ICreateSprint) => {
    const newSprint = await sprintApi.createSprint(sprint);
    addSprint(newSprint);
    return newSprint;
  };

  const updateSprint = async (_id: string, sprint: ISprint) => {
    const updatedSprint = await sprintApi.updateSprint(sprint.id, sprint);
    updateStoreSprint(updatedSprint);
    return updatedSprint;
  };

  return {
    sprints,
    fetchSprints,
    createSprint,
    updateSprint,
  };
};