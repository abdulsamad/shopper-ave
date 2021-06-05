import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="container text-center">
      <StaticImage
        src="../images/404.svg"
        height={300}
        loading="eager"
        className="my-5"
      />
      <h1 className="mt-4">Page Not Found</h1>
      <p className="lead">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
      <Link to="/" className="btn btn-primary">
        Check Homepage
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;
