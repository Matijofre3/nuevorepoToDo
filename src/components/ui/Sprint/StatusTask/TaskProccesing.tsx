import { Droppable } from "@hello-pangea/dnd";
import { CardTask } from "../../Backlog/CardsTask/CardsTask";
import { ITask } from "../../../../types/ITask";
import styles from "./TaskStatus.module.css";

interface TaskColumnProps {
  tasks: ITask[];
  onEdit: (task: ITask) => void;
}

export const TaskProcessing = ({ tasks, onEdit }: TaskColumnProps) => {
  return (
    <Droppable droppableId="en-progreso">
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          className={styles.column}
        >
          <h3 className={styles.columnTitle}>En Progreso</h3>
          <div className={styles.tasksList}>
            {tasks.map((task) => (
              <CardTask
                key={task.id}
                task={task}
                onEdit={onEdit}
              />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};