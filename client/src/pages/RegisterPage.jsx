import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import '../index.css';
import countryOptions from '../components/conuntries.js';
import addYears from 'date-fns/addYears';

export function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        names: '',
        surnames: '',
        birthdate: null,
        birthplace: '',
        favTopics: [],
        gender: '',
        dni: '',
        address: ''
    });

    const today = new Date();
    const minDate = addYears(today, -18);

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

    const handleSelectChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            birthplace: selectedOption.value
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
                names: formData.names,
                surnames: formData.surnames,
                birthdate: formData.birthdate ? formData.birthdate.toISOString().split('T')[0] : '',
                birthplace: formData.birthplace,
                address: formData.address,
                gender: formData.gender === 'Hombre' ? 'Masculino' : formData.gender,
                fav_topics: formData.favTopics.join(', '),
            };

            const response = await axios.post("http://localhost:8000/users/clients/", userData);
            console.log(response.data);
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
                            id="names"
                            name="names"
                            value={formData.names}
                            onChange={handleChange}
                            placeholder="Nombres"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="surnames"
                            name="surnames"
                            value={formData.surnames}
                            onChange={handleChange}
                            placeholder="Apellidos"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate">Fecha de Nacimiento:</label>
                        <DatePicker
                            id="birthdate"
                            name="birthdate"
                            selected={formData.birthdate}
                            onChange={handleChangeDate}
                            placeholderText="Seleccione fecha"
                            dateFormat="dd/MM/yyyy"
                            maxDate={minDate}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthplace">Lugar de Nacimiento:</label>
                        <Select
                            id="birthplace"
                            name="birthplace"
                            value={countryOptions.find(option => option.value === formData.birthplace)}
                            onChange={handleSelectChange}
                            options={countryOptions}
                            placeholder="Seleccione lugar de nacimiento"
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
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Género:</label>
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
                        <label htmlFor="dni">DNI:</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            placeholder="Ingrese su DNI"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Ingrese su dirección"
                            required
                        />
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}