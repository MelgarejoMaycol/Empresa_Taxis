import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import '../../src/estilos/styles.css';
import Modal from 'react-modal';
import { getAuth, signOut } from 'firebase/auth';
import { db } from "../credenciales";
import { collection, getDocs } from 'firebase/firestore';

const Encabezado = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { user } = useContext(UserContext);
    const location = useLocation();
    const auth = getAuth();


    const [cerrarSesion, setCerrarSesion] = useState(false);

    const openModal = () => {
        setCerrarSesion(true);
    };

    const closeModal = () => {
        setCerrarSesion(false);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada");
                setCerrarSesion(false);
                window.location.href = '/';
            })
            .catch((error) => {
                console.error("Error al cerrar sesión: ", error);
            });
    };

    const getLinkClass = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    useEffect(() => {
        const obtenerUsuarios = async () => {
            const usuariosCollection = collection(db, 'Usuarios');
            const usuariosSnapshot = await getDocs(usuariosCollection);
            const usuariosList = usuariosSnapshot.docs.map(doc => doc.data());
            setUsuarios(usuariosList);
        };
        obtenerUsuarios();
    }, []);

    return (
        <div className="Encabezado">
            <div className="EncabezadoLogo EncabezadoParte">
                <img className="EncabezadoImagenPrincipal" src="./src/assets/logoEncabezado.png" />
                <h1>TRANSPORTES O'CLOK S.A.S</h1>
            </div>
            <div className="subtitulos EncabezadoLinks EncabezadoParte">
                <a href="/" className={getLinkClass('/')}>INICIO</a>
                <a href="/acercaDe" className={getLinkClass('/acercaDe')}>ACERCA DE</a>
                <a href="/solicitar" className={getLinkClass('/solicitar')}>SOLICITAR</a>
                <a href="/Ayuda" className={getLinkClass('/Ayuda')}>AYUDA</a>
            </div>
            <div className="subtitulos EncabezadoRegistro EncabezadoParte m-auto text-center">
                {user ? (
                    <div>
                        {usuarios.map((usuario, index) => (
                            <a className="EncabezadoNombreUsuario" onClick={openModal} key={index} >{usuario.nombres}</a>
                        ))}
                    </div>
                ) : (
                    <>
                        <a className={`EncabezadoInicioSesion ${getLinkClass('/iniciarSesion')}`} href="/iniciarSesion">INICIAR SESION</a>
                        <a className={`BotonGeneral EncabezadoBotonRegistrarme ${getLinkClass('/Registro')}`} href='/Registro'>REGISTRARME</a>
                    </>
                )}
            </div>
            <Modal
                isOpen={cerrarSesion}
                onRequestClose={closeModal}
                overlayClassName="SolicitarFondoPantalla"
                className="SolicitarContenedorPantalla"
                contentLabel="Cerrar Sesión"
            >
                <div className="SolicitarContenido">
                    <h2  className='mb-4'>¿Desea cerrar sesión?</h2>
                    <div className="SolicitarBotones d-flex justify-content-around">
                        <button className="BotonGeneral" onClick={closeModal}>Cancelar</button>
                        <button className="BotonGeneral" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Encabezado;
