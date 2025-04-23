import { FC } from "react";
import styles from "./Header.module.css";

interface IHeaderProps {
  title: string;
}

export const Header: FC<IHeaderProps> = ({ title }) => {
  return (
    <header className={styles.containerHeader}>
      <h1>{title}</h1>
    </header>
  );
};