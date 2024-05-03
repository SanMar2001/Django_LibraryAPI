import React, { useState, useEffect } from "react";
import axios from "axios";

export function AdminBooks() {
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
      <h1>Manejo de libros</h1>

      {/* Contenido principal */}
      <div className="slider">
        {/* Botón para desplazarse al libro anterior */}
        <button className="button" onClick={prevBook}>&#10094;</button>

        {/* Detalles del libro actual */}
        <div className="book-details">
          {/* Mostrar la imagen del libro si existe */}
          <img className="newsImage" src={books[currentIndex]?.image} alt="imagen del libro" />
          <h2>{books[currentIndex]?.title}</h2>
          <p>ID: {books[currentIndex]?.id}</p>
          <p>Tienda: {books[currentIndex]?.store}</p>
          <p>Título: {books[currentIndex]?.title}</p>
          <p>Autor: {books[currentIndex]?.author}</p>
          <p>Género: {books[currentIndex]?.gender}</p>
          <p>Precio: ${books[currentIndex]?.price}</p>
          <p>Año de Publicación: {books[currentIndex]?.pubYear}</p>
          <p>Fecha de Publicación: {books[currentIndex]?.pubDate}</p>
          <p>Páginas: {books[currentIndex]?.pages}</p>
          <p>Editorial: {books[currentIndex]?.editorial}</p>
          <p>ISSBN: {books[currentIndex]?.issbn}</p>
          <p>Idioma: {books[currentIndex]?.language}</p>
          <p>Condición: {books[currentIndex]?.condition}</p>
          <p>Precio: {books[currentIndex]?.condition}</p>
        </div>

        {/* Botón para desplazarse al siguiente libro */}
        <button className="button" onClick={nextBook}>&#10095;</button>
      </div>

      {/* Pie de página */}
      <footer className="footer">
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}