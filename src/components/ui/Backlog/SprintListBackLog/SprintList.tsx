import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SprintList.module.css";
import { faPlus, faRocket } from "@fortawesome/free-solid-svg-icons";
import { CardSprint } from "../CardsSprint/CardsSprint";
import { useEffect, useState } from "react";
import { useSprint } from "../../../../hooks/useSprint";
import { ICreateSprint, ISprint } from "../../../../types/ISprint";
import { ModalSprint } from "../ModalsBacklog/ModalSprint";

export const SprintList = () => {
  const { sprints, getSprints } = useSprint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSprint, setCurrentSprint] = useState<ISprint | undefined>();

  // Cargar sprints al montar el componente
  useEffect(() => {
    getSprints();
  }, [getSprints]);

  const handleEditSprint = (sprint: ISprint) => {
    setCurrentSprint(sprint);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSprint(undefined);
  };

  const handleSubmitSprint = async (sprint: ISprint | ICreateSprint) => {
    try {
      if ('id' in sprint) {
        // Actualizar sprint existente
        await useSprint().updateSprint(sprint.id, sprint);
      } else {
        // Crear nuevo sprint
        await useSprint().createSprint(sprint);
      }
      getSprints(); // Recargar la lista
      handleCloseModal();
    } catch (error) {
      console.error("Error saving sprint:", error);
    }
  };

  return (
    <div className={styles.sprints}>
      <h1 className={styles.titleSprint}>
        <FontAwesomeIcon icon={faRocket} /> Sprints
      </h1>

      <button
        className={styles.addSprint}
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Nuevo Sprint
      </button>

      <div className={styles.sprintsContainer}>
        {sprints.length > 0 ? (
          sprints.map((sprint) => (
            <CardSprint
              key={sprint.id}
              sprint={sprint}
              onEdit={handleEditSprint}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No hay sprints creados</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ModalSprint 
          sprint={currentSprint} 
          onClose={handleCloseModal}
          onSubmit={handleSubmitSprint}
        />
      )}
    </div>
  );
};