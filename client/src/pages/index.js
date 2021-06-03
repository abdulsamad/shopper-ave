import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";
import Banner from "../components/home/banner";

const data = [0, 0, 0, 0].fill({
  title: "Product Name",
  excerpt:
    "Some quick example text to build on the card title and make up the bulk of the card's content.",
});

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Banner />
    <div className="container my-4 home-collection">
      <div className="row">
        {data.map(({ title, excerpt }) => (
          <div className="col" key={title}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://source.unsplash.com/350x550?fashion"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{excerpt}</p>
                <div className="d-flex">
                  <Link to="/" className="btn btn-outline-primary w-50">
                    Add to Cart
                  </Link>
                  <Link to="/" className="btn btn-primary w-50 ms-2">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default IndexPage;
