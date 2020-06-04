import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../src/estilos/stylesCamila.css';
import Encabezado from './Encabezado';
import Footer from './Footer';

function Quejas() {
  const [formData, setFormData] = useState({
    name: '',
    telefono: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const refForm = useRef();

  const validateForm = () => {
    const { name, telefono, email, message } = formData;
    if (!name || !telefono || !email || !message) {
      setErrorMessage('Todos los campos son obligatorios.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const serviceId = "service_2bhfjvw";
    const templateId = "template_gtt5crh";
    const apikey = "zOIh-canj4-nKN97X";

    emailjs.sendForm(serviceId, templateId, refForm.current, apikey)
      .then(result => {
        console.log(result.text);
        setFormData({
          name: '',
          telefono: '',
          email: '',
          message: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Encabezado />
      <div className="containerSuge">
        <div className="textoPrincipal">
          <h3>SUGERENCIAS</h3>
          <p>Para nosotros es fundamental poder contar con su opinión, para así mejorar y prosperar para una buena comunicación y servicio.</p>
        </div>
        <div className="text">
          <h3>nuestros medios de contacto</h3>
          <p>Utiliza las siguientes vías de contacto, o rellena el formulario.</p>
          <ul className="lista">
            <label htmlFor="l1">via E-mail</label>
            <li><a href="mailto:transportesoclocksas@gmail.com">Via Email: transportesoclocksas@gmail.com</a></li>
            <label htmlFor="l2">nuestras redes</label>
            <li><a href="http://www.instagram.com/transportesoclock" target="_blank" rel="noopener noreferrer">En nuestras redes sociales: @transportesoclock</a></li>
            <label htmlFor="l3">telefono</label>
            <li><a href="tel:+573224543587">Por teléfono: 3224543587</a></li>
          </ul>
        </div>
        <form ref={refForm} className="formSuge" onSubmit={handleSubmit}>
          <label htmlFor="name">nombre</label>
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
          {errorMessage && <p className="error">{errorMessage}</p>}
          <input className="submitSuge" type="submit" value="Enviar" />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Quejas;
