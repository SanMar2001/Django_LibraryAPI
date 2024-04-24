import React, { useState } from "react";

export function TaskPage() {
  // Datos de ejemplo de libros
  const books = [
    { id: 1, title: "Libro 1", description: "Descripción del libro 1" },
    { id: 2, title: "Libro 2", description: "Descripción del libro 2" },
    { id: 3, title: "Libro 3", description: "Descripción del libro 3" },
  ];

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
          <h2>{books[currentIndex].title}</h2>
          <p>{books[currentIndex].description}</p>
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
