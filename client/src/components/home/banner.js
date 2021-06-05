import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const Banner = () => (
  <section className="banner-section">
    <div
      id="banner-carousel"
      className="carousel slide overflow-hidden w-100 shadow-sm banner"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item position-relative active first">
          <StaticImage
            src="../../images/banner/shopping.png"
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
              on all items ordered before the end of this month.
              <br />
              <small className="my-3 text-small">* T&amp;C Apply</small>
            </p>
            <button className="btn btn-lg btn-primary my-3">
              Shop Now <i className="bi bi-cart4 ms-2" />
            </button>
          </div>
        </div>
        <div className="carousel-item second">
          <div className="img-container position-relative d-flex justify-content-between h-100">
            <StaticImage
              src="../../images/banner/cap-guy.png"
              className="cap-guy"
              imgClassName="d-block"
              alt="guy in cap and jacket"
            />
            <StaticImage
              src="../../images/banner/tshirt.png"
              className="tshirt"
              imgClassName="d-block"
              alt="guy in tshirt"
            />
            <StaticImage
              src="../../images/banner/hoodie.png"
              className="hoodie"
              imgClassName="d-block"
              alt="guy in hoodie"
            />
          </div>
          <div className="carousel-caption d-none d-md-inline-block">
            <h5 className="display-4 fw-bold text-uppercase">
              Ultimate Men&apos;s wear
            </h5>
            <p className="mb-0 fs-5 text-capitalize">
              Be exclusive, Be Divine, Be yourself.
            </p>
            <button className="btn btn-lg btn-primary my-3">
              Shop Now
              <i className="bi bi-cart4 ms-2" />
            </button>
          </div>
        </div>
        <div className="carousel-item position-relative third">
          <StaticImage
            src="../../images/banner/jacket.png"
            className="h-100 position-absolute"
            imgClassName="d-block"
            alt="shopping"
          />
          <div className="carousel-caption d-none d-md-inline-block">
            <h5 className="display-3 text-uppercase fw-bold fst-italic">
              Fashion as unique as you are
            </h5>
            <p className="mb-0 fs-5">
              Checkout our latest collection and get upto{" "}
              <span className="fs-3 fw-bold fst-italic">30&#37; Off</span> on
              all items ordered before the end of this month.
            </p>
            <p className="lead">Casual | Formal | Ethnic</p>
            <button className="btn btn-lg btn-primary my-3">
              Shop Now
              <i className="bi bi-cart4 ms-2" />
            </button>
          </div>
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
