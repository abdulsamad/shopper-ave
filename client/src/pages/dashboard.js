import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";
import { isAuthenticated } from "../auth";

const UserDashboardPage = () => {
  const [updating, setUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = isAuthenticated();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <Seo title="User Dashboard - FaShop" />
      <div className="container py-5 user-dashboard">
        <section className="card shadow-sm text-center p-2">
          <div className="card-body">
            <h2 className="my-2">Your User Profile Details</h2>
            <div className="user-image my-3">
              <img
                src="https://picsum.photos/100"
                alt="profile"
                className="rounded-pill d-block mx-auto"
              />
              {user?.role === 1 && (
                <div className=" my-4">
                  <span className="badge rounded-pill bg-primary text-uppercase">
                    Admin
                  </span>
                </div>
              )}
            </div>
            {updating ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mb-4">
                    <label
                      htmlFor="name"
                      className="col-sm-2 col-form-label fw-bold">
                      Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                        id="name"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "name is required.",
                          },
                        })}
                      />
                      {errors.name && (
                        <div className="d-flex mt-1 text-danger" role="alert">
                          <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
                          <span>{errors.name.message}</span>
                        </div>
                      )}
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
                        className={`form-control ${
                          errors.email && "is-invalid"
                        }`}
                        id="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required.",
                          },
                        })}
                      />
                      {errors.email && (
                        <div className="d-flex mt-1 text-danger" role="alert">
                          <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
                          <span>{errors.email.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mb-4">
                    <label
                      htmlFor="image"
                      className="col-sm-2 col-form-label fw-bold">
                      Profile Picture
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="image"
                        {...register("image")}
                      />
                      {errors.image && (
                        <div className="d-flex mt-1 text-danger" role="alert">
                          <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
                          <span>{errors.image.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success text-light">
                    Update Profile
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="row mb-4">
                  <label
                    htmlFor="readOnlyName"
                    className="col-sm-2 col-form-label fw-bold">
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control fst-italic"
                      id="readOnlyName"
                      value="John Doe"
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <label
                    htmlFor="readOnlyEmail"
                    className="col-sm-2 col-form-label fw-bold">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control fst-italic"
                      id="readOnlyEmail"
                      value="john@example.com"
                      readOnly
                    />
                  </div>
                </div>
                <button
                  className="btn btn-info text-light"
                  onClick={() => setUpdating((prevState) => !prevState)}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
