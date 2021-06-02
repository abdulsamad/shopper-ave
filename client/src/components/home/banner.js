import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const Banner = () => (
  <section className="banner-section">
    <div
      id="banner-carousel"
      className="carousel carousel-dark slide overflow-hidden w-100 banner"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <StaticImage
            src="../../images/shopping.png"
            imgClassName="d-block w-100 img-fluid"
            alt="shopping"
          />
        </div>
        <div className="carousel-item">
          <StaticImage
            src="../../images/guy.png"
            imgClassName="d-block w-100 img-fluid"
            alt="shopping"
          />
        </div>
        <div className="carousel-item">
          <StaticImage
            src="../../images/jacket.png"
            imgClassName="d-block w-100 img-fluid"
            alt="shopping"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#banner-carousel"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#banner-carousel"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </section>
);

export default Banner;