import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";

function App() {
  return(

    <BrowserRouter>

    <Navigation/>

      <Routes> 
        <Route path="/" element={<Navigate to="/task" />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/task-create" element={<TaskFormPage />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App