import { useState } from 'react';
import '../index.css'; // Importa el archivo index.css ubicado al mismo nivel que la carpeta pages

export function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos de registro al backend o hacer otras acciones necesarias
        console.log(formData);
    };

    return (
        <div className="container">
            <div className="register-content">
                <h1>Registro de Usuarios</h1>
            </div>
            <div className="form-box">
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}
