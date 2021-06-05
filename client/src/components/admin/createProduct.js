import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateProduct = () => {
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
    <div className="admin-create-product">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-50">
        {submitSuccess && (
          <div className="alert alert-success" role="alert">
            <i className="bi bi-check-lg me-2" />
            Product successfully created.
          </div>
        )}
        {submitError && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-x-lg me-2" />
            Creating product failed.
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="create-product-input-image" className="form-label">
            Product Image
          </label>
          <input
            className={`form-control ${errors.image && "is-invalid"}`}
            type="file"
            id="create-product-input-image"
            {...register("image", {
              required: {
                value: true,
                message: "Product image is required.",
              },
            })}
          />
          {errors.image && (
            <div className="d-flex mt-1 text-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
              <span>{errors.image.message}</span>
            </div>
          )}
        </div>
        <div className="my-3">
          <label htmlFor="create-product-input-name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            id="create-product-input-name"
            placeholder="Mens Jacket Large"
            {...register("name", {
              required: {
                value: true,
                message: "Product name is required.",
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
          <label htmlFor="create-product-description" className="form-label">
            Product Description
          </label>
          <textarea
            className={`form-control ${errors.description && "is-invalid"}`}
            id="create-product-description"
            placeholder="Enter product description here"
            rows="5"
            {...register("description", {
              required: {
                value: true,
                message: "Product description is required.",
              },
            })}
          />
          {errors.description && (
            <div className="d-flex mt-1 text-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
              <span>{errors.description.message}</span>
            </div>
          )}
        </div>
        <div className="my-3">
          <label htmlFor="create-product-input-price" className="form-label">
            Price
          </label>
          <div className="input-group mb-3">
            <span
              className={`input-group-text ${
                errors.price && "text-danger border-danger"
              }`}
              id="create-product-input-price">
              &#36;
            </span>
            <input
              type="number"
              className={`form-control ${errors.price && "is-invalid"}`}
              id="create-product-input-price"
              placeholder="20"
              aria-label="Price"
              aria-describedby="create-product-input-price"
              {...register("price", {
                required: {
                  value: true,
                  message: "Product price is required.",
                },
              })}
            />
          </div>
          {errors.price && (
            <div className="d-flex mt-1 text-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
              <span>{errors.price.message}</span>
            </div>
          )}
        </div>
        <div className="my-3">
          <label htmlFor="create-product-input-select" className="form-label">
            Category
          </label>
          <select
            className={`form-select ${errors.category && "is-invalid"}`}
            id="create-product-input-select"
            aria-label="select category"
            defaultValue="general"
            {...register("category", {
              required: {
                value: true,
                message: "Product category is required.",
              },
            })}>
            <option value="general">General</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          {errors.category && (
            <div className="d-flex mt-1 text-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
              <span>{errors.category.message}</span>
            </div>
          )}
        </div>
        <div className="my-3">
          <label htmlFor="create-product-input-stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className={`form-control ${errors.stock && "is-invalid"}`}
            id="create-product-input-stock"
            placeholder="Mens Jacket Large"
            {...register("stock", {
              required: {
                value: true,
                message: "Product stock is required.",
              },
            })}
          />
          {errors.stock && (
            <div className="d-flex mt-1 text-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2 " />
              <span>{errors.stock.message}</span>
            </div>
          )}
        </div>
        <button className="btn btn-primary my-3" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
