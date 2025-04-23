import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { Header } from "./components/ui/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header title="Gestor de Tareas y Sprints" />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;