import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title} />
      <main>{children}</main>
      <footer className="mt-4 text-center">
        &copy; {new Date().getFullYear()} FaShop, Created by{" "}
        <a href="https://abdulsamad.dev" className="text-decoration-none">
          AbdulSamad
        </a>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
