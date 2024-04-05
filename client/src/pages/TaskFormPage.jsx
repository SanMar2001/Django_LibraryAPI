import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createTask } from "../api/task.api";

export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await createTask(data); // Utiliza la función createTask para enviar los datos
            // Aquí puedes manejar la respuesta de tu API
            console.log(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, puedes mostrar un mensaje de error
            setErrorMessage('Error al crear la tarea. Por favor, verifica los datos ingresados.');
        }
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
                        <button type="submit" className="login-button">Login</button>
                    </div>
                </form>
                <div className='buttons'>
                    <Link to={"/register"}><button>Registrarse</button></Link>
                    <Link to={"/adminlogin"}><button>Login de Administrador</button></Link>
                    <button className="forgot" onClick={handleForgotPassword}>Has olvidado tu contraseña?</button>
                </div>
            </div>
        </div>
    );
}
