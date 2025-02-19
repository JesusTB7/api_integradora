//routes.js
const express = require('express');
const router = express.Router();
const connection = require('./db');
const verifyToken = require("./auth"); // Importa correctamente
const jwt = require("jsonwebtoken");
const SECRET_KEY = "tu_clave_secreta";

// -------------------------------------------------------------------------------------------------------------------------------------------------

// Ruta Recuperar Contraseña
router.post('/recuperar', (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ error: "Falta el correo" });
  }

  console.log("Correo recibido en el backend:", correo);  // Agregar para depuración

  // Verifica si el correo existe
  connection.query('SELECT * FROM usuarios WHERE LOWER(correo) = LOWER(?)', [correo], (err, results) => {
    if (err) {
      console.error('Error al verificar correo:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      console.log('Correo no encontrado en la base de datos:', correo);  // Log para depuración
      return res.status(404).json({ error: 'Correo no encontrado' });
    }

    // Si el correo existe, devuelve un mensaje de éxito
    res.json({ exito: true });
  });
});

// Ruta para actualizar la contraseña
router.put('/actualizar-contrasena', (req, res) => {
  const { correo, nuevaContrasena } = req.body;

  if (!correo || !nuevaContrasena) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  // Actualiza la contraseña en la base de datos
  console.log('Actualizando contraseña para el correo:', correo); // Log para depuración
  connection.query('UPDATE usuarios SET contrasena = ? WHERE correo = ?', [nuevaContrasena, correo], (err, results) => {
    if (err) {
      console.error('Error al actualizar la contraseña:', err);
      return res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Correo no encontrado' });
    }

    res.json({ mensaje: 'Contraseña actualizada con éxito' });
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------

//Ruta Login
router.post('/login', (req, res) => {
  console.log("Datos recibidos en el backend:", req.body);

  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
      return res.status(400).json({ error: "Faltan datos" });
  }

  connection.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
      if (err) {
          console.error('Error al buscar usuario:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
      }

      if (results.length === 0) {
          console.log("Usuario no encontrado en la base de datos.");
          return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      const usuario = results[0];
      console.log(`Contraseña en BD: |${usuario.contrasena}|`);
      console.log(`Contraseña ingresada: |${contrasena}|`);

      if (String(usuario.contrasena).trim() !== String(contrasena).trim()) {
          console.log("Contraseña incorrecta.");
          return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      // Crear un token JWT
      const token = jwt.sign({ id: usuario.id_usuario, correo: usuario.correo }, SECRET_KEY, { expiresIn: '1h' });

      res.json({ message: 'Login exitoso', token });
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------

// Ruta protegida: Obtener usuarios (Solo con token válido)
router.get("/usuarios", verifyToken, (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
      if (err) {
          return res.status(500).json({ error: "Error al obtener usuarios" });
      }
      res.json(results);
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------

// Obtener todos los registros
router.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------

// Obtener un registro por su ID
router.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM usuarios WHERE id_usuarios = ?', id, (err, results) => {
      if (err) {
          console.error('Error al obtener el registro:', err);
          res.status(500).json({ error: 'Error al obtener el registro' });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ error: 'Registro no encontrado' });
          return;
      }
      res.json(results[0]); // Regresa el primer registro encontrado
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------

// Crear un nuevo registro
router.post('/crear', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO usuarios SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------

// Actualizar un registro
router.put('/actualizar/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE usuarios SET ? WHERE id_usuarios = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------

//Eliminar usuario
router.delete('/eliminar/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM usuarios WHERE id_usuarios = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});








































// -------------------------------------------------------------------------------------------------------------------------------------------------

// Obtener todos los registros de dos tablas
router.get('/datos', (req, res) => {
  connection.query('SELECT car.id_carrera AS id, car.nombre AS carrera, gru.nombre AS grupo ' +
    'FROM tb_carrera AS car, tb_grupos AS gru ' +
    'WHERE car.id_carrera=gru.id_carrera', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});


module.exports = router;


// -------------------------------------------------------------------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------------------------------------------------------------------













