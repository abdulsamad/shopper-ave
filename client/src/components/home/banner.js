import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const Banner = () => (
  <section className="banner-section">
    <div
      id="banner-carousel"
      className="carousel slide overflow-hidden w-100 banner"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item position-relative active first">
          <StaticImage
            src="../../images/shopping.png"
            className="h-100 position-absolute img-wrapper"
            imgClassName="d-block"
            alt="shopping"
            objectFit="cover"
          />
          <div className="carousel-caption d-none d-md-inline-block">
            <h5 className="display-3 text-uppercase">
              The{" "}
              <span className="text-primary fw-bold fst-italic">
                festive season
              </span>{" "}
              is here
            </h5>
            <p className="mb-0 fs-5">
              Upto <span className="fs-3 fw-bold fst-italic">30&#37; Off</span>{" "}
              on all items order before the end of this month.
              <br />
              <small className="my-3 text-small">* T&amp;C Apply</small>
            </p>
            <button className="btn btn-lg btn-primary my-3">Shop Now</button>
          </div>
        </div>
        {/* <div className="carousel-item position-relative second">
          <StaticImage
            src="../../images/guy.png"
            className="h-100"
            imgClassName="d-block"
            alt="shopping"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item position-relative third">
          <StaticImage
            src="../../images/jacket.png"
            className="h-100"
            imgClassName="d-block"
            alt="shopping"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div> */}
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
