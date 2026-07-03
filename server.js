import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cambiar_esto_en_produccion';
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

app.use(cors());
app.use(express.json());

// Middleware para verificar JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

// ==================== RUTAS DE AUTENTICACIÓN ====================

// POST /api/auth/login - Verificar contraseña y devolver JWT
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Contraseña requerida' });
  }

  // Comparar contraseña (en producción usar bcrypt)
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Generar JWT con expiración de 7 días
  const token = jwt.sign(
    { admin: true, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ 
    token,
    expiresIn: 604800, // 7 días en segundos
    message: 'Login exitoso'
  });
});

// POST /api/auth/verify - Verificar si un token es válido
app.post('/api/auth/verify', verifyToken, (req, res) => {
  res.json({ valid: true, admin: true });
});

// ==================== RUTAS PROTEGIDAS ====================

// GET /api/protected/test - Endpoint de prueba protegido
app.get('/api/protected/test', verifyToken, (req, res) => {
  res.json({ 
    message: 'Acceso concedido',
    admin: req.admin
  });
});

// ==================== HEALTH CHECK ====================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'CIFU STYLE Backend'
  });
});

// ==================== ERROR HANDLER ====================

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Servidor CIFU STYLE corriendo en puerto ${PORT}`);
  console.log(`🔐 Autenticación JWT activada`);
  console.log(`📝 JWT_SECRET: ${JWT_SECRET.slice(0, 20)}...`);
  console.log(`⚠️  ADMIN_PASSWORD: ${ADMIN_PASSWORD === 'cambiar_esto_en_produccion' ? 'CAMBIAR EN PRODUCCIÓN' : '✓ Configurado'}`);
});

export default app;
