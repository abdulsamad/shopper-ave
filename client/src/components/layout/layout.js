import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Footer from "./footer";

const Layout = ({ children, sidebar }) => {
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
      <main className="main">{children}</main>
      <Footer sidebar={sidebar} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.bool,
};

Layout.defaultProps = {
  sidebar: false,
};

export default Layout;
