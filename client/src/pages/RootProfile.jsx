import React, { useState, useEffect } from "react";
import axios from "axios";

export function RootProfile() {
  // Estado para almacenar la lista de admins
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    names: '',
    surnames: '',
    dni: '',
    address: '',
    id: '',
    birthplace: ''
  });

  // Estado para controlar el índice del admin actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para desplazarse al admin anterior
  const prevAdmin = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? admins.length - 1 : prevIndex - 1));
  };

  // Función para desplazarse al siguiente admin
  const nextAdmin = () => {
    setCurrentIndex((prevIndex) => (prevIndex === admins.length - 1 ? 0 : prevIndex + 1));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        dni: formData.dni,
        names: formData.names,
        surnames: formData.surnames,
        address: formData.address,
        birthplace: formData.birthplace
    };
      const response = await axios.patch(`http://localhost:8000/users/admins/${formData.id}/`, userData);
      if (response) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  // Función para cargar los admins desde el servidor
  useEffect(() => {
    axios.get('http://localhost:8000/users/admins/')
      .then(response => {
        setAdmins(response.data);
        const currentAdmin = response.data[currentIndex];
        setFormData({
            names: currentAdmin.names,
            surnames: currentAdmin.surnames,
            dni: currentAdmin.dni,
            id: currentAdmin.id,
            address: currentAdmin.address,
            birthplace: currentAdmin.birthplace
          });
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
      });
  }, [currentIndex]); // Ejecutar cuando el currentIndex cambie

  return (
    <div class="container content">
      <br /><br /><br /><br /><br /><br />
      {/* Encabezado de la página */}
      <h1>Manejo de Administradores</h1>

      {/* Contenido principal */}
      <div class="slider">
        {/* Botón para desplazarse al admin anterior */}
        <button class="button" onClick={prevAdmin}>&#10094;</button>

        {/* Detalles del admin actual */}
        <div class="admin-details">
          <p>Nombre: {admins[currentIndex]?.names}</p>
          <p>Apellido: {admins[currentIndex]?.surnames}</p>
          <p>DNI: {admins[currentIndex]?.dni}</p>
          <p>Dirección: {admins[currentIndex]?.address}</p>
          <p>Lugar de nacimiento: {admins[currentIndex]?.birthplace}</p>
        </div>

        {/* Botón para desplazarse al siguiente admin */}
        <button class="button" onClick={nextAdmin}>&#10095;</button>
      </div>
      <br />
      <br />
      <div>
        <h2>Actualizar información</h2>
        {formData && (
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input class="form-input" type="text" name="names" value={formData.names} onChange={handleChange} />
          </label>
          <br />
          <label>
            Apellidos:
            <input class="form-input" type="text" name="surnames" value={formData.surnames} onChange={handleChange} />
          </label>
          <br />
          <label>
            DNI:
            <input class="form-input" type="text" name="dni" value={formData.dni} onChange={handleChange} />
          </label>
          <br />
          <label>
            Dirección:
            <input class="form-input" type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <br />
          <label>
            Lugar de nacimiento:
            <input class="form-input" type="text" name="birthplace" value={formData.birthplace} onChange={handleChange} />
          </label>
          <br />
          <button class="form-button" type="submit">Actualizar</button>
          <br />
          <br />
          <h3>No olvides enviar los datos completos</h3>
        </form>
        )}
      </div>
      <br />
      <br />
      <br />
      <br /><br /><br /><br /><br />  
      {/* Pie de página */}
      <footer class="footer">
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>

  );
}
