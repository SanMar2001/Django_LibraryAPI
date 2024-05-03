import React, { useState, useEffect } from "react";

export function AdminProfile() {
    const handleStores = async () => {
        window.location.href = "/adminstores";
    };

    const handleBooks = async () => {
        window.location.href = ("/adminbooks")
    };

  return (
        
    <div>
        <br />
        <br />
        <h1>Bienvenido al Panel de Administradores</h1>
        <h3>Seleccione la opción a manejar</h3>
        <button onClick={handleStores}>Manejo de Tiendas</button>
        <button onClick={handleBooks}>Manejo de Libros</button>
    </div>
  );
}