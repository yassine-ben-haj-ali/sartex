import React from "react";
import  Img  from "../assets/local.jpg";
const About = () => {
  return (
    <section id="about" class="py-5">
      <div class="container">
        <div class="row gy-lg-5 align-items-center">
          <div class="col-lg-6 order-lg-1 text-center text-lg-start">
            <div class="title pt-3 pb-5">
              <h2 class="position-relative d-inline-block ms-4">About Us</h2>
            </div>
            <p class="lead text-muted">
              SARTEX est une société résidente totalement exportatrice spécial-
              isée dans la confection d’articles variés pour hommes, femmes et
              enfants : pantalons, jackets, jupes, bermudas, sports wear, jeans
              wear, street wear etc.
            </p>
          </div>
          <div class="col-lg-6 order-lg-0">
            <img src={Img} alt="" class="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
