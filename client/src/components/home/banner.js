import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const Banner = () => (
  <section className="banner-section">
    <div
      id="banner-carousel"
      className="carousel carousel-dark slide overflow-hidden w-100 banner"
      data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <StaticImage
            src="../images/shopping.png"
            className="d-block w-100 img-fluid"
            alt="shopping"
          />
        </div>
        <div className="carousel-item">
          <StaticImage
            src="../images/guy.png"
            className="d-block w-100 img-fluid"
            alt="shopping"
          />
        </div>
        <div className="carousel-item">
          <StaticImage
            src="../images/jacket.png"
            className="d-block w-100 img-fluid"
            alt="shopping"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Banner;
