import * as React from "react";
import PropTypes from "prop-types";

const Header = ({ siteTitle }) => (
  <nav className="navbar navbar-light bg-primary">
    <div className="container-fluid">
      <button className="navbar-brand btn btn-link">
        <img
          src="https://satyr.io/60/2"
          alt=""
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        />
        {siteTitle}
      </button>
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
