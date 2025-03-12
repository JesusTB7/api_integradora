// routes.js
const express = require('express');
const router = express.Router();
const connection = require('./db');

// -------------------------------------------------------------------------------------------------------------------------------------------------

// Obtener todos los registros
router.get('/alumnos', (req, res) => {
  connection.query('SELECT * FROM tb_alumno', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/grupos', (req, res) => {
  connection.query('SELECT * FROM tb_grupos', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/carreras', (req, res) => {
  connection.query('SELECT * FROM tb_carreras', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener todos los registros
router.get('/universidades', (req, res) => {
  connection.query('SELECT * FROM tb_universidades', (err, results) => {
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
router.get('/alumnos/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM tb_alumno WHERE id_alumno = ?', id, (err, results) => {
      if (err) {
        console.error('Error al obtener el registro:', err);
        res.status(500).json({ error: 'Error al obtener el registro' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Registro no encontrado' });
        return;
      }
      res.json(results[0]);
    });
});

router.get('/carreras/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM tb_carreras WHERE id_carrera = ?', id, (err, results) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).json({ error: 'Error al obtener el registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

router.get('/grupos/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM tb_grupos WHERE id_grupo = ?', id, (err, results) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).json({ error: 'Error al obtener el registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

router.get('/universidades/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM tb_universidades WHERE id_uni = ?', id, (err, results) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).json({ error: 'Error al obtener el registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// -------------------------------------------------------------------------------------------------------------------------------------------------

// Crear un nuevo registro
router.post('/alumnos', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO tb_alumno SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/carreras', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO tb_carreras SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/grupos', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO tb_grupos SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Crear un nuevo registro
router.post('/universidades', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO tb_universidades SET ?', nuevoRegistro, (err, results) => {
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
router.put('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE tb_alumno SET ? WHERE id_alumno = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/carreras/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE tb_carreras SET ? WHERE id_carrera = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/grupos/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE tb_grupos SET ? WHERE id_grupo = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Actualizar un registro
router.put('/universidades/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE tb_universidades SET ? WHERE id_uni = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// -------------------------------------------------------------------------------------------------------------------------------------------------

// Eliminar un registro
router.delete('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tb_alumno WHERE id_alumno = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

// Eliminar un registro
router.delete('/carreras/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tb_carreras WHERE id_carrera = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

// Eliminar un registro
router.delete('/grupos/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tb_grupos WHERE id_grupo = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});

// Eliminar un registro
router.delete('/universidades/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tb_universidades WHERE id_uni = ?', id, (err, results) => {
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
