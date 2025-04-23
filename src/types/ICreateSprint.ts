export interface ICreateSprint {
  nombre: string;
  fechaInicio: string;
  fechaCierre: string;
  tareas?: string[]; // Hacer opcional
}