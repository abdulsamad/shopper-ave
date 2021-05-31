import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/SEO";
import { signUp, signIn } from "../auth";

const SignUpPage = () => {
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

    signUp(data)
      .then(({ email }) => {
        if (email === data.email) {
          setSubmitSuccess(true);
          signIn(data).then((res) => {
            redirect(res);
          });
        }
      })
      .catch(() => {
        setSubmitError(true);
      });
  };

  return (
    <Layout>
      <Seo title="SignUp - FaShop" />
      <section className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-4">
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
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John Doe"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name field is required.",
                },
                minLength: {
                  value: 3,
                  message: "Name should be minimum 3 characters.",
                },
                maxLength: {
                  value: 32,
                  message: "Name should be maximum 32 characters long.",
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
          <div className="my-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
              id="password"
              placeholder="Your secure password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password field is required.",
                },
                minLength: {
                  value: 8,
                  message: "Password should be minimum 8 characters long.",
                },
              })}
            />
            {errors.password && (
              <div className="d-flex mt-1 text-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default SignUpPage;
