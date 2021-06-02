import React from "react";
import PropTypes from "prop-types";

const Footer = ({ sidebar }) => {
  if (sidebar) {
    return (
      <div className="row mx-0">
        <footer className="col offset-lg-2 my-4 text-center">
          <p className="lead">
            This is a demo store for portfolio project — No orders shall be
            fulfilled
          </p>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="brand-logo-font">FaShop</span>, Created by{" "}
            <a href="https://abdulsamad.dev" className="text-decoration-none">
              AbdulSamad
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <footer className="my-4 text-center">
      <p className="lead">
        This is a demo store for portfolio project — No orders shall be
        fulfilled
      </p>
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <span className="brand-logo-font">FaShop,</span> Created by{" "}
        <a href="https://abdulsamad.dev" className="text-decoration-none">
          AbdulSamad
        </a>
      </p>
    </footer>
  );
};

Footer.propTypes = {
  sidebar: PropTypes.bool.isRequired,
};

export default Footer;
