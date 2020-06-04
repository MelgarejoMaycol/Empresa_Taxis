import React from 'react';
import { conductores } from '../conductores';
import '../../src/estilos/styles.css';
import '../../src/estilos/Conductores.css';

export const ConductoresLista = () => {
  return <div className='container-conductores'>
    {conductores.map(producto => (
      <div className='item'>
        <figure>
          <img src={producto.urlImagen} alt={producto.nombre} />
        </figure>
        <div class="info-product">
          <h2>{producto.nombre}</h2>
          <p class="price">{producto.placa}</p>
          <button class="btn-add-cart">Añadir al Favoritos</button>
        </div>
      </div>
    ))}
  </div>
}

