import React from 'react';
import CarouselComponent  from './Carousel';

import './css/Home.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import './css/animate.css';
import './css/owl.carousel.css';
import './css/owl.theme.default.min.css';



const Home = () => {
    return (
        <>
     <header>
          <div class="container">
               <div class="row">

                    <div class="col-md-4 col-sm-5">
                         <p>Bienvenido a centro medico Galenos</p>
                    </div>
                         
                    <div class="col-md-8 col-sm-7 text-align-right">
                         <span class="phone-icon"><i class="fa fa-phone"></i> 010-060-0160</span>
                         <span class="date-icon"><i class="fa fa-calendar-plus-o"></i> 6:00 AM - 10:00 PM (Lun-Vier)</span>
                         <span class="email-icon"><i class="fa fa-envelope-o"></i> <a href="#">galenos@medico.com</a></span>
                    </div>

               </div>
          </div>
     </header>


     <section class="navbar navbar-default navbar-static-top" role="navigation">
          <div class="container">

               <div class="navbar-header">
                    <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                         <span class="icon icon-bar"></span>
                         <span class="icon icon-bar"></span>
                         <span class="icon icon-bar"></span>
                    </button>

                    <a href="index.html" class="navbar-brand">Centro Medico Galenos</a>
               </div>

               <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="appointment-btn"><a href={`/LoginForm`}>Acceso admin</a></li>
                        <li><a href="#top" class="smoothScroll">Inicio</a></li>
                        <li><a href="#about" class="smoothScroll">Sobre Nosotros</a></li>
                        <li><a href="#team" class="smoothScroll">Doctores</a></li>
                        <li><a href="#news" class="smoothScroll">Noticias</a></li>
                        <li><a href="#google-map" class="smoothScroll">Contacto</a></li>
                        <li class="appointment-btn"><a href={`/TakeTurns?idUsuario=2`}>Toma de Horas</a></li>
                    </ul>
               </div>

          </div>
     </section>


     <section id="home" class="slider" data-stellar-background-ratio="0.5">
          <div class="container">
               <div class="row">



               </div>
          </div>
     </section>


     <section id="about">
          <div class="container">
               <div class="row">

                    <div class="col-md-6 col-sm-6">
                         <div class="about-info">
                              <h2 class="wow fadeInUp" data-wow-delay="0.6s">Bienvenido a Centro medico Galenos</h2>
                              <div class="wow fadeInUp" data-wow-delay="0.8s">
                                   <p>Centro medico galenos, un centro medico familiar dispuesto a darte la mejor atencion por tu salud y bienestar.</p>
                                   
                              </div>
                              
                         </div>
                    </div>
                    
               </div>
          </div>
     </section>


     <section id="team" data-stellar-background-ratio="1">
          <div class="container">
               <div class="row">

                    <div class="col-md-6 col-sm-6">
                         <div class="about-info">
                              <h2 class="wow fadeInUp" data-wow-delay="0.1s">Nuestros doctores</h2>
                         </div>
                    </div>

                    <div class="clearfix"></div>

                    <div class="col-md-4 col-sm-6">
                         <div class="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                              <img src="../images/team-image1.jpg" class="img-responsive" alt="" />

                                   <div class="team-info">
                                        <h3>Nate Baston</h3>
                                        <p>Doctor de cabecera</p>
                                        <div class="team-contact-info">
                                             <p><i class="fa fa-phone"></i> 010-020-0120</p>
                                             <p><i class="fa fa-envelope-o"></i> <a href="#">general@company.com</a></p>
                                        </div>
                                        <ul class="social-icon">
                                             <li><a href="#" class="fa fa-linkedin-square"></a></li>
                                             <li><a href="#" class="fa fa-envelope-o"></a></li>
                                        </ul>
                                   </div>

                         </div>
                    </div>

                    <div class="col-md-4 col-sm-6">
                         <div class="team-thumb wow fadeInUp" data-wow-delay="0.4s">
                              <img src="../images/team-image2.jpg" class="img-responsive" alt="" />

                                   <div class="team-info">
                                        <h3>Jason Stewart</h3>
                                        <p>Obstetricia</p>
                                        <div class="team-contact-info">
                                             <p><i class="fa fa-phone"></i> 010-070-0170</p>
                                             <p><i class="fa fa-envelope-o"></i> <a href="#">pregnancy@company.com</a></p>
                                        </div>
                                        <ul class="social-icon">
                                             <li><a href="#" class="fa fa-facebook-square"></a></li>
                                             <li><a href="#" class="fa fa-envelope-o"></a></li>
                                             <li><a href="#" class="fa fa-flickr"></a></li>
                                        </ul>
                                   </div>

                         </div>
                    </div>

                    <div class="col-md-4 col-sm-6">
                         <div class="team-thumb wow fadeInUp" data-wow-delay="0.6s">
                              <img src="../images/team-image3.jpg" class="img-responsive" alt="" />

                                   <div class="team-info">
                                        <h3>Miasha Nakahara</h3>
                                        <p>Cardiologia</p>
                                        <div class="team-contact-info">
                                             <p><i class="fa fa-phone"></i> 010-040-0140</p>
                                             <p><i class="fa fa-envelope-o"></i> <a href="#">cardio@company.com</a></p>
                                        </div>
                                        <ul class="social-icon">
                                             <li><a href="#" class="fa fa-twitter"></a></li>
                                             <li><a href="#" class="fa fa-envelope-o"></a></li>
                                        </ul>
                                   </div>

                         </div>
                    </div>
                    
               </div>
          </div>
     </section>


    <section id="news" data-stellar-background-ratio="2.5">
          <div class="container">
               <div class="row">

                    <div class="col-md-12 col-sm-12">
                         <div class="section-title wow fadeInUp" data-wow-delay="0.1s">
                              <h2>Ultimas noticia</h2>
                         </div>
                    </div>

                    <div class="col-md-4 col-sm-6">
                         <div class="news-thumb wow fadeInUp" data-wow-delay="0.4s">
                              <a href="news-detail.html">
                                   <img src="../images/news-image1.jpg" class="img-responsive" alt="" />
                              </a>
                              <div class="news-info">
                                   <span>Marzo 08, 2024</span>
                                   <h3><a href="news-detail.html">Avances Tecnologicos medicos</a></h3>
                                   <p>Digital Beats: Innovadora Tecnología de Simulación Cardíaca para la Formación Médica.</p>
                                   <div class="author">
                                        <img src="../images/author-image.jpg" class="img-responsive" alt="" />
                                        <div class="author-info">
                                             <h5>Felipe Cid</h5>
                                             <p>Doctor / Participacion en su composicion</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>




               </div>
          </div>
     </section>


     

     <footer data-stellar-background-ratio="5">
          <div class="container">
               <div class="row">

                    <div class="col-md-4 col-sm-4">
                         <div class="footer-thumb"> 
                              <h4 class="wow fadeInUp" data-wow-delay="0.4s">Informacion de contacto</h4>
                              <p>Podemos ser contactados por telefono o gmail.</p>

                              <div class="contact-info">
                                   <p><i class="fa fa-phone"></i> 010-070-0170</p>
                                   <p><i class="fa fa-envelope-o"></i> <a href="#">galenos@medico.com</a></p>
                              </div>
                         </div>
                    </div>

                    <div class="col-md-4 col-sm-4"> 
                         <div class="footer-thumb"> 
                              <h4 class="wow fadeInUp" data-wow-delay="0.4s">Ultimas Noticias</h4>
                              <div class="latest-stories">
                                   <div class="stories-image">
                                        <a href="#"><img src="../images/news-image.jpg" class="img-responsive" alt="" /></a>
                                   </div>
                                   <div class="stories-info">
                                        <a href="#"><h5>Avances Tecnologicos medicos</h5></a>
                                        <span>March 08, 2024</span>
                                   </div>
                              </div>


                         </div>
                    </div>

                    <div class="col-md-4 col-sm-4"> 
                         <div class="footer-thumb">
                              <div class="opening-hours">
                                   <h4 class="wow fadeInUp" data-wow-delay="0.4s">Horarios</h4>
                                   <p>Lunes - Viernes <span>06:00 AM - 10:00 PM</span></p>
                                   <p>Sabado <span>09:00 AM - 08:00 PM</span></p>
                                   <p>Domingo <span>Cerrado</span></p>
                              </div> 

                              <ul class="social-icon">
                                   <li><a href="#" class="fa fa-facebook-square" attr="facebook icon"></a></li>
                                   <li><a href="#" class="fa fa-twitter"></a></li>
                                   <li><a href="#" class="fa fa-instagram"></a></li>
                              </ul>
                         </div>
                    </div>


                    
               </div>
          </div>
     </footer>
     <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/jquery.sticky.js"></script>
    <script src="./js/jquery.stellar.min.js"></script>
    <script src="./js/wow.min.js"></script>
    <script src="./js/smoothscroll.js"></script>
    <script src="./js/owl.carousel.min.js"></script>
    <script src="./js/custom.js"></script>
        </>
    );
};

export default Home;