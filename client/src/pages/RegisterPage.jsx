import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import addYears from 'date-fns/addYears';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

export function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        names: '',
        surnames: '',
        birthdate: null,
        birthplaceCountry: '',
        birthplaceCity: '',
        favTopics: [],
        gender: '',
        dni: '',
        address: ''
    });

    const [countryOptions, setCountryOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [errors, setErrors] = useState({});

    const today = new Date();
    const minDate = addYears(today, -18);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countries = response.data.map(country => ({
                    value: country.cca2,
                    label: country.name.common
                }));
                setCountryOptions(countries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

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

    const handleSelectCountryChange = async (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            birthplaceCountry: selectedOption.value,
            birthplaceCity: '' // Reset city when country changes
        }));

        try {
            const response = await axios.get(`http://api.geonames.org/searchJSON?country=${selectedOption.value}&username=demo&featureClass=P`);
            const cities = response.data.geonames.map(city => ({
                value: city.name,
                label: city.name
            }));
            setCityOptions(cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleSelectCityChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            birthplaceCity: selectedOption.value
        }));
    };

    const validateEmail = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(formData.email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailValid = validateEmail();
        if (!emailValid) {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Por favor ingrese una dirección de correo electrónico válida.' }));
            return;
        } else {
            setErrors(prevErrors => ({ ...prevErrors, email: null }));
        }

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
                birthplace: `${formData.birthplaceCity}, ${formData.birthplaceCountry}`,
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
            <br /><br />
            <div className="form-box">
                <h1>Registro de Usuario</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={validateEmail}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Correo Electrónico"
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Confirmar Contraseña"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="names" className="form-label">Nombres</label>
                        <input
                            type="text"
                            id="names"
                            name="names"
                            value={formData.names}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Nombres"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surnames" className="form-label">Apellidos</label>
                        <input
                            type="text"
                            id="surnames"
                            name="surnames"
                            value={formData.surnames}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Apellidos"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="birthdate" className="form-label">Fecha de Nacimiento</label>
                        <DatePicker
                            id="birthdate"
                            name="birthdate"
                            selected={formData.birthdate}
                            onChange={handleChangeDate}
                            className="form-control"
                            placeholderText="Seleccione fecha"
                            dateFormat="dd/MM/yyyy"
                            maxDate={minDate}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="birthplaceCountry" className="form-label">Lugar de Nacimiento - País</label>
                        <Select
                            id="birthplaceCountry"
                            name="birthplaceCountry"
                            value={countryOptions.find(option => option.value === formData.birthplaceCountry)}
                            onChange={handleSelectCountryChange}
                            options={countryOptions}
                            className="form-control"
                            placeholder="Seleccione país de nacimiento"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="birthplaceCity" className="form-label">Lugar de Nacimiento - Ciudad</label>
                        <Select
                            id="birthplaceCity"
                            name="birthplaceCity"
                            value={cityOptions.find(option => option.value === formData.birthplaceCity)}
                            onChange={handleSelectCityChange}
                            options={cityOptions}
                            className="form-control"
                            placeholder="Seleccione ciudad de nacimiento"
                            isDisabled={!formData.birthplaceCountry}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Temas de Libros de Preferencia</label>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="favSciFi"
                                name="favTopics"
                                value="Ciencia Ficción"
                                checked={formData.favTopics.includes("Ciencia Ficción")}
                                onChange={handleCheckboxChange}
                                className="form-check-input"
                            />
                            <label htmlFor="favSciFi" className="form-check-label">Ciencia Ficción</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="favRomance"
                                name="favTopics"
                                value="Romance"
                                checked={formData.favTopics.includes("Romance")}
                                onChange={handleCheckboxChange}
                                className="form-check-input"
                            />
                            <label htmlFor="favRomance" className="form-check-label">Romance</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="favMystery"
                                name="favTopics"
                                value="Misterio"
                                checked={formData.favTopics.includes("Misterio")}
                                onChange={handleCheckboxChange}
                                className="form-check-input"
                            />
                            <label htmlFor="favMystery" className="form-check-label">Misterio</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Género</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="">Seleccionar Género</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dni" className="form-label">DNI</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Ingrese su DNI"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Ingrese su dirección"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrarse</button>
                </form>
            </div>
        </div>
    );
}
