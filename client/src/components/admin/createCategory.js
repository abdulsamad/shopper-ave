import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateCategory = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    console.log(data);
  };

  return (
    <div className="admin-create-category">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-50">
        {submitSuccess && (
          <div className="alert alert-success" role="alert">
            <i className="bi bi-check-lg me-2" />
            Category successfully created.
          </div>
        )}
        {submitError && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-x-lg me-2" />
            Creating category failed.
          </div>
        )}
        <label htmlFor="create-category-input" className="form-label">
          Enter New Category
        </label>
        <input
          type="text"
          className={`form-control ${errors.category && "is-invalid"}`}
          id="create-category-input"
          placeholder="Jacket"
          {...register("category", {
            required: {
              value: true,
              message: "Category name is required.",
            },
          })}
        />
        {errors.category && (
          <div className="d-flex mt-1 text-danger" role="alert">
            <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
            <span>{errors.category.message}</span>
          </div>
        )}
        <button className="btn btn-primary my-3" type="submit">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
