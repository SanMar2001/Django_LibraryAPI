import React, { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import '../index.css'; 
import countryOptions from '../components/conuntries.js'; // Importa la lista de países manualmente

export function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        birthdate: '',
        birthplace: '',
        favTopics: [],
        gender: '',
        dni: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevState => {
            if (checked) {
                return { ...prevState, favTopics: [...prevState.favTopics, value] };
            } else {
                return { ...prevState, favTopics: prevState.favTopics.filter(topic => topic !== value) };
            }
        });
    };

    const handleChangeDate = (date) => {
        setFormData(prevState => ({
            ...prevState,
            birthdate: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                user: {
                    username: formData.email,
                    password: formData.password
                },
                dni: formData.dni,
                names: formData.name,
                surnames: formData.surname,
                birthdate: formData.birthdate,
                birthplace: formData.birthplace,
                address: formData.address,
                gender: formData.gender,
                fav_topics: formData.favTopics.join(', ') // Convertir la lista de temas en una cadena separada por comas
            };

            const response = await axios.post("http://localhost:8000/users/clients/", userData);
            console.log(response.data);
            // Redirigir a la página /task-create después de un registro exitoso
            window.location.href = '/task-create';
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <h1>Registro de Usuario</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Correo Electrónico"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="Contraseña"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            placeholder="Confirmar Contraseña"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Nombre"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="surname" 
                            name="surname" 
                            value={formData.surname} 
                            onChange={handleChange} 
                            placeholder="Apellido"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate"></label>
                        <DatePicker
                            id="birthdate"
                            selected={formData.birthdate}
                            onChange={handleChangeDate}
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()} // Establece la fecha máxima como la fecha actual
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100} // Muestra un rango de 100 años hacia atrás
                            placeholderText="Fecha de Nacimiento"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthplace"></label>
                        <Select 
                            id="birthplace" 
                            name="birthplace" 
                            value={countryOptions.find(option => option.value === formData.birthplace)}
                            onChange={handleChange} 
                            options={countryOptions} 
                            placeholder="Lugar de Nacimiento"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Temas de Libros de Preferencia:</label>
                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Ciencia Ficción"
                                    checked={formData.favTopics.includes("Ciencia Ficción")}
                                    onChange={handleCheckboxChange}
                                />
                                Ciencia Ficción
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Romance"
                                    checked={formData.favTopics.includes("Romance")}
                                    onChange={handleCheckboxChange}
                                />
                                Romance
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Misterio"
                                    checked={formData.favTopics.includes("Misterio")}
                                    onChange={handleCheckboxChange}
                                />
                                Misterio
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Fantasía"
                                    checked={formData.favTopics.includes("Fantasía")}
                                    onChange={handleCheckboxChange}
                                />
                                Fantasía
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Terror"
                                    checked={formData.favTopics.includes("Terror")}
                                    onChange={handleCheckboxChange}
                                />
                                Terror
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Aventura"
                                    checked={formData.favTopics.includes("Aventura")}
                                    onChange={handleCheckboxChange}
                                />
                                Aventura
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Historia"
                                    checked={formData.favTopics.includes("Historia")}
                                    onChange={handleCheckboxChange}
                                />
                                Historia
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Autoayuda"
                                    checked={formData.favTopics.includes("Autoayuda")}
                                    onChange={handleCheckboxChange}
                                />
                                Autoayuda
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Ciencia"
                                    checked={formData.favTopics.includes("Ciencia")}
                                    onChange={handleCheckboxChange}
                                />
                                Ciencia
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="favTopics"
                                    value="Humor"
                                    checked={formData.favTopics.includes("Humor")}
                                    onChange={handleCheckboxChange}
                                />
                                Humor
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar Género</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input 
                            type="text" 
                            id="dni" 
                            name="dni" 
                            value={formData.dni} 
                            onChange={handleChange} 
                            placeholder="DNI"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            placeholder="Dirección"
                            required 
                        />
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}
