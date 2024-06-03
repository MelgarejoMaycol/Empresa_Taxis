import React from "react";
import { useLocation } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="w-100 d-flex FooterContenedor">
                <div className="FooterSeccion w-25">
                    <h3 className="FooterTituloPaginas">Sobre Nosotros</h3>
                    <p>Transportes O'clock S.A.S. es una empresa de taxis que se distingue por su puntualidad y excelencia en el servicio. Nuestro compromiso es ofrecer un transporte seguro y confiable en nuestra ciudad. </p>
                </div>
                <div className="FooterSeccion w-25">
                    <h3 className="FooterTituloPaginas">Enlaces Útiles</h3>
                    <ul>
                        <li><a href="/solicitar">Solicitar</a></li>
                        <li><a href="/AcercaDe">Acerca De</a></li>
                        <li><a href="/Ayuda">Ayuda</a></li>
                        <li><a href="/Sugerencias">Sugerencias</a></li>
                    </ul>
                </div>
                <div className="FooterSeccion w-25 d-flex flex-column" >
                    <h3 className="FooterTituloPaginas">Contacto</h3>
                    <ul>
                        <li><a href="https://maps.app.goo.gl/Y5b4WsXXgXjwqvRa8" target="_blank">Dirección: Calle Falsa 123</a></li>
                        <li><a href="mailto:transportesoclocksas@gmail.com">transportesoclocksas@gmail.com</a></li>
                        <li><a href="tel:+573224543587">3224543587</a></li>
                    </ul>
                </div>
                <div className="FooterSeccion w-25">
                    <h3 className="FooterTituloPaginas">Síguenos</h3>
                    <div>
                        <div className="FooterContenedoresRedes">
                            <img src="./src/assets/facebook.png" alt="" className="FooterLogosRedes"/>
                            <a href="https://facebook.com" className="text-black" target="_blank">  Facebook</a>
                        </div>
                        <div className="FooterContenedoresRedes">
                            <img src="./src/assets/X.png" alt="" className="FooterLogosRedes"/>
                            <a href="https://twitter.com" className="text-black" target="_blank">  X</a>
                        </div>
                        <div className="FooterContenedoresRedes">
                            <img src="./src/assets/instagram.png" alt="" className="FooterLogosRedes"/>
                            <a href="https://instagram.com" className="text-black" target="_blank">  Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 FooterContenedor">
                &copy; {new Date().getFullYear()} TransportesO’Clock. Política de Privacidad.
            </div>
        </footer>
    )
}

export default Footer;