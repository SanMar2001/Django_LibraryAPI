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
      <br /><br /><br /><br /><br /><br /><br />
      <h1>¡Bienvenido a nuestro sitio web!</h1>
      <h2>Aquí nuestras últimas novedades disponibles para ti</h2>

      <div className="slider">
        <button className="button button-prev" onClick={prevBook}>&#10094;</button>

        <div className="book-details">
          <img className="book-image" src={books[currentIndex]?.image} alt="imagen del libro" />
          <h2 className="book-title">{books[currentIndex]?.title}</h2>
          <p className="book-info">Autor: {books[currentIndex]?.author}</p>
          <p className="book-info">Género: {books[currentIndex]?.gender}</p>
          <p className="book-info">Precio: ${books[currentIndex]?.price}</p>
          <p className="book-info">Condición: {books[currentIndex]?.condition}</p>
        </div>

        <button className="button button-next" onClick={nextBook}>&#10095;</button>
      </div>

      <div className="section">
        <h3>Lorem</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, corporis, consectetur officia maiores cupiditate at quidem accusantium ratione molestiae, labore ad commodi ipsum. Autem earum ex aspernatur natus accusantium sunt.</p>
      </div>

      <div className="section">
        <h3>Contactanos</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio aut magnam aliquid, sequi repellat nostrum corporis earum quaerat numquam aspernatur est quos beatae ratione facere exercitationem velit accusamus expedita dolor.</p>
      </div>

      <br />
      <br />
      <br />
      <br />
<br /><br /><br /><br /><br /><br /><br /><br /><br />

      <footer className="footer">
        <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}