import { useParams } from "react-router-dom";
import { Header } from "../../ui/Header/Header";
import { TaskComplete } from "../../ui/Sprint/StatusTask/TaskComplete";
import { TaskPending } from "../../ui/Sprint/StatusTask/TaskPending";
import styles from "./SprintScreen.module.css";
import { useTaskStore } from "../../../store/taskStore";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ITask } from "../../../types/ITask";
import { TaskProcessing } from "../../ui/Sprint/StatusTask/TaskProccesing";

export const SprintScreen = () => {
  const { id } = useParams();
  const { tasks, updateTask } = useTaskStore();
  
  const sprintTasks = tasks.filter(task => task.sprintId === id);

  const handleEditTask = (task: ITask) => {
    // Lógica para editar tarea
    console.log("Editar tarea:", task);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    // Asegurar que el estado sea uno de los valores permitidos
    const newStatus = result.destination.droppableId as 'pendiente' | 'en-progreso' | 'completado';
    
    updateTask(result.draggableId, {
      estado: newStatus
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header title={`Sprint: ${id}`} />
      <div className={styles.taskColumContainer}>
        <TaskPending 
          tasks={sprintTasks.filter(t => t.estado === 'pendiente')}
          onEdit={handleEditTask}
        />
        <TaskProcessing 
          tasks={sprintTasks.filter(t => t.estado === 'en-progreso')}
          onEdit={handleEditTask}
        />
        <TaskComplete 
          tasks={sprintTasks.filter(t => t.estado === 'completado')}
          onEdit={handleEditTask}
        />
      </div>
    </DragDropContext>
  );
};