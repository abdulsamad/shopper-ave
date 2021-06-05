import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";
import Banner from "../components/home/banner";

const data = [
  {
    _id: 1,
    title: "Crawfish",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    _id: 2,
    title: "Lid - 10,12,16 Oz",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    _id: 3,
    title: "Lychee - Canned",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    _id: 4,
    title: "Sprouts - Alfalfa",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    _id: 5,
    title: "Appetizer - Assorted Box",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    _id: 6,
    title: "Compound - Mocha",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    _id: 7,
    title: "Juice - Orange, 341 Ml",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    _id: 8,
    title: "Flour - Semolina",
    excerpt:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
];

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Banner />
    <div className="container my-4 home-collection">
      <div className="row">
        {data.map(({ _id, title, excerpt }) => (
          <div className="col" key={_id}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                height={400}
                width={250}
                src="https://source.unsplash.com/250x400?fashion"
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
