import React from 'react';
import { Carousel } from 'react-bootstrap';

function CarouselComponent() {
  return (
    <div className="carousel-container">
        <Carousel>
            <Carousel.Item>
            <img className="d-block w-100" src="../images/slider1.jpg" alt="First slide" />
                <Carousel.Caption>
                    <h3>Let's make your life happier</h3>
                    <h1>Healthy Living</h1>
                    <a href="#team" class="section-btn btn btn-default smoothScroll">Meet Our Doctors</a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="../images/slider2.jpg" alt="Second slide" />
                <Carousel.Caption>
                    <h3>Aenean luctus lobortis tellus</h3>
                    <h1>New Lifestyle</h1>
                    <a href="#about" class="section-btn btn btn-default btn-gray smoothScroll">More About Us</a>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src="../images/slider3.jpg" alt="Third slide" />
                <Carousel.Caption>
                    <h3>Pellentesque nec libero nisi</h3>
                    <h1>Your Health Benefits</h1>
                    <a href="#news" class="section-btn btn btn-default btn-blue smoothScroll">Read Stories</a>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
    );
}

export default CarouselComponent;