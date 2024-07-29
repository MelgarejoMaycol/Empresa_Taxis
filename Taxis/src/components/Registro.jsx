import React, { useState } from "react"; // Importación de React y useState
import '../../src/estilos/styles.css'; // Estilos CSS
import '../../src/estilos/stylesEsenciales.css'; // Estilos CSS esenciales
import Encabezado from "./Encabezado"; // Componente de Encabezado
import { motion } from "framer-motion"; // Animaciones con Framer Motion
import Footer from "./Footer"; // Componente de Pie de Página
import { collection, addDoc } from "firebase/firestore"; // Funciones de Firestore
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Funciones de autenticación de Firebase
import { db } from "../credenciales"; // Instancia de Firebase Firestore
import FondoInicioSesion from '../assets/FondoInicioSesion.png'; // Imagen de fondo para la página de inicio de sesión

const Registro = () => {
    // Estados locales para almacenar los datos del usuario
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Función para registrar un nuevo usuario
    const registrar = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        
        // Obtener la instancia de autenticación de Firebase
        const auth = getAuth();
        
        // Datos del usuario a registrar
        const datos = { nombres, apellidos, telefono, email, password, confirmPassword };

        try {
            // Crear un nuevo usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        
            // Guardar los datos del usuario en Firestore
            const registroRef = collection(db, 'Usuarios');
            await addDoc(registroRef, { ...datos, uid: user.uid });

            console.log('Usuario registrado con el ID:', user.uid);
            setSuccess("Usuario registrado con éxito"); // Establecer mensaje de éxito
            setError(null); // Limpiar mensaje de error
            borrarCampos(); // Limpiar los campos del formulario
        } catch (err) {
            // Manejar errores durante el registro
            if (err.code === 'auth/email-already-in-use') {
                setError("El correo electrónico ya está en uso.");
            } else {
                setError("Error registrando el usuario: " + err.message);
            }
            setSuccess(null); // Limpiar mensaje de éxito
        }
    };

    // Función para convertir el correo electrónico a minúsculas
    const toLower = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    // Función para validar el formato del correo electrónico
    const validarEmail = (e) => {
        setEmail(e.target.value);
        const email = e.target.value;
        const emailValido = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailValido) {
            console.log('Correo valido');
        } else {
            console.log('Correo invalido');
        }
    };

    // Función para validar la longitud del número de teléfono
    const validarTelefono = (e) => {
        setTelefono(e.target.value);
        const telefono = e.target.value;
        if (telefono.length === 10) {
            console.log('Telefono valido');
        } else {
            console.log('Telefono invalido');
        }
    };

    // Función para validar la longitud de la contraseña
    const validarPassword = (e) => {
        setPassword(e.target.value);
        const password = e.target.value;
        if (password.length >= 8 && password.length <= 12) {
            console.log('Contraseña valida');
        } else {
            console.log('Contraseña invalida');
        }
    };

    // Función para validar la coincidencia de la contraseña y la confirmación de la contraseña
    const validarConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        const confirmPassword = e.target.value;
        if (confirmPassword === password) {
            console.log('Contraseña valida');
        } else {
            console.log('Contraseña invalida');
        }
    };

    // Función para validar una contraseña fuerte (requiere al menos una mayúscula y un dígito)
    const validarPasswordFuerte = (e) => {
        setPassword(e.target.value);
        const password = e.target.value;
        const passwordValido = password.match(/^(?=.*[A-Z])(?=.*[0-9])/);
        if (passwordValido) {
            console.log('Contraseña valida');
        } else {
            console.log('Contraseña invalida');
        }
    };

    // Función para borrar todos los campos del formulario
    const borrarCampos = () => {
        setNombres('');
        setApellidos('');
        setTelefono('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            {/* Componente de Encabezado */}
            <Encabezado />
            <div className="Login">
                <div className="LoginFondoImagenContenedor">
                    {/* Imagen de fondo para la página de registro                    */}
                    <img src={FondoInicioSesion} alt="" className="LoginFondoImagen" />
                </div>
                <motion.div
                    className="d-flex"
                    initial={{ opacity: 0, x: -100 }} // Animación inicial
                    animate={{ opacity: 1, x: 0 }} // Animación al mostrar
                    transition={{ duration: 0.5 }} // Duración de la animación
                >
                    <div className="LoginContenedor w-50 d-flex flex-column">
                        {/* Título de la página de registro */}
                        <label className="text-center m-4 LoginTituloSesion">REGISTRARME</label>
                        {/* Formulario de registro */}
                        <form className="d-flex flex-column" onSubmit={registrar}>
                            {/* Campos para ingresar nombres, apellidos, teléfono, correo electrónico, contraseña y confirmación de contraseña */}
                            <label className="mb-3" htmlFor="nombres">Nombres</label>
                            <input
                                className="Input mt-2 mb-2 p-2 text-field"
                                type="text"
                                id="nombres"
                                value={nombres}
                                onChange={e => setNombres(e.target.value)}
                                required
                                autoComplete="off"
                                placeholder="Ingrese su nombre"
                            />
                            <label className="mt-2 mb-2" htmlFor="apellidos">Apellidos</label>
                            <input
                                className="Input mt-2 mb-2 p-2 text-field"
                                type="text"
                                id="apellidos"
                                value={apellidos}
                                onChange={e => setApellidos(e.target.value)}
                                required
                                autoComplete="off"
                                placeholder="Ingrese su apellido"
                            />
                            <label className="mt-2 mb-2" htmlFor="telefono">Teléfono</label>
                            <input
                                className="Input mt-2 mb-2 p-2 text-field"
                                type="number"
                                value={telefono}
                                id="telefono"
                                onChange={e => validarTelefono(e)}
                                required
                                autoComplete="off"
                                placeholder="Ingrese su número de teléfono"
                            />
                            <label className="mt-2 mb-2" htmlFor="email">Email</label>
                            <input
                                className="Input mt-2 mb-2 p-2 text-field"
                                type="email"
                                value={email}
                                id="email"
                                onChange={e => {
                                    validarEmail(e); // Validar formato de correo electrónico
                                    toLower(e); // Convertir a minúsculas
                                }}
                                required
                                autoComplete="off"
                                placeholder="Ingrese su correo electrónico"
                            />
                            <label className="mt-2 mb-2" htmlFor="password">Password</label>
                            <input
                                className="Input mt-2 mb-2 p-2 text-field"
                                type="password"
                                value={password}
                                id="password"
                                onChange={e => {
                                    validarPassword(e); // Validar longitud de contraseña
                                    validarPasswordFuerte(e); // Validar si es una contraseña fuerte
                                }}
                                required
                                autoComplete="off"
                                placeholder="Ingrese su contraseña"
                            />
                            <label className="mt-2 mb-2" htmlFor="confirmPassword">Confirmar Password</label>
                            <input
                                className="Input mt-2 mb-2 p-2 text-field"
                                type="password"
                                value={confirmPassword}
                                id="confirmPassword"
                                onChange={e => validarConfirmPassword(e)} // Validar la coincidencia de la contraseña y la confirmación de contraseña
                                required
                                autoComplete="off"
                                placeholder="Confirme su contraseña"
                            />
                            {/* Botón de registro */}
                            <button className="BotonGeneral mt-5 mb-4 p-2 boton" type="submit">Sign Up</button>
                        </form>
                        {/* Mensaje de error en caso de fallo en el registro */}
                        {error && <p className="text-center text-danger">{error}</p>}
                        {/* Mensaje de éxito */}
                        {success && <p className="text-center text-success">{success}</p>}
                        {/* Enlace para redirigir al usuario a la página de inicio de sesión */}
                        <a className="text-center text-decoration-none LoginTextoOpcion" href="/iniciarSesion">¿Ya tienes cuenta? Iniciar sesión</a>
                    </div>
                </motion.div>
            </div>
            {/* Componente de Pie de Página */}
            <Footer />
        </div>
    );
};

export default Registro; // Exportación del componente Registro

