import { FC } from "react";
import { ITask } from "../../../../types/ITask";
import styles from "./CardTask.module.css";
import { useTasks } from "../../../../hooks/useTasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface ICardTaskProps {
  task: ITask;
  onEdit: (task: ITask) => void;
}

export const CardTask: FC<ICardTaskProps> = ({ task, onEdit }) => {
  const { deleteTask } = useTasks();

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar tarea "${task.titulo}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerDescription}>
        <h3>{task.titulo}</h3>
        <p>{task.descripcion}</p>
        <p>Vence: {new Date(task.fechaLimite).toLocaleDateString()}</p>
      </div>
      <div className={styles.actionCard}>
        <button onClick={() => onEdit(task)} className={styles.editButton}>
          <FontAwesomeIcon icon={faPencilSquare} />
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};