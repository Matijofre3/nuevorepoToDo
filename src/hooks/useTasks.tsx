import { useTaskStore } from "../store/taskStore";
import { ITask, ICreateTask } from "../types/ITask";
import { taskApi } from "../api/taskApi";

export const useTasks = () => {
  const { tasks, setTasks, ...actions } = useTaskStore();
  
  const fetchTasks = async () => {
    const data = await taskApi.getTasks();
    setTasks(data);
  };

  const getTask = fetchTasks; // Alias para compatibilidad

  const createTask = async (taskData: ICreateTask) => {
    const taskWithDefaults: ICreateTask = {
      ...taskData,
      estado: taskData.estado || 'pendiente', // Valor por defecto
      sprintId: taskData.sprintId || null
    };
    
    const newTask = await taskApi.createTask(taskWithDefaults);
    actions.addTask(newTask);
    return newTask;
  };

  const updateTask = async (id: string, updates: Partial<ITask>) => {
    const updatedTask = await taskApi.updateTask(id, updates);
    actions.updateTask(id, updates);
    return updatedTask;
  };

  const deleteTask = async (id: string) => {
    await taskApi.deleteTask(id);
    actions.deleteTask(id);
  };

  const moveToSprint = async (taskId: string, sprintId: string) => {
    await updateTask(taskId, { sprintId });
  };

  const moveToBacklog = async (taskId: string) => {
    await updateTask(taskId, { sprintId: null });
  };

  const searchTasks = async (term: string) => {
    const allTasks = await taskApi.getTasks();
    const filtered = allTasks.filter(task => 
      task.titulo.toLowerCase().includes(term.toLowerCase())
    );
    setTasks(filtered);
  };

  return {
    tasks,
    fetchTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    moveToSprint,
    moveToBacklog,
    searchTasks,
  };
};