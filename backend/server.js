// Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Importar la conexión a la base de datos

// Crear instancia de la aplicación Express
const app = express();

// Configurar middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas del backend
app.post('/api/login', (req, res) => {
  const { input_usuario, input_passwd } = req.body;

  if (!input_usuario || !input_passwd) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'SELECT * FROM tbl_usuarios WHERE gls_usuario = ? AND gls_passwd = ?';
  db.query(query, [input_usuario, input_passwd], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error del servidor' });

    if (results.length > 0) {
      //res.status(200).json({ message: 'Login exitoso', input_usuario });
      const user = results[0];
      //console.log({ message: 'Login exitoso', success: true, id: user.id_usuario, nombre: user.gls_nombre })
      res.status(200).json({ message: 'Login exitoso', success: true, id: user.id_usuario, nombre: user.gls_nombre, tipo: user.id_tipo_usuario });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

// Obtener todos los registros de la tabla "tbl_profesionales"
app.get('/api/doctors', (req, res) => {
  const sql = 'SELECT a.id_profesional, a.gls_nombre, CASE WHEN a.gls_email IS NULL THEN \'no email\' ELSE a.gls_email END AS gls_email, b.gls_nombre_especialidad FROM tbl_profesionales a inner join tbl_especialidades b on a.id_especialidad = b.id_especialidad';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

// Crear usuario
app.post('/api/doctors', (req, res) => {
  const { gls_nombre, gls_email, id_especialidad, id_region, id_ciudad } = req.body;
  const query = 'INSERT INTO tbl_profesionales (gls_nombre, gls_email, id_especialidad, id_region, id_ciudad) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [gls_nombre, gls_email, id_especialidad, id_region, id_ciudad], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error creando usuario' });
    } else {
      res.json({ message: 'Profesional creado', id: result.insertId });
    }
  });
});


// Editar usuario
app.put('/api/doctors/:id_profesional', (req, res) => {
  const { id_profesional } = req.params;
  const { gls_nombre, gls_email } = req.body;
  const query = 'UPDATE tbl_profesionales SET gls_nombre = ?, gls_email = ? WHERE id_profesional = ?';
  db.query(query, [gls_nombre, gls_email, id_profesional], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error actualizando datos' });
    } else {
      res.json({ message: 'Profesional actualizado' });
    }
  });
});

// Eliminar usuario
app.delete('/api/doctors/:id_profesional', (req, res) => {
  const { id_profesional } = req.params;
  const query = 'DELETE FROM tbl_profesionales WHERE id_profesional = ?';
  db.query(query, [id_profesional], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error eliminando Profesional' });
    } else {
      res.json({ message: 'Profesional eliminado' });
    }
  });
});

// Obtener regiones
app.get('/api/regiones', (req, res) => {
  const query = 'SELECT id_region, gls_nombre_region FROM tbl_regiones';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener regiones' });
    } else {
      res.json(results);
    }
  });
});

// Obtener ciudades por región
app.get('/api/ciudades/:id_region', (req, res) => {
  const id_region = req.params.id_region;
  const query = 'SELECT id_ciudad, gls_nombre_ciudad FROM tbl_ciudades WHERE id_region = ?';
  db.query(query, [id_region], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener ciudades' });
    } else {
      res.json(results);
    }
  });
});

// Obtener especialidades
app.get('/api/especialidades', (req, res) => {
  const query = 'SELECT id_especialidad, gls_nombre_especialidad FROM tbl_especialidades';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener especialidades' });
    } else {
      res.json(results);
    }
  });
});

// Obtener centros medico
app.get('/api/centrosmedicos', (req, res) => {
  const query = 'SELECT id_centro_medico, gls_nombre_centro FROM tbl_centros_medicos';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener especialidades' });
    } else {
      res.json(results);
    }
  });
});

// Guardar hora de cita medica
app.post('/api/citamedica', (req, res) => {
  const { id_usuario, id_profesional, id_centro_medico, dt_fecha_consulta } = req.body;

  const query = 'INSERT INTO tbl_horas_usuario (id_usuario, id_profesional, id_centro_medico, dt_fecha_consulta) VALUES (?, ?, ?, ?)';
  
  db.query(query, [id_usuario, id_profesional, id_centro_medico, dt_fecha_consulta], (err, result) => {
    if (err) {
      console.error('Error al guardar la selección:', err);
      res.status(500).json({ error: 'Error al guardar la selección' });
    } else {
      res.status(201).json({ message: 'Selección guardada correctamente', id: result.insertId });
    }
  });
});

// Obtener todas las citas médicas del usuario en sesión
app.get('/api/lista_citas/:id_usuario', (req, res) => {
  const id_usuario = req.params.id_usuario;
  const whereClause = id_usuario != "1" ? ' where a.id_usuario = ?' : '';
  const sql = 'select a.id_hora, b.gls_nombre, c.gls_nombre_centro, a.dt_fecha_consulta from tbl_horas_usuario a inner join tbl_profesionales b on a.id_profesional = b.id_profesional inner join tbl_centros_medicos c on a.id_centro_medico = c.id_centro_medico' + whereClause;
  db.query(sql, [id_usuario], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

// Elimina cita médica
app.delete('/api/delete_cita/:id_hora', (req, res) => {
  const id_hora = req.params.id_hora;
  const sql = 'delete from tbl_horas_usuario where id_hora = ?';
  db.query(sql, [id_hora], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
