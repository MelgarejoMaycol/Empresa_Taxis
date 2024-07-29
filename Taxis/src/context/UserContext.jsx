// Importaciones necesarias
import React, { createContext, useState, useEffect } from 'react'; // React y sus hooks
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Authentication
import { doc, getDoc } from 'firebase/firestore'; // Firestore
import { db } from '../credenciales'; // Importación de la instancia de Firestore

// Creación del contexto de usuario
export const UserContext = createContext();

// Definición del componente UserProvider
export const UserProvider = ({ children }) => {
  // Estado del usuario
  const [user, setUser] = useState(null);

  // Efecto de efecto secundario para gestionar la autenticación del usuario
  useEffect(() => {
    // Obtener la instancia de autenticación de Firebase
    const auth = getAuth();
    // Suscripción al cambio de estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) { // Si el usuario está autenticado
        // Obtener los datos del usuario desde Firestore
        const docRef = doc(db, 'Usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) { // Si existen datos del usuario en Firestore
          const userData = docSnap.data();
          // Actualizar el estado del usuario en el contexto con los datos obtenidos
          setUser({ ...user, displayName: userData.nombres });
        } else { // Si no existen datos del usuario en Firestore
          // Mantener el estado del usuario sin cambios
          setUser(user);
        }
      } else { // Si el usuario no está autenticado
        // Establecer el estado del usuario como nulo
        setUser(null);
      }
    });

    // Función de limpieza para cancelar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Devolver el proveedor de contexto con el valor del usuario
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
