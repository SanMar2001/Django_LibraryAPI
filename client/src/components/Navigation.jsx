import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/book.jpeg"; // Importa la imagen

export function Navigation() {
  // Estado para controlar si el usuario está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Función para verificar el estado de autenticación 
  const checkAuthentication = async () => {
    try {
      // Obtenemos el token de acceso del almacenamiento local
      const accessToken = localStorage.getItem('accessToken');

      // Verificamos si el token de acceso existe y es válido
      if (accessToken) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      // Si hay un error, el usuario no está autenticado
      setIsLoggedIn(false);
      console.error('Error al verificar autenticación:', error);
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      // Obtenemos el token de acceso del almacenamiento local
      const accessToken = localStorage.getItem('accessToken');

      // Verificamos si el token de acceso existe y es válido
      if (!accessToken) {
        console.error('Token de acceso no encontrado');
        return;
      }

      // Realizamos la solicitud de logout con el token de acceso
      const response = await axios.post('http://localhost:8000/users/logout/', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`  
        }
      });

      // Eliminamos el token de acceso del almacenamiento local
      localStorage.removeItem('accessToken');
      localStorage.removeItem('type');
      localStorage.removeItem('id');

      // Establecemos el estado de autenticación a false
      setIsLoggedIn(false);

      // Redirigimos al usuario a la página de inicio de sesión
      window.location.href = '/task';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Logo */}
      <Link to="/task" className="navbar-brand">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      {/* Elementos de navegación */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/task" className="nav-link">Inicio</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar Sesión</button>
              </li>
              <li className="nav-item">
                <Link to="/clientprofile" className="nav-link">Perfil</Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className="nav-link">Compra</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/task-create" className="nav-link">Iniciar Sesión</Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contáctanos</Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link">Sobre Nosotros</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
