import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "gatsby";

import Layout from "../components/layout/layout";
import Seo from "../components/utils/SEO";
import { signIn } from "../auth";

const LogInPage = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirect = (res) => {
    setTimeout(() => {
      res.user.role === 0 ? navigate("/dashboard") : navigate("/admin");
    }, 2000);
  };

  const onSubmit = (data) => {
    reset();
    setSubmitSuccess(false);
    setSubmitError(false);

    signIn(data)
      .then((res) => {
        setSubmitSuccess(true);
        redirect(res);
      })
      .catch(() => {
        setSubmitError(true);
      });
  };

  return (
    <Layout>
      <Seo title="LogIn - FaShop" />
      <section className="container py-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
          {submitSuccess && (
            <div className="alert alert-success" role="alert">
              <i className="bi bi-check-lg me-2" />
              Login successful. You&apos;ll be redirected in a moment.
            </div>
          )}
          {submitError && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-x-lg me-2" />
              Login unsuccessful. Email and Password did not match.
            </div>
          )}
          <div className="my-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email && "is-invalid"}`}
              id="email"
              placeholder="name@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="d-flex mt-1 text-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
                <span>Email field is required.</span>
              </div>
            )}
          </div>
          <div className="my-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password && "is-invalid"}`}
              id="password"
              placeholder="Your secure password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <div className="d-flex mt-1 text-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
                <span>Please enter a valid password.</span>
              </div>
            )}
          </div>
          <div className="my-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitSuccess}>
              Log In
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default LogInPage;
