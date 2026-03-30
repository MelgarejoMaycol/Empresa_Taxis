# Empresa Taxis 🚕

## Descripción

**Empresa Taxis** es una página web estática desarrollada como **proyecto universitario** para una empresa de transporte en taxi ubicada en **Bucaramanga, Santander**.

La plataforma presenta información sobre los servicios de la empresa, permitiendo a los usuarios conocer más sobre la compañía, consultar ayuda, registrarse y acceder a funcionalidades de cuenta.

## 🌐 Sitio Web

**Visita la página:** [https://empresa-taxis.vercel.app/](https://empresa-taxis.vercel.app/)

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React + Vite
- **Routing:** React Router
- **Autenticación:** Firebase Authentication
- **Base de Datos:** Firebase Firestore
- **Animaciones:** Framer Motion
- **Estilos:** CSS personalizado + Bootstrap
- **Despliegue:** Vercel
- **CI/CD:** GitHub Actions

## 📚 Características

- ✅ Página principal con información de la empresa
- ✅ Sección "Acerca de" con historia y logo
- ✅ Sistema de autenticación (Login/Registro)
- ✅ Página de ayuda
- ✅ Sección de sugerencias
- ✅ Diseño responsive (adaptable a dispositivos móviles)
- ✅ Degradado de colores atractivo
- ✅ Footer con enlaces útiles

## 👥 Integrantes del Proyecto

| Nombre | Email |
|--------|-------|
| Maycol Melgarejo | mfmelgarejo04@gmail.com |
| Paula Lozano | pau2004ortiz@gmail.com |

## 📁 Estructura del Proyecto

```
Empresa_Taxis/
├── .github/
│   └── workflows/
│       └── build.yml          # Pipeline CI/CD
├── Taxis/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── context/           # Context API (UserContext)
│   │   ├── estilos/          # Archivos CSS
│   │   ├── main.jsx          # Punto de entrada
│   │   └── credenciales.js   # Configuración Firebase
│   ├── public/               # Archivos públicos
│   ├── package.json          # Dependencias
│   └── vite.config.js        # Configuración Vite
├── package.json              # Wrapper para monorepo
├── vercel.json              # Configuración Vercel
└── README.md                # Este archivo
```

## 🚀 Instalación y Uso Local

### Requisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/MelgarejoMaycol/Empresa_Taxis.git
cd Empresa_Taxis
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Entrar a la carpeta del proyecto:**
```bash
cd Taxis
```

4. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

5. **Hacer build para producción:**
```bash
npm run build
```

## 📝 Variables de Entorno

Crear un archivo `.env.local` en la carpeta `Taxis/` con las siguientes variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🔄 Despliegue

El proyecto está configurado para desplegarse automáticamente en **Vercel** con cada push a la rama `main`.

### Configuración Vercel:
- **Root Directory:** `Taxis`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 🤝 Contribuciones

Este es un proyecto unitario cerrado. Para sugerencias o reportes de bugs, contacta a los integrantes.

## 📄 Licencia

Este proyecto fue desarrollado como trabajo académico universitario.

---

**Desarrollado con ❤️ en Bucaramanga, Santander**
