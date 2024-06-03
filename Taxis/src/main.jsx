import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PaginaPrincipal from './components/PaginaPrincipal.jsx';
import InicioSesion from './components/InicioSecion.jsx';
import Registro from './components/Registro.jsx';
import ErrorPage from "./components/error-page.jsx";
import Solicitar from './components/Solicitar.jsx';
import AcercaDe from './components/AcercaDe.jsx';
import Ayuda from './components/Ayuda.jsx';
import Sugerencias from './components/Sugerencias.jsx';
import { UserProvider } from './context/UserContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <div>
      <PaginaPrincipal/>
    </div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Registro",
    element: 
    <div>
      <Registro/>
    </div>,
  },
  {
    path: "/IniciarSesion",
    element: 
    <div>
      <InicioSesion/>
    </div>,
  },
  {
    path: "/solicitar",
    element: 
    <div>
      <Solicitar/>
    </div>,
  },
  {
    path: "/AcercaDe",
    element: 
    <div>
      <AcercaDe/>
    </div>,
  },
  {
    path: "/Ayuda",
    element: 
    <div>
      <Ayuda/>
    </div>,
  },
  {
    path: "/Sugerencias",
    element: 
    <div>
      <Sugerencias/>
    </div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
