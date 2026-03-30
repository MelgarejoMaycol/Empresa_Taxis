import React from 'react'
import '../../src/estilos/stylesAyuda.css';
import '../../src/estilos/servis.css';
import Encabezado from './Encabezado';
import Footer from './Footer';

function App() {
  return (
    <>
      <Encabezado />
      <section className="sevicio_ayuda">
        <article className="articulo_ayuda">
          <div className='titulo1'>
            <h2>soporte al cliente</h2>
            <p>Estamos aquí para ayudarte. Nuestro equipo de soporte está disponible para resolver cualquier duda o problema que puedas tener. Nos comprometemos a ofrecerte una atención
              rápida y eficiente para garantizar tu satisfacción.</p>
          </div>
          <div className='encapsulado1'>

            <div className="encap1_1">
              <i className="bi bi-people-fill"></i>
              <h3>como iniciar sesion</h3>
              <p>para realizar la sesion de inicio tienes que completar los campos solicitados
                en el formulario ,si no te deja ingresar ,entonces verifica que te has registrado a nuestra
                pagina de forma exitosa y vuelva a intentarlo de lo contrario le solicitamos que se
                comunique con uno de nuestro medios de comunicacion
              </p>
              <a href="/IniciarSesion">iniciar sesion</a>

            </div>

            <div className="encap1_1">
              <i className="bi bi-person-badge"></i>
              <h3>como registrarse</h3>
              <p>en la sesion de resgistrar un usuario solo debes completar los datos necesarios y revisar cuidadosamente
                al ingresar la contraseña con los parametros que le piden para mayor seguridad </p>
              <a href="/Registro">registrarse</a>
            </div>

            <div className="encap1_1">
              <i className="bi bi-telephone-fill"></i>
              <h3>contactanos</h3>
              <p>Si necesitas solicitar nuestro servicio de taxis o tienes alguna pregunta, no dudes en contactarnos directamente a través de nuestros medios de comunicación. Nuestro equipo está disponible para atenderte.</p>
              <a href="tel:+573224543587">Llamar ahora</a>
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </>
  )
}

export default App