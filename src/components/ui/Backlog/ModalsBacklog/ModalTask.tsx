import { FC, FormEvent, useEffect, useState } from "react";
import styles from "./ModalTask.module.css";
import { ICreateTask, ITask } from "../../../../types/ITask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";

interface IModalTaskProps {
  task?: ITask;
  onClose: () => void;
  onSubmit: (task: ICreateTask | ITask) => void;
}

export const ModalTask: FC<IModalTaskProps> = ({ 
  task, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<ICreateTask>({
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    estado: "pendiente"
  });

  useEffect(() => {
    if (task) {
      setFormData({
        titulo: task.titulo,
        descripcion: task.descripcion,
        fechaLimite: task.fechaLimite,
        estado: task.estado
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(task ? { ...task, ...formData } : formData);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{task ? "Editar Tarea" : "Crear Tarea"}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Fecha Límite</label>
            <input
              type="date"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
              required
            />
          </div>

          {task && (
            <div className={styles.formGroup}>
              <label>Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en-progreso">En Progreso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
          )}

          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              <FontAwesomeIcon icon={faSave} /> {task ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};