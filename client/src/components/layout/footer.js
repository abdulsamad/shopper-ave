import React from "react";

const footer = () => (
  <footer className="my-4 text-center">
    <p className="lead">
      This is a demo store for portfolio project — No orders shall be fulfilled
    </p>
    <p>
      &copy; {new Date().getFullYear()} FaShop, Created by{" "}
      <a href="https://abdulsamad.dev" className="text-decoration-none">
        AbdulSamad
      </a>
    </p>
  </footer>
);

export default footer;
