import React, { useState } from "react";
import { navigate } from "gatsby";

import Layout from "../components/layout/layout";

const Product = () => {
  const [size, setSize] = useState("medium");

  return (
    <Layout>
      <div className="container pt-4 pb-3 product">
        <section className="p-4">
          <div className="mb-5">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              <i className="bi bi-arrow-left me-2" />
              Back
            </button>
          </div>
          <div className="row mt-4 image">
            <div className="col-5">
              <img src="https://source.unsplash.com/400x600?clothes" alt="" />
            </div>
            <div className="col">
              <h1 className="title fw-bold fs-3">Puma</h1>
              <h2 className="text-muted fs-4">
                Men Orange Solid RUN FAVORITE SS TEE DryCell Round Neck Running
                T-shirt
              </h2>
              <h3 className="fw-bold my-3">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(1000)}
              </h3>
              <div className="sizes my-4">
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="options"
                    id="extra-small"
                    value="extra-small"
                    checked={size === "extra-small"}
                    onClick={(ev) => setSize(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="extra-small">
                    XS
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="options"
                    id="small"
                    value="small"
                    checked={size === "small"}
                    onClick={(ev) => setSize(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="small">
                    S
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="options"
                    id="medium"
                    value="medium"
                    checked={size === "medium"}
                    onClick={(ev) => setSize(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="medium">
                    M
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="options"
                    id="large"
                    value="large"
                    checked={size === "large"}
                    onClick={(ev) => setSize(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="large">
                    L
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="options"
                    id="extra-large"
                    value="extra-large"
                    checked={size === "extra-large"}
                    onClick={(ev) => setSize(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="extra-large">
                    XL
                  </label>
                </div>
              </div>
              <div className="actions my-3">
                <button className="btn btn-outline-dark">
                  <i className="bi bi-bag-fill me-2" />
                  Buy Now
                </button>
                <button className="btn btn-primary ms-3">
                  <i className="bi bi-cart-plus-fill me-2" />
                  Add to Cart
                </button>
              </div>
              <p className="my-4 fs-5">
                <strong>Category:</strong> T-Shirt
              </p>
              <p className="lh-lg lead">
                100% Original Products <br />
                Free Delivery on order above Rs. 799 <br />
                Pay on delivery might be available <br />
                Easy 30 days returns and exchanges <br />
                Try &amp; Buy might be available
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Product;
