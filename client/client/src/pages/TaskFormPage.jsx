import { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"

export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('tu_endpoint_de_login', {
                username: data.username,
                password: data.password
            });

            // Aquí puedes manejar la respuesta de tu API
            console.log(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, puedes mostrar un mensaje de error
            setErrorMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };

    const handleRegister = () => {
        // Lógica para manejar el registro
    };

    const handleAdminLogin = () => {
        // Lógica para manejar el inicio de sesión del administrador
    };

    const handleForgotPassword = () => {
        // Lógica para manejar la recuperación de contraseña
    };

    return (
        <div className="container">
            <div className="form-box">
                <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Username"
                            {...register("username", { required: true })} 
                        />
                        {errors.username && <span className="error-message">Username es requerido</span>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Password"
                            {...register("password", { required: true })} 
                        />
                        {errors.password && <span className="error-message">Password es requerido</span>}
                    </div>
                    {errorMessage && <span className="error-message">{errorMessage}</span>}
                    <div className="form-group">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div className="buttons">
                    <Link to={"/register"} className="register-link"><button className="register-button">Registrarse</button></Link>
                    <button onClick={handleAdminLogin}>Login de Administrador</button>
                    <button onClick={handleForgotPassword} className="forgot">Has olvidado tu contraseña</button>
                </div>
            </div>
        </div>
    );
}
