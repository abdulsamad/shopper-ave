import React from "react";

const CreateCategory = () => {
  return (
    <div
      className="tab-pane fade show"
      id="create-category"
      role="tabpanel"
      aria-labelledby="create-category-tab">
      <form className="mx-auto w-50">
        <label for="create-category-input" class="form-label">
          Enter New Category
        </label>
        <input
          type="text"
          class="form-control"
          id="create-category-input"
          placeholder="Jacket"
        />
        <button class="btn btn-primary my-3" type="submit">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
