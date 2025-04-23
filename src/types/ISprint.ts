export interface ISprint {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaCierre: string;
  tareas?: string[]; // IDs de tareas
}

export interface ICreateSprint {
  nombre: string;
  fechaInicio: string;
  fechaCierre: string;
}