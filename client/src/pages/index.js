import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";
import Banner from "../components/home/banner";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Banner />
    <div className="container my-4 home-collection">
      <div className="row">
        <div className="col">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://picsum.photos/720"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
