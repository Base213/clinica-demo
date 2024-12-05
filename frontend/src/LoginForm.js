import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/App.css';

const LoginForm = () => {
  const [input_usuario, setUsername] = useState('');
  const [input_passwd, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_usuario, input_passwd }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir a la página de bienvenida
        console.log({ id: data.id, nombre: data.nombre, tipo: data.tipo })
        if (data.tipo == 1) {
          navigate('/Welcome', { state: { id: data.id, nombre: data.nombre, tipo: data.tipo } });
        } else {
          navigate(`/TakeTurns?idUsuario=${data.id}`, { state: { id: data.id, nombre: data.nombre, tipo: data.tipo } });
        }
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      setMessage('Error de conexión con el servidor');
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
    <div className="App">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={input_usuario}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={input_passwd}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default LoginForm;
