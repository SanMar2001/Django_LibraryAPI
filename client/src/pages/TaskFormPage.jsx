import { useState } from 'react';
import axios from "axios";
import '../index.css'; 

export function TaskFormPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/users/login/", formData);
            console.log(response.data);
            // Si la respuesta es exitosa, redirigir al usuario a otra página
            if (response.status === 200) {
                // Almacenar el token de acceso en el almacenamiento local
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('type', response.data.type);
                localStorage.setItem('id', response.data.id);
                // Redirigir al usuario a otra página
                
                const userType = localStorage.getItem('type');
                if ( userType === 'client') {
                    window.location.href = "/clientprofile";
                } else if ( userType === 'admin') {
                    window.location.href = "/adminprofile";
                } else if ( userType === 'root') {
                    window.location.href = "/rootprofile"
                }
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
    };

    const handleForgotPassword = () => {
        // Lógica para manejar la recuperación de contraseña
    };

    return (
        <div className="container">
            <br /><br /><br /><br /><br /><br /><br />
            <div className="form-box">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder="Nombre de Usuario"
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
                    <div className='buttons'>
                        <button type="submit">Iniciar Sesión</button>
                        <button onClick={() => window.location.href = "/register"}>Registrarse</button>

                    </div>    
                </form>
            </div>
        </div>
    );
}
