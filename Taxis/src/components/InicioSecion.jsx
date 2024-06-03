import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from 'framer-motion';
import Encabezado from "./Encabezado";
import Footer from "./Footer";
import { db } from "../credenciales";
import { UserContext } from '../context/UserContext.jsx';
import '../../src/estilos/styles.css';

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Usuario autenticado:', user);

            const docRef = doc(db, 'Usuarios', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log('Datos del usuario desde Firestore:', userData);
                setUser({ ...user, displayName: userData.nombres });  // Asignar displayName desde Firestore
                console.log('Usuario actualizado en el contexto:', { ...user, displayName: userData.nombres });
            } else {
                console.log('No se encontró información adicional del usuario en Firestore');
                setUser(user);  // Si no hay datos adicionales, solo establece el usuario básico
            }

            setError(null);
            navigate('/');
        } catch (e) {
            setError(e.message);
            console.log(e.code, e.message);
        }
    }

    const toLower = (e) => {
        setEmail(e.target.value.toLowerCase());
    }

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

    const validarPassword = (e) => {
        setPassword(e.target.value);
        const passwordValido = password.match(/^(?=.*[A-Z])(?=.*[0-9])/);
        if (passwordValido) {
            //console.log('Contraseña valida');
        } else {
            //console.log('Contraseña invalida');
        }
    }

    const borrarCampos = () => {
        setEmail('');
        setPassword('');
    }

  return (
    <div>
      <div>
        <Encabezado />
      </div>
      <div className="Login">
        <div className="LoginFondoImagenContenedor">
          <img src='./src/assets/FondoInicioSesion.png' alt="" className="LoginFondoImagen" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="LoginPaginaCompleta">
            <div className="LoginContenedor w-50 d-flex flex-column">
              <label className="text-center m-4 LoginTituloSesion">INICIO SESION</label>
              <form className="d-flex flex-column" onSubmit={handleLogin}>
                <label className="mb-3" htmlFor="email">Email</label>
                <input
                  className="Input mt-2 mb-2 p-2 text-field"
                  type="email"
                  id='email'
                  value={email}
                  onChange={(e) => {
                    toLower(e);
                    validarEmail(e);
                  }}
                  required
                  autoComplete="off"
                  placeholder="Ingrese su correo electrónico"
                />
                <label className="mt-2 mb-2" htmlFor="password" >Password</label>
                <input
                  className="Input mt-2 mb-2 p-2 text-field"
                  type="password"
                  id='password'
                  value={password}
                  onChange={(e) => {
                    validarPassword(e);
                  }}
                  required
                  autoComplete="off"
                  placeholder="Ingrese su contraseña"
                />
                <button className="BotonGeneral mt-5 mb-4 p-2 boton" type="submit">Iniciar Sesión</button>
              </form>
              {error && <p className="text-center text-danger">Revise los parámetros </p>}
              <a className="text-center text-decoration-none LoginTextoOpcion" href="/Registro">No tienes cuenta? Regístrate</a>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default InicioSesion;
