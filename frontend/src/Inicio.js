import React, { useState, useEffect } from 'react';
import './css/Inicio.css';

const images = [
  {
    src: '../images/slider1.jpg',
    caption:  `
    <h3>Let's make your life happier</h3>
    <h1>Healthy Living</h1>
    <a href="#team" class="section-btn btn btn-default smoothScroll">Meet Our Doctors</a>
     `,
  },
  {
    src: '../images/slider2.jpg',
    caption:  `
    <h3>Aenean luctus lobortis tellus</h3>
    <h1>New Lifestyle</h1>
    <a href="#about" class="section-btn btn btn-default btn-gray smoothScroll">More About Us</a>
     `,
  },
  {
    src: '../images/slider3.jpg',
    caption:  `
    <h3>Pellentesque nec libero nisi</h3>
    <h1>Your Health Benefits</h1>
    <a href="#news" class="section-btn btn btn-default btn-blue smoothScroll">Read Stories</a>
     `,
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanzar automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="carousel">
      <button className="carousel-button" onClick={prevImage}>
        &#8249;
      </button>
      <img
        src={images[currentIndex].src}
        alt={`Slide ${currentIndex + 1}`}
        className="carousel-image"
      />
      <button className="carousel-button" onClick={nextImage}>
        &#8250;
      </button>
      <section className="caption">
        <p>{images[currentIndex].caption}</p>
      </section>
    </section>
  );
};

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Ejemplo de Carrusel Automático</h1>
      </header>
      <section>
        <h2>Bienvenido</h2>
        <p>Este carrusel avanza automáticamente cada 3 segundos y muestra captions.</p>
      </section>
      <section>
        <h2>Carrusel de Imágenes</h2>
        <Carousel />
      </section>
      <footer>
        <p>© 2024 Carrusel App</p>
      </footer>
    </div>
  );
};

export default App;
