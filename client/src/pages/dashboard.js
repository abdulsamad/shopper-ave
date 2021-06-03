import React from "react";
import {} from "@reach/router";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";

const UserDashboardPage = () => (
  <Layout>
    <Seo title="User Dashboard - FaShop" />
    <div className="container py-5">
      <section className="card shadow-sm text-center p-2">
        <div className="card-body">
          <h2 className="my-2">Your User Profile Details</h2>
          <div className="user-image my-3">
            <img
              src="https://picsum.photos/100"
              alt="profile"
              className="rounded-pill"
            />
          </div>
          <div className="user-name fs-5 mb-2 mt-4">
            <strong>Name:&nbsp;</strong>
            <span className="fst-italic">John Doe</span>
          </div>
          <div className="user-email fs-5 my-2">
            <strong>Email:&nbsp;</strong>
            <span className="fst-italic">john@example.com</span>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export default UserDashboardPage;
