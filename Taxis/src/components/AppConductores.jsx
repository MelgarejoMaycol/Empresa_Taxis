import React from 'react'
import {HeadConductores} from "./HeadConductores";
import {ConductoresLista} from "./ConductoresLista";
import '../../src/estilos/styles.css';
import '../../src/estilos/Conductores.css';
export const AppConductores = () => { 
  return (
   <>
   <HeadConductores/>
   <ConductoresLista/>
   </>
  )
}
