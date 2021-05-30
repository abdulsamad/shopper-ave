import * as React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";

const Header = ({ siteTitle }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-primary">
    <div className="container-fluid">
      <button className="navbar-brand btn btn-link d-flex align-items-center brand-logo-font fw-bold">
        <StaticImage
          src="../images/icon.png"
          alt="FaShop"
          width="38"
          height="30"
        />
        {siteTitle}
      </button>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Admin Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              LogIn
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              SignUp
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              SignOut
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Cart
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
