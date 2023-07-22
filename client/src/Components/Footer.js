import React from "react";

const Footer = () => {
  return (
    <footer class="bg-dark py-5">
      <div class="container">
        <div class="row text-white g-4">
          <div class="col-md-6 col-lg-6">
            <a
              class="text-uppercase text-decoration-none brand text-white"
              href="index.html"
            >
              Attire
            </a>
            <p class="text-white text-muted mt-3">
              SARTEX est une société résidente totalement exportatrice spécial-
              isée dans la confection d’articles variés pour hommes, femmes et
              enfants : pantalons, jackets, jupes, bermudas, sports wear, jeans
              wear, street wear etc.
            </p>
          </div>

          <div class="col-md-6 col-lg-4">
            <h5 class="fw-light mb-3">Contact Us</h5>
            <div class="d-flex justify-content-start align-items-start my-2 text-muted">
              <span class="me-3">
                <i class="fas fa-map-marked-alt"></i>
              </span>
              <span class="fw-light">
                rue de Sousse KM1- 5016-kSAR HELLAL RIADH-MONASTIR- TUNISIE
              </span>
            </div>
            <div class="d-flex justify-content-start align-items-start my-2 text-muted">
              <span class="me-3">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="fw-light">sartex@planet.tn</span>
            </div>
            <div class="d-flex justify-content-start align-items-start my-2 text-muted">
              <span class="me-3">
                <i class="fas fa-phone-alt"></i>
              </span>
              <span class="fw-light">+9786 6776 236</span>
            </div>
          </div>

          <div class="col-md-6 col-lg-2">
            <h5 class="fw-light mb-3">Follow Us</h5>
            <div>
              <ul class="list-unstyled d-flex">
                <li>
                  <a
                    href="#"
                    class="text-white text-decoration-none text-muted fs-4 me-4"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="text-white text-decoration-none text-muted fs-4 me-4"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
