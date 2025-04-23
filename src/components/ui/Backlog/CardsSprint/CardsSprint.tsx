import { FC } from "react";
import styles from "./CardSprint.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ISprint } from "../../../../types/ISprint";
import { useSprint } from "../../../../hooks/useSprint";
import { useNavigate } from "react-router-dom";

interface ICardSprintProps {
  sprint: ISprint;
  onEdit: (sprint: ISprint) => void;
}

export const CardSprint: FC<ICardSprintProps> = ({ sprint, onEdit }) => {
  const { deleteSprint } = useSprint();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar sprint "${sprint.nombre}"?`)) {
      deleteSprint(sprint.id);
    }
  };

  const handleEdit = () => {
    onEdit(sprint);
  };

  const goToSprint = () => {
    navigate(`/Sprints/${sprint.id}`);
  };

  return (
    <div className={styles.containerCard} onClick={goToSprint}>
      <div className={styles.containerDescription}>
        <h3>{sprint.nombre}</h3>
        <p>Inicio: {new Date(sprint.fechaInicio).toLocaleDateString()}</p>
        <p>Fin: {new Date(sprint.fechaCierre).toLocaleDateString()}</p>
      </div>

      <div className={styles.actionCard}>
        <button
          className={styles.buttonCardSprintDelete}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} color="red" />
        </button>
        <button
          className={styles.buttonCardSprintEdit}
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
        >
          <FontAwesomeIcon icon={faPencilSquare} color="#5195EF" />
        </button>
      </div>
    </div>
  );
};