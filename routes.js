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

// Obtener todos los registros
router.get('/pais', (req, res) => {
  connection.query('SELECT * FROM pais', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/estado', (req, res) => {
  connection.query('SELECT * FROM estado', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/municipio', (req, res) => {
  connection.query('SELECT * FROM municipio', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/bote', (req, res) => {
  connection.query('SELECT * FROM botes', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/asignacion', (req, res) => {
  connection.query('SELECT * FROM asignaciones', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/mantenimiento', (req, res) => {
  connection.query('SELECT * FROM mantenimiento', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/sensor', (req, res) => {
  connection.query('SELECT * FROM sensores', (err, results) => {
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

// Obtener un registro por su ID
router.get('/pais/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM pais WHERE id_pais = ?', id, (err, results) => {
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

// Obtener un registro por su ID
router.get('/estado/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM estado WHERE id_estado = ?', id, (err, results) => {
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

// Obtener un registro por su ID
router.get('/municipio/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM municipio WHERE id_municipio = ?', id, (err, results) => {
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

// Obtener un registro por su ID
router.get('/bote/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM botes WHERE id_bote = ?', id, (err, results) => {
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

// Obtener un registro por su ID
router.get('/asignacion/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM asignaciones WHERE id_asignacion = ?', id, (err, results) => {
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

// Obtener un registro por su ID
router.get('/mantenimiento/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM mantenimiento WHERE id_mantenimiento = ?', id, (err, results) => {
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


// Obtener un registro por su ID
router.get('/sensor/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM sensores WHERE id_sensor = ?', id, (err, results) => {
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

// Crear un nuevo registro
router.post('/importarusuarios', (req, res) => {
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



// Crear un nuevo registro
router.post('/crearpais', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO pais SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/importarpais', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO pais SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});





// Crear un nuevo registro
router.post('/crearestado', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO estado SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/importarestado', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO estado SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});




// Crear un nuevo registro
router.post('/crearmunicipio', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO municipio SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/importarmunicipio', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO municipio SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});










// Crear un nuevo registro
router.post('/crearbote', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO botes SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/importarbote', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO botes SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});









// Crear un nuevo registro
router.post('/crearasignacion', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO asignaciones SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/importarasignacion', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO asignaciones SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});






// Crear un nuevo registro
router.post('/crearmantenimiento', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO mantenimiento SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/importarmantenimiento', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO mantenimiento SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});






// Crear un nuevo registro
router.post('/crearsensor', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO sensores SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/importarsensor', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO sensores SET ?', nuevoRegistro, (err, results) => {
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
router.put('/actualizarusuario/:id', (req, res) => {
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

// Actualizar un registro
router.put('/actualizarpais/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE pais SET ? WHERE id_pais = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/actualizarestado/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE estado SET ? WHERE id_estado = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/actualizarmunicipio/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE municipio SET ? WHERE id_municipio = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/actualizarbote/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE botes SET ? WHERE id_bote = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/actualizarasignacion/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE asignaciones SET ? WHERE id_asignacion = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/actualizarmantenimiento/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE mantenimiento SET ? WHERE id_mantenimiento = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/actualizarsensor/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  
  connection.query('UPDATE sensores SET ? WHERE id_sensor = ?', [datosActualizados, id], (err, results) => {
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
router.delete('/eliminarusuario/:id', verifyToken, (req, res) => {
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

//Eliminar pais
router.delete('/eliminarpais/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM pais WHERE id_pais = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

//Eliminar estado
router.delete('/eliminarestado/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM estado WHERE id_estado = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

//Eliminar municipio
router.delete('/eliminarmunicipio/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM municipio WHERE id_municipio = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

//Eliminar bote
router.delete('/eliminarbote/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM botes WHERE id_bote = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

//Eliminar asignacion
router.delete('/eliminarasignacion/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM asignaciones WHERE id_asignacion = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

//Eliminar mantenimiento
router.delete('/eliminarmantenimiento/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM mantenimiento WHERE id_mantenimiento = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

//Eliminar sensor
router.delete('/eliminarsensor/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM sensores WHERE id_sensor = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});


// -------------------------------------------------------------------------------------------------------------------------------------------------
























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













