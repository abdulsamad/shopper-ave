import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { isAuthenticated, signOut } from "../auth";

const Header = ({ siteTitle }) => {
  const isLoggedIn = (
    <li className="nav-item">
      <button type="button" className="nav-link btn" onClick={signOut}>
        LogOut
      </button>
    </li>
  );

  const isNotLoggedIn = (
    <>
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/login">
          LogIn
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" activeClassName="active" to="/signup">
          SignUp
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm fixed-top">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link d-inline-flex align-items-center fw-bold fs-4 brand-logo-font">
          <StaticImage
            src="../images/icon.png"
            alt="FaShop"
            width={33}
            height={30}
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
            {isAuthenticated()?.user?.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  activeClassName="active"
                  to="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated()?.user?.role === 1 && (
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" to="/admin">
                  Admin Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && isNotLoggedIn}
            {isAuthenticated() && isLoggedIn}
            <li className="nav-item ms-2">
              <button type="button" className="nav-link btn">
                <span className="d-lg-none">Cart</span>{" "}
                <i className="bi bi-cart4 fs-4" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
