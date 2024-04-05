import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";

function App() {
  return(

    <BrowserRouter>

    <Navigation/>

      <Routes> 
        <Route path="/" element={<Navigate to="/task" />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/task-create" element={<TaskFormPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App