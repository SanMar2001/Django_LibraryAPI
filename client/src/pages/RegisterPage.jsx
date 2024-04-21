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
        favTopics: '',
        gender: '',
        dni: '',
        address: ''
    });

    const handleChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            birthplace: selectedOption.value
        }));
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
                fav_topics: formData.favTopics
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
                        <input 
                            type="text" 
                            id="favTopics" 
                            name="favTopics" 
                            value={formData.favTopics} 
                            onChange={handleChange} 
                            placeholder="Temas de Libros de Preferencia (separados por coma)"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="gender" 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange} 
                            placeholder="Género"
                            required 
                        />
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
