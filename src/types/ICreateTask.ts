export interface ICreateTask {
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado?: 'pendiente' | 'en-progreso' | 'completado'; // Hacer opcional
  sprintId?: string | null;
}