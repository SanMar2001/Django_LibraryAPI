import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import  LogoutPage  from "./pages/LogoutPage";
import { ClientProfile } from "./pages/clientProfile";

function App() {
  return(

    <BrowserRouter>

    <Navigation/>

      <Routes> 
        <Route key="index" path="/" element={<Navigate to="/task" />} />
        <Route key="task" path="/task" element={<TaskPage />} />
        <Route key="logout" path="/logout" element={<LogoutPage />} />
        <Route key="taskcreate" path="/task-create" element={<TaskFormPage />} />
        <Route key="register" path="/register" element={<RegisterPage />} />
        <Route key="adminlogin" path="/adminlogin" element={<AdminLoginPage />} />
        <Route key="clientprofile" path="/clientprofile" element={<ClientProfile />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App