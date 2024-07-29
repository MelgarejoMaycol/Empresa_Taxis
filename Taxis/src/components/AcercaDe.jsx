import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Encabezado from './Encabezado';
import { motion, AnimatePresence } from 'framer-motion';
import '../../src/estilos/stylesEsenciales.css';
import '../../src/estilos/styles.css'
import jefe from '../assets/jefe.jpg';
import logoOriginal from '../assets/logoOriginal.png';
import Footer from './Footer';

const AcercaDe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isopenLogo, setopenLogo] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openLogo = (e) => {
    e.preventDefault();
    setopenLogo(true);
  };

  const closeLogo = () => {
    setopenLogo(false);
  };

  return (
    <div>
      <Encabezado />
      <div className='border'>
        <div>
          <div className='tituloPaginas tHistotia'>
            <h1>NUESTRA HISTORIA</h1>
          </div>
          <div className='DescripcionEmpresa'>
            <div className="subtitulos AcercaDeApartadoTexto">
              <p>
                ¡Hola! Soy Claudia Leonor Ortiz, fundador de Transportes O'clock S.A.S., y quiero contarles
                la historia de cómo comenzó nuestra empresa de taxis.
                Todo empezó hace diez años, cuando me encontraba trabajando en un empleo que no me satisfacía.
                Siempre tuve una pasión por los autos y un deseo de ofrecer un servicio de transporte seguro y
                confiable en nuestra ciudad, que en ese entonces carecía de opciones de calidad. Un día, después de
                una larga jornada de trabajo, estaba tomando un café con mi amigo Jorge, quien compartía mis inquietudes.
                Hablando de nuestros sueños y frustraciones, surgió la idea de iniciar una empresa de taxis que se distinguiera
                por su puntualidad y excelencia en el servicio.
              </p>
              <div className='mt-5'>
                <a href="#" onClick={openModal} className='BotonLeerMas BotonGeneral'>Leer Más</a>
              </div>
            </div>
            <div className='ImagenJefe'>
              <img className='ImagenHistoria' src={jefe} />
            </div>
          </div>
        </div>
        <div>
          <div className='tituloPaginas tLogo'>
           <h1>NUESTRO LOGO</h1> 
          </div>
          <div className='DescripcionEmpresa'>
            <div className='logoEmpresa'>
              <img className='ImagenLogo' src={logoOriginal} />
            </div>
            <div className="subtitulos AcercaDeApartadoTexto ">
              <p className='logoSuntitulo'>
                El logo de "Transportes O'Clock S.A.S" presenta un diseño dinámico y moderno.
                En el centro, se encuentra un dibujo estilizado de un automóvil deportivo en color negro,
                que sugiere velocidad y eficiencia. Debajo del auto, el nombre de la empresa "TRANSPORTES O'CLOCK S.A.S" está escrito en letras mayúsculas,
                con "TRANSPORTES" en una fuente más fina y "O'CLOCK" en una fuente más gruesa y angular, dando una
                sensación de solidez y profesionalismo.
              </p>
              <div className='mt-5 mb-5'>
                <a href="#" onClick={openLogo} className='BotonLeerMas BotonGeneral'>Leer Más</a>
              </div>
            </div>
            <div className='w-60'>

            </div>
          </div>
        </div>

      </div>


      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: '-100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '-100vh' }}
            >
              <div className='tituloPaginas Historia'>MAS SOBRE NOSOTROS</div>
              <div className='subtitulos MasSobreHistoria'>
                <p>
                  Con los ahorros de varios años y un pequeño préstamo, compré nuestro primer vehículo,
                  un atos que bautizamos como "Relojito". Desde el principio, nuestra misión fue clara:
                  ofrecer puntualidad, comodidad y seguridad. Para nosotros, cada cliente era un tesoro
                  y merecía el mejor trato posible. Nos llamamos Transportes O'clock, porque queríamos que
                  la gente pensara en nosotros como el sinónimo de puntualidad y confiabilidad.
                  Con el tiempo, logramos ahorrar suficiente dinero para adquirir un segundo vehículo y contratar
                  a nuestro primer conductor. Así, Transportes O'clock comenzó a expandirse. Cada nuevo miembro del
                  equipo compartía nuestra visión y se comprometía a mantener los altos estándares que nos habíamos fijado.
                  Mirando hacia atrás, estoy orgulloso de lo que hemos logrado. Lo que comenzó como una conversación entre
                  amigos se ha convertido en una empresa que hace la diferencia en la vida de muchas personas. Y todo gracias
                  a la determinación, el trabajo duro y, sobre todo, a nuestros maravillosos clientes que han confiado en Transportes
                  O'clock S.A.S. desde el principio.
                </p>
              </div>

              <a className='subtitulos BotonGeneral BotonCerrar' onClick={closeModal}>Cerrar</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isopenLogo && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: '-100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '-100vh' }}
            >
              <div className='tituloPaginas Logo'>MAS SOBRE EL LOGO</div>
              <div className='subtitulos MasSobreLogo'>
                <p className='logo'>
                  El logo de "Transportes O'Clock S.A.S" utiliza una combinación de colores vibrantes y contrastantes:
                  Púrpura: El trazo curvo que forma una media luna a la izquierda del logo comienza en un tono púrpura oscuro. Este color evoca sensaciones de lujo, creatividad y misterio.

                  Degradado hacia rosa: A medida que el trazo avanza hacia la parte superior derecha del logo, el púrpura se degrada suavemente hacia un tono rosado. Este cambio de color añade dinamismo y frescura al diseño.

                  Estrella brillante: La estrella en la esquina superior derecha es de color naranja brillante en su exterior, con un interior que combina tonos de rosa, púrpura y detalles brillantes o glitter. Este elemento resalta fuertemente debido a sus colores llamativos y su diseño brillante, simbolizando éxito y destacando la marca.

                  Negro: El automóvil y las letras "TRANSPORTES O'CLOCK S.A.S" están en color negro, lo que aporta un contraste fuerte y una sensación de elegancia, formalidad y profesionalismo.

                  En conjunto, estos colores crean una imagen moderna, enérgica y profesional, llamando la atención y sugiriendo eficiencia y dinamismo en los servicios de la empresa.
                </p>
              </div>

              <a className='subtitulos BotonGeneral BotonCerrar' onClick={closeLogo}>Cerrar</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div>
      </div>
    </div>
  );
};

export default AcercaDe;