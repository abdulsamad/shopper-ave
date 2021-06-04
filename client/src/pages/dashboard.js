import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";
import { isAuthenticated } from "../auth";

const UserDashboardPage = () => {
  const { user } = isAuthenticated();

  return (
    <Layout>
      <Seo title="User Dashboard - FaShop" />
      <div className="container py-5">
        <section className="card shadow-sm text-center p-2">
          <div className="card-body">
            <h2 className="my-2">Your User Profile Details</h2>
            <form>
              <div className="user-image my-3">
                <img
                  src="https://picsum.photos/100"
                  alt="profile"
                  className="rounded-pill"
                />
                {user.role === 1 && (
                  <div className="my-4">
                    <span className="badge rounded-pill bg-primary text-uppercase">
                      Admin
                    </span>
                  </div>
                )}
              </div>
              <div className="row mb-4">
                <label
                  htmlFor="name"
                  className="col-sm-2 col-form-label fw-bold">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control fst-italic"
                    id="name"
                    value="John Doe"
                    readonly
                  />
                </div>
              </div>
              <div className="row mb-4">
                <label
                  htmlFor="email"
                  className="col-sm-2 col-form-label fw-bold">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control fst-italic"
                    id="email"
                    value="john@example.com"
                    readonly
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
