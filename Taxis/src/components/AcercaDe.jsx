import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Encabezado from './Encabezado';
import { motion, AnimatePresence } from 'framer-motion';
import '../../src/estilos/stylesEsenciales.css';
import '../../src/estilos/styles.css'
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
      <div className='tituloPaginas tHistotia'>
        NUESTRA HISTORIA
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
          <img className='ImagenHistoria' src='./src/assets/jefe.jpg' />
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
      <div className='tituloPaginas tLogo'>
        NUESTRO LOGO
      </div>
      <div className='DescripcionEmpresa'>
        <div className='logoEmpresa'>
        <img className='ImagenLogo' src='./src/assets/logoOriginal.png' />
        </div>
        <div className="subtitulos AcercaDeApartadoTexto ">
          <p className='logoSuntitulo'>
          El logo de Transportes O'clock S.A.S. fue creado para encapsular los valores fundamentales 
          de la empresa: puntualidad, confiabilidad y excelencia. La inclusión de un coche estilizado 
          dentro de una esfera de reloj subraya la precisión con la que operamos, mientras que la estrella
           brillante en la cima representa nuestra aspiración constante de superar las expectativas y brindar
            un servicio estelar. Los colores degradados en el arco no solo añaden un atractivo visual moderno, 
            sino que también simbolizan el dinamismo y la evolución constante de nuestra empresa en el sector del
           transporte.
          </p>
          <div className='mt-5 mb-5'>
            <a href="#" onClick={openLogo} className='BotonLeerMas BotonGeneral'>Leer Más</a>
          </div>
        </div>
        <div className='w-60'>

        </div>
      </div>
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
                  PRUEBA UNO
                </p>
              </div>

              <a className='subtitulos BotonGeneral BotonCerrar' onClick={closeLogo}>Cerrar</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div>
      </div>
      <Footer />
    </div>
  );
};

export default AcercaDe;