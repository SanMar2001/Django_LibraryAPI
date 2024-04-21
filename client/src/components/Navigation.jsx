import { Link } from "react-router-dom";
import logo from "../assets/book.jpeg"; // Importa la imagen

export function Navigation() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <img src={logo} alt="Logo" className="logo" />
      
      {/* Elementos de navegación */}
      <div className="navigation-links">
        <Link to="/task" className="navigation-item">Inicio</Link>
        <Link to="/task-create" className="navigation-item" style={{ marginLeft: "10px" }}>Iniciar Sesión</Link>
      </div>
    </nav>
  );
}
