import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/LoadDoctors.css';

const LoadDoctors = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({ gls_nombre: '', gls_email: '', id_especialidad: '', id_region: '', id_ciudad: '' });
  const [especialidades, setEspecialidades] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchEspecialidades();
    fetchRegiones();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleDelete = async (id_profesional) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${id_profesional}`);
        fetchUsuarios();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/doctors/${selectedUser.id_profesional}`, {
        gls_nombre: selectedUser.gls_nombre,
        gls_email: selectedUser.gls_email
      });
      setIsEditing(false);
      fetchUsuarios();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/doctors', {
        gls_nombre: newUser.gls_nombre,
        gls_email: newUser.gls_email,
        id_especialidad: newUser.id_especialidad,
        id_region: newUser.id_region,
        id_ciudad: newUser.id_ciudad
      });
      setIsAdding(false);
      setNewUser({ gls_nombre: '', gls_email: '' , id_especialidad: '' , id_region: '' , id_ciudad: '' });
      fetchUsuarios();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const fetchEspecialidades = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/especialidades');
      setEspecialidades(response.data);
    } catch (error) {
      console.error('Error fetching especialidades:', error);
    }
  };

  const fetchRegiones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/regiones');
      setRegiones(response.data);
    } catch (error) {
      console.error('Error fetching regiones:', error);
    }
  };

  const fetchCiudades = async (id_region) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ciudades/${id_region}`);
      setCiudades(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleRegionChange = (e) => {
    const id_region = e.target.value;
    setNewUser({ ...newUser, id_region, id_ciudad: '' });
    fetchCiudades(id_region);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Profesionales</h1>
      <button onClick={() => setIsAdding(true)} style={{ marginBottom: '10px' }}>
        ➕ Agregar Profesional
      </button>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_profesional}>
              <td>{user.id_profesional}</td>
              <td>{user.gls_nombre}</td>
              <td>{user.gls_email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>✏️ Editar</button>
                <button onClick={() => handleDelete(user.id_profesional)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Profesional</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={selectedUser.gls_nombre}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, gls_nombre: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={selectedUser.gls_email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, gls_email: e.target.value })
                }
              />
            </label>
            <br />
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal para agregar */}
      {isAdding && (
        <div className="modal">
          <div className="modal-content">
            <h2>Agregar Profesional</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={newUser.gls_nombre}
                onChange={(e) =>
                  setNewUser({ ...newUser, gls_nombre: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={newUser.gls_email}
                onChange={(e) =>
                  setNewUser({ ...newUser, gls_email: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Especialidad:
              <select
                value={newUser.id_especialidad}
                onChange={(e) =>
                  setNewUser({ ...newUser, id_especialidad: e.target.value })
                }
              >
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                    {especialidad.gls_nombre_especialidad}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Región:
              <select
                value={newUser.id_region}
                onChange={handleRegionChange}
              >
                <option value="">Seleccione una región</option>
                {regiones.map((region) => (
                  <option key={region.id_region} value={region.id_region}>
                    {region.gls_nombre_region}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Ciudad:
              <select
                value={newUser.id_ciudad}
                onChange={(e) =>
                  setNewUser({ ...newUser, id_ciudad: e.target.value })
                }
                disabled={!newUser.id_region}
              >
                <option value="">Seleccione una ciudad</option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                    {ciudad.gls_nombre_ciudad}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button onClick={handleAddUser}>Guardar</button>
            <button onClick={() => setIsAdding(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadDoctors;
