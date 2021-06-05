import React from "react";
import { navigate } from "gatsby";

import Layout from "../components/layout/layout";

const Checkout = () => {
  return (
    <Layout>
      <section className="container pt-5 pb-3 checkout">
        <div className="border p-4">
          <header>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              <i className="bi bi-arrow-left me-2" />
              Back
            </button>
          </header>
          <h1 className="my-5">Hello Checkout</h1>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
