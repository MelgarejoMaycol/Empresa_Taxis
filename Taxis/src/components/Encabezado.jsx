import React, { useEffect, useState, useContext } from 'react'; // Importación de React y sus hooks necesarios
import { useLocation } from 'react-router-dom'; // Hook para obtener la ubicación actual
import { UserContext } from '../context/UserContext.jsx'; // Contexto de usuario para gestionar la autenticación
import '../../src/estilos/styles.css'; // Estilos CSS
import Modal from 'react-modal'; // Modal para confirmar el cierre de sesión
import { getAuth, signOut } from 'firebase/auth'; // Funciones de autenticación de Firebase
import { db } from "../credenciales"; // Instancia de Firebase Firestore
import { collection, getDocs } from 'firebase/firestore'; // Funciones de Firestore
import logoEncabezado from "../assets/logoEncabezado.png"; // Logo del encabezado


const Encabezado = () => {
    // Estado local para almacenar la lista de usuarios y el estado del modal de cierre de sesión
    const [usuarios, setUsuarios] = useState([]);
    const [cerrarSesion, setCerrarSesion] = useState(false);

    // Contexto de usuario para acceder al estado del usuario autenticado
    const { user } = useContext(UserContext);

    // Hook para obtener la ubicación actual
    const location = useLocation();

    // Instancia de autenticación de Firebase
    const auth = getAuth();

    // Función para abrir el modal de cierre de sesión
    const openModal = () => {
        setCerrarSesion(true);
    };

    // Función para cerrar el modal de cierre de sesión
    const closeModal = () => {
        setCerrarSesion(false);
    };

    // Función para manejar el cierre de sesión del usuario
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada");
                setCerrarSesion(false); // Cerrar el modal después de cerrar sesión
                window.location.href = '/'; // Redirigir al usuario a la página de inicio
            })
            .catch((error) => {
                console.error("Error al cerrar sesión: ", error);
            });
    };

    // Función para obtener la clase CSS del enlace de navegación activo
    const getLinkClass = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    // Efecto para cargar la lista de usuarios desde Firestore cuando se monta el componente
    useEffect(() => {
        const obtenerUsuarios = async () => {
            const usuariosCollection = collection(db, 'Usuarios');
            const usuariosSnapshot = await getDocs(usuariosCollection);
            const usuariosList = usuariosSnapshot.docs.map(doc => doc.data());
            setUsuarios(usuariosList);
        };
        obtenerUsuarios();
    }, []);

    // Renderizado del componente
    return (
        <div className="Encabezado">
            {/* Sección del logo y título */}
            <div className="EncabezadoLogo EncabezadoParte">
                <img className="EncabezadoImagenPrincipal" src={logoEncabezado} />
                <h1>TRANSPORTES O'CLOK S.A.S</h1>
            </div>
            {/* Sección de enlaces de navegación */}
            <div className="subtitulos EncabezadoLinks EncabezadoParte">
                <a href="/" className={getLinkClass('/')}>INICIO</a>
                <a href="/acercaDe" className={getLinkClass('/acercaDe')}>ACERCA DE</a>
                <a href="/solicitar" className={getLinkClass('/solicitar')}>SOLICITAR</a>
                <a href="/Ayuda" className={getLinkClass('/Ayuda')}>AYUDA</a>
            </div>
            {/* Sección de inicio de sesión y registro */}
            <div className="subtitulos EncabezadoRegistro EncabezadoParte m-auto text-center">
                {/* Si el usuario está autenticado, muestra su correo electrónico y el botón para abrir el modal de cierre de sesión */}
                {user ? (
                    <div onClick={() => openModal(user)}>
                        <p className="EncabezadoNombreUsuario" onClick={openModal}>{user.email}</p>
                    </div>
                ) : (
                    <>
                        <a className={`EncabezadoInicioSesion ${getLinkClass('/iniciarSesion')}`} href="/iniciarSesion">INICIAR SESION</a>
                        <a className={`BotonGeneral EncabezadoBotonRegistrarme ${getLinkClass('/Registro')}`} href='/Registro'>REGISTRARME</a>
                    </>
                )}
            </div>
            {/* Modal para confirmar el cierre de sesión */}
            <Modal
                isOpen={cerrarSesion}
                onRequestClose={closeModal}
                overlayClassName="SolicitarFondoPantalla"
                className="SolicitarContenedorPantalla"
                contentLabel="Cerrar Sesión"
            >
                <div className="SolicitarContenido">
                    <h2 className='mb-4'>¿Desea cerrar sesión?</h2>
                    {/* Botones para cancelar o confirmar el cierre de sesión */}
                    <div className="SolicitarBotones d-flex justify-content-around">
                        <button className="BotonGeneral" onClick={closeModal}>Cancelar</button>
                        <button className="BotonGeneral" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Encabezado; // Exportación del componente Encabezado
