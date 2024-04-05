import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../index.css'; 

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
                        <input 
                            type="text" 
                            id="birthdate" 
                            name="birthdate" 
                            value={formData.birthdate} 
                            onChange={handleChange} 
                            placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="birthplace" 
                            name="birthplace" 
                            value={formData.birthplace} 
                            onChange={handleChange} 
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
