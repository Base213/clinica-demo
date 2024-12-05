import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DateTime from 'react-datetime';
import Select from 'react-select';
import 'react-datetime/css/react-datetime.css';
import './css/LoadDoctors.css';
import './css/tooplate-style.css'

const TakeTurns = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search); // Crea un objeto para leer parámetros
  const userId = params.get('idUsuario'); // Extrae el valor de "userId"
  const [users, setUsers] = useState([]);
  const [centros, setCentros] = useState([]);
  const [newCitaMedica, setNewCitaMedica] = useState({ id_usuario: '', id_profesional: '', id_centro_medico: '', fecha_cita: '' });
  const [selectedCentroMedico, setSelectedCentroMedico] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [citas, setCitasMedicas] = useState([]);

  useEffect(() => {
    fetchIdUsuario();
    fetchUsers();
    fetchCentros();
    fetchCitasMedicas();
  }, []);

  const fetchIdUsuario= async () => {
    try {
        setNewCitaMedica({ ...newCitaMedica, id_usuario: userId })
    } catch (error) {
      console.error('Error al cargar id_usuario:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const fetchCentros = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/centrosmedicos');
      setCentros(response.data);
    } catch (error) {
      console.error('Error fetching centros medicos:', error);
    }
  };

  const handleFormSubmit = async () => {
    if (!newCitaMedica || !selectedDateTime) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const formattedDateTime = selectedDateTime.isValid
        ? selectedDateTime.format('YYYY-MM-DD HH:mm:ss')
        : null;

    if (!formattedDateTime) {
        alert('La fecha y hora seleccionadas no son válidas.');
        return;
    }

    const selectionData = {
        id_usuario: newCitaMedica.id_usuario,
        id_profesional: newCitaMedica.id_profesional,
        id_centro_medico: newCitaMedica.id_centro_medico,
        dateTime: formattedDateTime,
    };

    console.log('Formulario enviado con los siguientes datos:');
    console.log('ID Usuario:', selectionData.id_usuario);
    console.log('ID Profesional:', selectionData.id_profesional);
    console.log('ID Centro Médico:', selectionData.id_centro_medico);
    console.log('Fecha y Hora:', selectionData.dateTime);

    try {
      await axios.post('http://localhost:5000/api/citamedica', {
        id_usuario: selectionData.id_usuario,
        id_profesional: selectionData.id_profesional,
        id_centro_medico: selectionData.id_centro_medico,
        dt_fecha_consulta: selectionData.dateTime
      });
      fetchCitasMedicas();
    } catch (error) {
      console.error('Error adding cita médica:', error);
    }
    //alert('Formulario enviado con éxito.');
  };

  const fetchCitasMedicas = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/lista_citas/${userId}`);
      setCitasMedicas(response.data);
    } catch (error) {
      console.error('Error al cargar citas médicas:', error);
    }
  };

  const handleDeleteCita = async (id_hora) => {
    if (window.confirm('¿Seguro que deseas eliminar esta hora médica?')) {
      try {
        await axios.delete(`http://localhost:5000/api/delete_cita/${id_hora}`);
        fetchCitasMedicas();
      } catch (error) {
        console.error('Error deleting cita médica:', error);
      }
    }
  };

  return (
    <>
    <section class="navbar navbar-default navbar-static-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon icon-bar"></span>
            <span class="icon icon-bar"></span>
            <span class="icon icon-bar"></span>
          </button>
          <a href="http://localhost:3000/" class="navbar-brand"><i class="fa fa-h-square"></i>ealth Center - Toma de horas</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript:history.back()" class="smoothScroll">Inicio</a></li>
            <li><a href="javascript:alert('Sitio en construcción\nEstamos trabajando para usted')" class="smoothScroll">Con&oacute;cenos</a></li>
            <li><a href="javascript:alert('Sitio en construcción\nEstamos trabajando para usted')" class="smoothScroll">Profesionales</a></li>
            <li><a href="javascript:alert('Sitio en construcción\nEstamos trabajando para usted')" class="smoothScroll">Noticias</a></li>
            <li><a href="javascript:alert('Sitio en construcción\nEstamos trabajando para usted')" class="smoothScroll">Contacto</a></li>
          </ul>
        </div>
      </div>
    </section>
    <div style={{ padding: '20px' }}>
      <br/>
      <h2>Selecciona Profesional, Centro Médico y Fecha</h2>
      <div style={{ marginBottom: '20px' }}>
      <label>
            Profesional:
            <select
            value={users.id_profesional}
            onChange={(e) =>
                setNewCitaMedica({ ...newCitaMedica, id_profesional: e.target.value })
            }
            >
            <option value="">Seleccione un profesional</option>
            {users.map((user) => (
                <option key={user.id_profesional} value={user.id_profesional}>
                {user.gls_nombre}
                </option>
            ))}
            </select>
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
            Centro Médico:
            <select
            value={centros.id_centro_medico}
            onChange={(e) =>
                setNewCitaMedica({ ...newCitaMedica, id_centro_medico: e.target.value })
            }
            >
            <option value="">Seleccione un centro médico</option>
            {centros.map((centro) => (
                <option key={centro.id_centro_medico} value={centro.id_centro_medico}>
                {centro.gls_nombre_centro}
                </option>
            ))}
            </select>
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
      <label>Fecha y Hora:</label>
        <DateTime
          value={selectedDateTime}
          onChange={setSelectedDateTime}
          inputProps={{ placeholder: 'Selecciona fecha y hora' }}
        />
      </div>
      <button onClick={handleFormSubmit}>Enviar</button>
      <br/>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Profesional</th>
            <th>Centro Médico</th>
            <th>Hora Programada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id_hora}>
              <td>{cita.id_hora}</td>
              <td>{cita.gls_nombre}</td>
              <td>{cita.gls_nombre_centro}</td>
              <td>{cita.dt_fecha_consulta}</td>
              <td>
                <button onClick={() => handleDeleteCita(cita.id_hora)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TakeTurns;
