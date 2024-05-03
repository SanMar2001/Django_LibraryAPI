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
      <nav className="navbar">
        {/* Logo */}
        <Link to="/task">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        
        {/* Elementos de navegación */}
        <div className="navigation-links">
          <Link to="/task" className="navigation-item">Inicio</Link>
          {isLoggedIn ? (
            <>
              <button className="navigation-item" onClick={handleLogout} style={{ marginLeft: "10px" }}>Cerrar Sesión</button>
              <Link to="/clientprofile" className="navigation-item" style={{ marginLeft: "10px" }}>Perfil</Link>
            </>
          ) : (
            <Link to="/task-create" className="navigation-item" style={{ marginLeft: "10px" }}>Iniciar Sesión</Link>
          )}
          <Link to="/contact" className="navigation-item" style={{ marginLeft: "10px" }}>Contáctanos</Link>
          <Link to="/aboutus" className="navigation-item" style={{ marginLeft: "10px" }}>Sobre Nosotros</Link>
        </div>
      </nav>

  );
}
