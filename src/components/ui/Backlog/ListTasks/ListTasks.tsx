import { useEffect, useState } from "react";
import styles from "./ListTask.module.css";
import { useTasks } from "../../../../hooks/useTasks";
import { CardTask } from "../CardsTask/CardsTask";
import { ModalTask } from "../ModalsBacklog/ModalTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { ICreateTask, ITask } from "../../../../types/ITask";
import { createTask, updateTask } from "../../../../data/tareaController";

export const ListTasks = () => {
  const { tasks, getTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask | undefined>();

  useEffect(() => {
    getTask();
  }, []);

  const handleEditTask = (task: ITask) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(undefined);
  };

  const handleSubmitTask = (task: ITask | ICreateTask) => {
    if ('id' in task) {
      // Es una tarea existente (ITask)
      updateTask(task.id, task);
    } else {
      // Es una nueva tarea (ICreateTask)
      createTask(task);
    }
    handleCloseModal();
  };
  return (
    <div className={styles.tasks}>
      <h1 className={styles.tittleTasks}>
        <FontAwesomeIcon icon={faTasks} /> Lista de Tareas
      </h1>
      
      <div className={styles.tasksContainer}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <CardTask
              key={task.id}
              task={task}
              onEdit={handleEditTask}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No hay tareas disponibles</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ModalTask 
          task={currentTask} 
          onClose={handleCloseModal}
          onSubmit={handleSubmitTask}
        />
      )}
    </div>
  );
};