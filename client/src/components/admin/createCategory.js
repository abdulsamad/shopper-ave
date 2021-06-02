import React from "react";

const CreateCategory = () => {
  return (
    <div
      className="tab-pane fade show"
      id="create-category"
      role="tabpanel"
      aria-labelledby="create-category-tab">
      <form className="mx-auto w-50">
        <label htmlFor="create-category-input" className="form-label">
          Enter New Category
        </label>
        <input
          type="text"
          className="form-control"
          id="create-category-input"
          placeholder="Jacket"
        />
        <button className="btn btn-primary my-3" type="submit">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;