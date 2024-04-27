import React, { useState, useEffect } from "react";
import axios from "axios";

export function TaskPage() {
  // Estado para almacenar la lista de libros
  const [books, setBooks] = useState([]);

  // Estado para controlar el índice del libro actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para desplazarse al libro anterior
  const prevBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? books.length - 1 : prevIndex - 1));
  };

  // Función para desplazarse al siguiente libro
  const nextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex === books.length - 1 ? 0 : prevIndex + 1));
  };

  // Función para cargar los libros desde el servidor
  useEffect(() => {
    axios.get('http://localhost:8000/manage/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <div className="container content">
      {/* Encabezado de la página */}
      <h1>¡Bienvenido a mi sitio web!</h1>

      {/* Contenido principal */}
      <div className="slider">
        {/* Botón para desplazarse al libro anterior */}
        <button onClick={prevBook}>&#10094;</button>

        {/* Detalles del libro actual */}
        <div className="book-details">
          <h2>{books[currentIndex]?.title}</h2>
          <p>Autor: {books[currentIndex]?.author}</p>
          <p>Género: {books[currentIndex]?.gender}</p>
          <p>Precio: {books[currentIndex]?.price}</p>
        </div>

        {/* Botón para desplazarse al siguiente libro */}
        <button onClick={nextBook}>&#10095;</button>
      </div>

      {/* Pie de página */}
      <footer>
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
