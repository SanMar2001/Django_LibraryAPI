import React, { useState, useEffect } from "react";
import axios from "axios";

export function AdminStores() {
  // Estado para almacenar la lista de libros
  const [stores, setStores] = useState([]);

  // Estado para controlar el índice del libro actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para desplazarse al libro anterior
  const prevStore = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? stores.length - 1 : prevIndex - 1));
  };

  // Función para desplazarse al siguiente libro
  const nextStore = () => {
    setCurrentIndex((prevIndex) => (prevIndex === stores.length - 1 ? 0 : prevIndex + 1));
  };

  // Función para cargar los libros desde el servidor
  useEffect(() => {
    axios.get('http://localhost:8000/manage/stores/')
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error('Error fetching stores:', error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <div className="container content">
      {/* Encabezado de la página */}
      <h1>Manejo de tiendas</h1>

      {/* Contenido principal */}
      <div className="slider">
        {/* Botón para desplazarse al libro anterior */}
        <button className="button" onClick={prevStore}>&#10094;</button>

        {/* Detalles del libro actual */}
        <div className="book-details">
            <p>ID: {stores[currentIndex]?.id}</p>
            <p>Tienda: {stores[currentIndex]?.address}</p>
            <p>Horario: {stores[currentIndex]?.schedule}</p>

        </div>

        {/* Botón para desplazarse al siguiente libro */}
        <button className="button" onClick={nextStore}>&#10095;</button>
      </div>

      {/* Pie de página */}
      <footer className="footer">
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}