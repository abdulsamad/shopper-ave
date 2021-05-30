import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Header = ({ siteTitle }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-primary">
    <div className="container-fluid">
      <button className="navbar-brand btn btn-link d-inline-flex align-items-center fw-bold fs-4 brand-logo-font">
        <StaticImage
          src="../images/icon.png"
          alt="FaShop"
          width="38"
          height="30"
        />
        {siteTitle}
      </button>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link
              className="nav-link"
              activeClassName="active"
              aria-current="page"
              to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/">
              Admin Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/">
              LogIn
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/">
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" activeClassName="active" to="/">
              SignOut
            </Link>
          </li>
          <li className="nav-item mx-3">
            <button
              type="button"
              className="nav-link btn btn-sm btn-outline-primary">
              <i className="bi bi-cart4 fs-4"></i>
            </button>
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
