# 🛍️ CIFU STYLE - Backend Seguro con JWT

E-commerce moderno y seguro para gorras Jordan originales y tenis seleccionados.

## 🔐 Arquitectura de Seguridad

### Backend JWT (Node.js + Express)
- ✅ Contraseña verificada en el servidor (NUNCA en frontend)
- ✅ Tokens JWT con expiración de 7 días
- ✅ Autenticación stateless y escalable
- ✅ CORS habilitado para múltiples dominios

### Frontend (HTML + Firebase)
- ✅ Sin contraseña hardcodeada
- ✅ Token guardado en localStorage
- ✅ Cierre de sesión automático al expirar el token

---

## 📋 Requisitos

- **Node.js** >= 16.x
- **npm** >= 8.x
- **Git**

---

## 🚀 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/juliandrr1003-sudo/cifu-style.git
cd cifu-style
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y cambiar los valores:
# - ADMIN_PASSWORD: Tu contraseña segura
# - JWT_SECRET: Una cadena aleatoria (ver instrucciones abajo)
# - PORT: Puerto del servidor (default: 3000)
```

#### Generar un JWT_SECRET seguro:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiar el resultado en `.env`:

```env
JWT_SECRET=abc123def456abc123def456abc123def456abc123def456abc123def456abc1
```

### 4️⃣ Iniciar el servidor

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor correrá en `http://localhost:3000`

---

## 🔌 API Endpoints

### Autenticación

#### `POST /api/auth/login`
Verificar contraseña y obtener JWT token.

**Request:**
```json
{
  "password": "tu_contraseña"
}
```

**Response (éxito):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 604800,
  "message": "Login exitoso"
}
```

**Response (error):**
```json
{
  "error": "Contraseña incorrecta"
}
```

---

#### `POST /api/auth/verify`
Verificar si un token es válido.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "valid": true,
  "admin": true
}
```

---

### Protegido (requiere JWT)

#### `GET /api/protected/test`
Endpoint de prueba para verificar autenticación.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Acceso concedido",
  "admin": {
    "admin": true,
    "iat": 1688000000
  }
}
```

---

#### `GET /health`
Health check del servidor (sin autenticación).

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-06-20T10:30:45.123Z",
  "service": "CIFU STYLE Backend"
}
```

---

## 🧪 Pruebas con cURL

### Obtener token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"cifustyle2026"}'
```

### Usar token para acceder a endpoint protegido

```bash
curl -X GET http://localhost:3000/api/protected/test \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📁 Estructura del Proyecto

```
cifu-style/
├── server.js              # Backend Express
├── package.json           # Dependencias
├── .env.example           # Template de variables
├── .env                   # Variables (NO subir a Git)
├── .gitignore             # Archivos ignorados
├── index.html             # Frontend principal
└── README.md              # Esta documentación
```

---

## 🛡️ Seguridad en Producción

### ✅ Checklist antes de deploy

- [ ] Cambiar `ADMIN_PASSWORD` en `.env`
- [ ] Generar `JWT_SECRET` aleatorio
- [ ] Verificar que `.env` está en `.gitignore`
- [ ] Usar HTTPS en producción
- [ ] Agregar rate limiting
- [ ] Usar bcrypt para hash de contraseña
- [ ] Configurar CORS para tu dominio

---

## 🚢 Deployment

### Opción 1: Heroku

```bash
heroku create cifu-style
heroku config:set ADMIN_PASSWORD=tu_contraseña_aqui
heroku config:set JWT_SECRET=tu_jwt_secret_aqui
git push heroku main
```

### Opción 2: Railway o Fly.io

Conecta tu repositorio y configura las variables de entorno en el dashboard.

---

## 📝 Notas Importantes

⚠️ **NUNCA**:
- Subir `.env` a GitHub
- Usar contraseña débil
- Compartir JWT_SECRET públicamente

✅ **SIEMPRE**:
- Cambiar contraseña periódicamente
- Usar HTTPS en producción
- Implementar rate limiting

---

## 📧 Soporte

WhatsApp: +57 304 379 4399 | Instagram: @cifu_style

---

## 📄 Licencia

MIT © CIFU STYLE 2024
