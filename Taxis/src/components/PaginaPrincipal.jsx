import React, { useState, useEffect } from "react";
import Encabezado from "./Encabezado";
import { motion } from 'framer-motion';
import Footer from "./Footer";

const PaginaPrincipal = () => {
  return (
    <div>
      <div>
        <Encabezado />
      </div> 
      <div className="inferiorPrincipal">
        <div className="textoContainerPrincipal">
          <p className=" subtitulos primeTexto ">
            A TU ALCANCE
          </p>
          <p className="tituloPaginas segundoTexto ">
            UN  SERVICIO  DE  CONFIANZA
          </p>
          <p className="subtitulos tercerTexto ">
            Descubre nuestros servicios, lo que tu puedes lograr con ellos y como tenemos tu participación en cuenta.
          </p>
          <a className='BotonGeneral subtitulos BotonDescubrir'>DESCUBRIR</a>
        </div>
        <div className="ContenedorImagenPrincipal">
          <AnimatedImagen  src="./src/assets/ImagenPrincipal.png"/> 
        </div>
      </div>
      <Footer />
    </div>
  )
};

const AnimatedImagen = ({ src }) => {
  const [animate, setAnimate] = useState(true);
  const [scrollPos, setScrollPos] = useState(window.pageYOffset);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos < scrollPos) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
    setScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  return (
      <motion.img
      className="imagenPrincipal"
      src={src}
      initial={{ y: 0 }}
      animate={animate ? { y: -60 } : { y: 0 }}
      transition={{
        repeat: 1,
        repeatType: 'reverse',
        ease: "easeInOut",
        bounce: 0.6,
        duration: 1
      }}
    />
  );
};
export default PaginaPrincipal;
