import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";
import Sidebar from "../components/admin/sidebar";
import Home from "../components/admin/home";
import CreateCategory from "../components/admin/createCategory";
import ManageCategory from "../components/admin//manageCategories";
import CreateProduct from "../components/admin/createProduct";
import ManageProducts from "../components/admin/manageProducts";
import ManageOrders from "../components/admin/manageOrders";

const AdminDashboardPage = () => (
  <Layout>
    <Seo title="Admin Dashboard - FaShop" />
    <div className="admin-dashboard">
      <div className="row gx-0">
        <section className="col-lg-2">
          <aside className="bg-dark fixed-bottom col-lg-2 admin-left">
            <Sidebar />
          </aside>
        </section>
        <section className="col admin-right">
          <h1 className="text-center my-4">
            Welcome to <span className="text-primary">Admin Area</span>
          </h1>
          <div className="container">
            <div className="tab-content">
              <Home />
              <CreateCategory />
              <ManageCategory />
              <CreateProduct />
              <ManageProducts />
              <ManageOrders />
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
);

export default AdminDashboardPage;
