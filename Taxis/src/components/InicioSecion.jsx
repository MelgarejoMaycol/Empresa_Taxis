import React, { useState, useContext } from "react"; // Importación de React y useState
import { useNavigate } from "react-router-dom"; // Hook para la navegación
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Funciones de autenticación de Firebase
import { doc, getDoc } from "firebase/firestore"; // Funciones de Firestore
import { motion } from 'framer-motion'; // Animaciones con Framer Motion
import Encabezado from "./Encabezado"; // Componente de Encabezado
import Footer from "./Footer"; // Componente de Pie de Página
import { db } from "../credenciales"; // Instancia de Firebase Firestore
import { UserContext } from '../context/UserContext.jsx'; // Contexto de usuario
import '../../src/estilos/styles.css'; // Estilos CSS
import FondoInicioSesion from '../assets/FondoInicioSesion.png'; // Imagen de fondo para la página de inicio de sesión

const InicioSesion = () => {
  // Estados locales para almacenar el correo electrónico, contraseña y mensaje de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  // Hook para la navegación
  const navigate = useNavigate();
  
  // Contexto de usuario para actualizar el estado del usuario autenticado
  const { setUser } = useContext(UserContext);

  // Función para manejar el inicio de sesión del usuario
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
    // Obtener la instancia de autenticación de Firebase
    const auth = getAuth();

    try {
        // Iniciar sesión con correo electrónico y contraseña
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Mostrar información del usuario autenticado en la consola
        console.log('Usuario autenticado:', user);

        // Obtener los datos adicionales del usuario desde Firestore
        const docRef = doc(db, 'Usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        // Si existen datos adicionales del usuario en Firestore, actualizar el contexto de usuario con esos datos
        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log('Datos del usuario desde Firestore:', userData);
            setUser({ ...user, displayName: userData.nombres });  // Asignar displayName desde Firestore
            console.log('Usuario actualizado en el contexto:', { ...user, displayName: userData.nombres });
        } else {
            console.log('No se encontró información adicional del usuario en Firestore');
            setUser(user);  // Si no hay datos adicionales, solo establece el usuario básico
        }

        setError(null); // Limpiar el mensaje de error
        navigate('/'); // Redirigir al usuario a la página de inicio
    } catch (e) {
        setError(e.message); // Capturar y mostrar el mensaje de error
        console.log(e.code, e.message);
    }
  }

  // Función para convertir el correo electrónico a minúsculas
  const toLower = (e) => {
    setEmail(e.target.value.toLowerCase());
  }

  // Función para validar el formato del correo electrónico
  const validarEmail = (e) => {
    setEmail(e.target.value);
    const email = e.target.value;
    const emailValido = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (emailValido) {
        //console.log('Correo valido');
    } else {
        //console.log('Correo invalido');
    }
  }

  // Función para validar el formato de la contraseña
  const validarPassword = (e) => {
    setPassword(e.target.value);
    const passwordValido = password.match(/^(?=.*[A-Z])(?=.*[0-9])/);
    if (passwordValido) {
        //console.log('Contraseña valida');
    } else {
        //console.log('Contraseña invalida');
    }
  }

  // Función para borrar los campos de correo electrónico y contraseña
  const borrarCampos = () => {
    setEmail('');
    setPassword('');
  }

  return (
    <div>
      {/* Componente de Encabezado */}
      <Encabezado />
      <div className="Login">
        <div className="LoginFondoImagenContenedor">
          {/* Imagen de fondo para la página de inicio de sesión */}
          <img src={FondoInicioSesion} alt="" className="LoginFondoImagen" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Animación inicial
          animate={{ opacity: 1, x: 0 }} // Animación al mostrar
          transition={{ duration: 0.5 }} // Duración de la animación
        >
          <div className="LoginPaginaCompleta">
            <div className="LoginContenedor w-50 d-flex flex-column">
              {/* Título de la página de inicio de sesión */}
              <label className="text-center m-4 LoginTituloSesion">INICIO SESION</label>
              {/* Formulario de inicio de sesión */}
              <form className="d-flex flex-column" onSubmit={handleLogin}>
                {/* Campo de correo electrónico */}
                <label className="mb-3" htmlFor="email">Email</label>
                <input
                  className="Input mt-2 mb-2 p-2 text-field"
                  type="email"
                  id='email'
                  value={email}
                  onChange={(e) => {
                    toLower(e); // Convertir el correo electrónico a minúsculas
                    validarEmail(e); // Validar el formato del correo electrónico
                  }}
                  required
                  autoComplete="off"
                  placeholder="Ingrese su correo electrónico"
                />
                {/* Campo de contraseña */}
                <label className="mt-2 mb-2" htmlFor="password" >Password</label>
                <input
                  className="Input mt-2 mb-2 p-2 text-field"
                  type="password"
                  id='password'
                  value={password}
                  onChange={(e) => {
                    validarPassword(e); // Validar el formato de la contraseña
                  }}
                  required
                  autoComplete="off"
                  placeholder="Ingrese su contraseña"
                />
                {/* Botón de inicio de sesión */}
                <button className="BotonGeneral mt-5 mb-4 p-2 boton" type="submit">Iniciar Sesión</button>
              </form>
              {/* Mensaje de error en caso de fallo en el inicio de sesión */}
              {error && <p className="text-center text-danger">Revise los parámetros </p>}
              {/* Enlace para redirigir al usuario a la página de registro */}
              <a className="text-center text-decoration-none LoginTextoOpcion" href="/Registro">No tienes cuenta? Regístrate</a>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Componente de Pie dePágina */}
      <Footer />
    </div>
  );
};

export default InicioSesion; // Exportación del componente InicioSesion

