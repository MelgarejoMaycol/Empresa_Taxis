import React, { useState } from "react";
import '../../src/estilos/styles.css';
import '../../src/estilos/stylesEsenciales.css';
import Encabezado from "./Encabezado";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../credenciales";

const Registro = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const registrar = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const datos = { nombres, apellidos, telefono, email, password, confirmPassword };

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        
            const registroRef = collection(db, 'Usuarios');
            await addDoc(registroRef, { ...datos, uid: user.uid });

            console.log('Usuario registrado con el ID:', user.uid);
            setSuccess("Usuario registrado con éxito");
            setError(null);
            borrarCampos();
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("El correo electrónico ya está en uso.");
            } else {
                setError("Error registrando el usuario: " + err.message);
            }
            setSuccess(null);
        }
    };

    const toLower = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

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

    const validarTelefono = (e) => {
        setTelefono(e.target.value);
        const telefono = e.target.value;
        if (telefono.length === 10) {
            console.log('Telefono valido');
        } else {
            console.log('Telefono invalido');
        }
    };

    const validarPassword = (e) => {
        setPassword(e.target.value);
        const password = e.target.value;
        if (password.length >= 8 && password.length <= 12) {
            console.log('Contraseña valida');
        } else {
            console.log('Contraseña invalida');
        }
    };

    const validarConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        const confirmPassword = e.target.value;
        if (confirmPassword === password) {
            console.log('Contraseña valida');
        } else {
            console.log('Contraseña invalida');
        }
    };

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
            <div>
                <Encabezado />
            </div>
            <div className="Login">
                <div className="LoginFondoImagenContenedor">
                    <img src="./src/assets/FondoInicioSesion.png" alt="" className="LoginFondoImagen" />
                </div>
                <motion.div
                    className="d-flex"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="LoginContenedor w-50 d-flex flex-column">
                        <label className="text-center m-4 LoginTituloSesion">REGISTRARME</label>
                        <form className="d-flex flex-column" onSubmit={registrar}>
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
                                    validarEmail(e);
                                    toLower(e);
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
                                    validarPassword(e);
                                    validarPasswordFuerte(e);
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
                                onChange={e => validarConfirmPassword(e)}
                                required
                                autoComplete="off"
                                placeholder="Confirme su contraseña"
                            />
                            <button className="BotonGeneral mt-5 mb-4 p-2 boton" type="submit">Sign Up</button>
                        </form>
                        {error && <p className="text-center text-danger">{error}</p>}
                        {success && <p className="text-center text-success">{success}</p>}
                        <a className="text-center text-decoration-none LoginTextoOpcion" href="/iniciarSesion">¿Ya tienes cuenta? Iniciar sesión</a>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Registro;
