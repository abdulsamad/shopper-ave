import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="container p-5 text-center">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
