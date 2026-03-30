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
    const [menuMobileActivo, setMenuMobileActivo] = useState(false);

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

    // Función para cerrar el menú móvil cuando se hace clic en un enlace
    const cerrarMenuMobile = () => {
        setMenuMobileActivo(false);
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
            
            {/* Botón hamburguesa para menú móvil */}
            <button 
                className={`EncabezadoBotonHamburguesa ${menuMobileActivo ? 'activo' : ''}`}
                onClick={() => setMenuMobileActivo(!menuMobileActivo)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            {/* Sección de enlaces de navegación (desktop) */}
            <div className="subtitulos EncabezadoLinks EncabezadoParte">
                <a href="/" className={getLinkClass('/')}>INICIO</a>
                <a href="/acercaDe" className={getLinkClass('/acercaDe')}>ACERCA DE</a>
                <a href="/Ayuda" className={getLinkClass('/Ayuda')}>AYUDA</a>
            </div>
            
            {/* Sección de inicio de sesión y registro (desktop) */}
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
            
            {/* Menú móvil */}
            <div className={`EncabezadoMenuMobile ${menuMobileActivo ? 'activo' : ''}`}>
                <a href="/" className={getLinkClass('/')} onClick={cerrarMenuMobile}>INICIO</a>
                <a href="/acercaDe" className={getLinkClass('/acercaDe')} onClick={cerrarMenuMobile}>ACERCA DE</a>
                <a href="/Ayuda" className={getLinkClass('/Ayuda')} onClick={cerrarMenuMobile}>AYUDA</a>
                
                {/* Sección de usuario en móvil */}
                <div style={{ borderTop: '1px solid #ccc', paddingTop: '1rem', marginTop: '1rem' }}>
                    {user ? (
                        <div onClick={() => { openModal(user); cerrarMenuMobile(); }}>
                            <p className="EncabezadoNombreUsuario" style={{ margin: '0.5rem 0', cursor: 'pointer' }}>{user.email}</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <a className={`EncabezadoInicioSesion ${getLinkClass('/iniciarSesion')}`} href="/iniciarSesion" onClick={cerrarMenuMobile} style={{ textAlign: 'center' }}>INICIAR SESION</a>
                            <a className={`BotonGeneral EncabezadoBotonRegistrarme ${getLinkClass('/Registro')}`} href='/Registro' onClick={cerrarMenuMobile} style={{ textAlign: 'center' }}>REGISTRARME</a>
                        </div>
                    )}
                </div>
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
