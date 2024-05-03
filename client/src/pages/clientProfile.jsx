import React, { useState, useEffect } from "react";
import axios from "axios";

export function ClientProfile() {
  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState(null);

  // Función para realizar la consulta GET al backend y obtener los datos del usuario
  const realizarConsulta = async () => {
    try {
      // Obtener el id del usuario desde el almacenamiento local
      const id = localStorage.getItem('id');

      // Realizar la solicitud GET al backend para obtener los datos del usuario
      const response = await axios.get(`http://localhost:8000/users/clients/${id}`);

      // Almacenar los datos del usuario en el estado del componente
      setUsuario(response.data);
    } catch (error) {
      // Manejar errores
      console.error('Error al realizar la consulta GET:', error);
    }
  };

  // Llamar a la función para realizar la consulta cuando el componente se monte
  useEffect(() => {
    realizarConsulta();
  }, []);

  // Renderizar los datos del usuario si existen
  return (
    <div>
      <h1>Perfil del Cliente</h1>
      {usuario && (
        <div>
          <p><strong>DNI:</strong> {usuario.dni}</p>
          <p><strong>Nombre:</strong> {usuario.names}</p>
          <p><strong>Apellidos:</strong> {usuario.surnames}</p>
          <p><strong>Fecha de Nacimiento:</strong> {usuario.birthdate}</p>
          <p><strong>Lugar de Nacimiento:</strong> {usuario.birthplace}</p>
          <p><strong>Dirección:</strong> {usuario.address}</p>
        </div>
      )}
    </div>
  );
}

