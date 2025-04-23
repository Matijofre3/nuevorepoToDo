import { Header } from "../../ui/Header/Header";
import { ListTasks } from "../../ui/Backlog/ListTasks/ListTasks";
import { SprintList } from "../../ui/Backlog/SprintListBackLog/SprintList";
import styles from "./BacklogScreen.module.css";
import { useTaskStore, useSprintStore } from "../../../store";

export const BacklogScreen = () => {
  const { tasks } = useTaskStore();
  const { sprints } = useSprintStore();

  const backlogTasks = tasks.filter(task => !task.sprintId);

  return (
    <>
      <Header title="Administrador de tareas: Backlog" />
      <div className={styles.containerPrincipalListTareas}>
        <SprintList sprints={sprints} />
        <ListTasks tasks={backlogTasks} />
      </div>
    </>
  );
};