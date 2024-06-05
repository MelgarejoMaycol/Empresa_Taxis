import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser'; // Importamos la librería emailjs para el envío de correos electrónicos
import '../../src/estilos/stylesCamila.css'; // Importamos los estilos específicos para esta página
import Encabezado from './Encabezado'; // Importamos el componente Encabezado para mostrar en la parte superior de la página
import Footer from './Footer'; // Importamos el componente Footer para mostrar en la parte inferior de la página

function Quejas() {
  const [formData, setFormData] = useState({
    name: '',
    telefono: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar mensajes de error
  const refForm = useRef(); // Referencia al formulario

  // Función para validar el formulario
  const validateForm = () => {
    const { name, telefono, email, message } = formData;
    if (!name || !telefono || !email || !message) {
      setErrorMessage('Todos los campos son obligatorios.'); // Si algún campo está vacío, muestra un mensaje de error
      return false;
    }
    setErrorMessage(''); // Si no hay errores, se limpia el mensaje de error
    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // Si el formulario no es válido, no se envía
    }

    // Llamada a la API de emailjs para enviar el formulario por correo electrónico
    const serviceId = "service_2bhfjvw";
    const templateId = "template_gtt5crh";
    const apikey = "zOIh-canj4-nKN97X";

    emailjs.sendForm(serviceId, templateId, refForm.current, apikey)
      .then(result => {
        console.log(result.text); // Si el correo se envía con éxito, mostramos un mensaje en la consola
        setFormData({ // Limpiamos los campos del formulario después del envío
          name: '',
          telefono: '',
          email: '',
          message: '',
        });
      })
      .catch(error => console.error(error)); // Manejo de errores en caso de que el envío del correo falle
  };

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Renderización del componente
  return (
    <>
      <Encabezado /> {/* Mostramos el componente Encabezado en la parte superior de la página */}
      <div className="containerSuge">
        <div className="textoPrincipal">
          <h3>SUGERENCIAS</h3>
          <p>Para nosotros es fundamental poder contar con su opinión, para así mejorar y prosperar para una buena comunicación y servicio.</p>
        </div>
        <div className="text">
          <h3>nuestros medios de contacto</h3>
          <p>Utiliza las siguientes vías de contacto, o rellena el formulario.</p>
          {/* Lista de medios de contacto */}
          <ul className="lista">
            <label htmlFor="l1">via E-mail</label>
            <li><a href="mailto:transportesoclocksas@gmail.com">Via Email: transportesoclocksas@gmail.com</a></li>
            <label htmlFor="l2">nuestras redes</label>
            <li><a href="http://www.instagram.com/transportesoclock" target="_blank" rel="noopener noreferrer">En nuestras redes sociales: @transportesoclock</a></li>
            <label htmlFor="l3">telefono</label>
            <li><a href="tel:+573224543587">Por teléfono: 3224543587</a></li>
          </ul>
        </div>
        {/* Formulario para enviar quejas o sugerencias */}
        <form ref={refForm} className="formSuge" onSubmit={handleSubmit}>
          <label htmlFor="name">nombre</label>
          {/* Campo para el nombre */}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            className="box"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="telefono">telefono</label>
          {/* Campo para el teléfono */}
          <input
            type="tel"
            name="telefono"
            id="telefono"
            placeholder="Telefono"
            className="box"
            value={formData.telefono}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          {/* Campo para el correo electrónico */}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="box"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="message">Queja o sugerencias</label>
          {/* Campo para la queja o sugerencia */}
          <textarea
            name="message"
            id="message"
            cols="40"
            rows="5"
            placeholder="Mensaje"
            className="box"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {/* Mensaje de error en caso de que el formulario sea inválido */}
          {errorMessage && <p className="error">{errorMessage}</p>}
          {/* Botón para enviar el formulario */}
          <input className="submitSuge" type="submit" value="Enviar" />
        </form>
      </div>
      <Footer /> {/* Mostramos el componente Footer en la parte inferior de la página */}
    </>
  );
}

export default Quejas;
