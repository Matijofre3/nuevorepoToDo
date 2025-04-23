import { Route, Routes } from "react-router-dom";
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<BacklogScreen />} />
      <Route path="/sprints" element={<BacklogScreen />} /> {/* Ruta para /sprints */}
      <Route path="/sprints/:id" element={<SprintScreen />} />
    </Routes>
  );
};