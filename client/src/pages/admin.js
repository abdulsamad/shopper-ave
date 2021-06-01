import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";

const AdminDashboardPage = () => (
  <Layout>
    <Seo title="Admin Dashboard - FaShop" />
    <div className="admin-dashboard">
      <div className="row gx-0">
        <section className="col-lg-2">
          <aside className="bg-dark fixed-bottom col-lg-2 admin-left">
            <ul
              className="nav nav-pills nav-justified flex-lg-column border-0"
              role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  className="nav-link border-0 rounded-0 p-3 active"
                  data-bs-toggle="tab"
                  data-bs-target="#create-category"
                  aria-current="page">
                  <i className="bi bi-bookmark-plus d-inline-block mr-5" />
                  Create Category
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  className="nav-link border-0 rounded-0 p-3"
                  data-bs-toggle="tab"
                  data-bs-target="#manage-categories">
                  <i className="bi bi-bookmark d-inline-block mr-5" />
                  Manage Categories
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  className="nav-link border-0 rounded-0 p-3"
                  data-bs-toggle="tab"
                  data-bs-target="#create-product">
                  <i className="bi bi-plus-circle d-inline-block mr-5" />
                  Create Product
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  className="nav-link border-0 rounded-0 p-3"
                  data-bs-toggle="tab"
                  data-bs-target="#manage-products">
                  <i className="bi bi-wrench d-inline-block mr-5" />
                  Manage Products
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  type="button"
                  className="nav-link border-0 rounded-0 p-3"
                  data-bs-toggle="tab"
                  data-bs-target="#manage-orders">
                  <i className="bi bi-cart-check d-inline-block mr-5"></i>
                  Manage Orders
                </button>
              </li>
            </ul>
          </aside>
        </section>
        <section className="col admin-right">
          <h1 className="display-4 text-center my-2">Welcome to Admin Area</h1>
          <div className="container">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="create-category"
                role="tabpanel"
                aria-labelledby="create-category-tab">
                Create. Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Hic, possimus impedit? Provident ducimus delectus eveniet,
                dolore odit modi consectetur blanditiis?
              </div>
              <div
                className="tab-pane fade"
                id="manage-categories"
                role="tabpanel"
                aria-labelledby="manage-category-tab">
                Manage. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum, nobis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Sapiente, quod.
              </div>
              <div
                className="tab-pane fade"
                id="create-product"
                role="tabpanel"
                aria-labelledby="create-product-tab">
                Manage. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum, nobis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Sapiente, quod.
              </div>
              <div
                className="tab-pane fade"
                id="manage-products"
                role="tabpanel"
                aria-labelledby="manage-product-tab">
                Manage. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum, nobis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Sapiente, quod.
              </div>
              <div
                className="tab-pane fade"
                id="manage-orders"
                role="tabpanel"
                aria-labelledby="manage-orders-tab">
                Manage. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum, nobis? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Sapiente, quod.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
);

export default AdminDashboardPage;
