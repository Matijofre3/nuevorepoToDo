export interface ITask {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'en-progreso' | 'completado';
  fechaLimite: string;
  sprintId?: string | null;
}

export interface ICreateTask {
  sprintId: null;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado?: 'pendiente' | 'en-progreso' | 'completado';
}