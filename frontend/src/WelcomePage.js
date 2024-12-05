import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/WelcomePage.css';

const WelcomePage = () => {
  const location = useLocation();
  const { id, nombre } = location.state || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    alert('Has cerrado sesión.');
    // Aquí podrías redirigir al usuario al login
    window.location.href = '/';
  };

  return (
    <div className="welcome-page">
      <h2>¡Bienvenido!</h2>
      <p>Hola, {nombre ? nombre : 'Usuario'}, has iniciado sesión exitosamente.</p>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-button">
          Menú
        </button>
        {isDropdownOpen && (
          <div>
            <a href="/Doctors" className="dropdown-item">Profesionales</a>
            <a href={`/TakeTurns?idUsuario=${id}`} className="dropdown-item">Toma de Horas</a>
            <button onClick={handleLogout} className="dropdown-item">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div> 
  );
};

export default WelcomePage;
