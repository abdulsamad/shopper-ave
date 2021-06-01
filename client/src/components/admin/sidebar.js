import React from "react";

const sidebar = () => (
  <ul
    className="nav nav-pills nav-justified flex-lg-column border-0 py-2"
    role="tablist">
    <li className="nav-item pe-2" role="presentation">
      <button
        type="button"
        className="nav-link rounded-start-0 rounded-pill p-3 active"
        data-bs-toggle="tab"
        data-bs-target="#admin-home"
        aria-current="page">
        <i className="bi bi-house-door fs-5 d-inline-block me-2" />
        Home
      </button>
    </li>
    <li className="nav-item pe-2" role="presentation">
      <button
        type="button"
        className="nav-link rounded-start-0 rounded-pill p-3"
        data-bs-toggle="tab"
        data-bs-target="#create-category">
        <i className="bi bi-bookmark-plus fs-5 d-inline-block me-2" />
        Create Category
      </button>
    </li>
    <li className="nav-item pe-2" role="presentation">
      <button
        type="button"
        className="nav-link rounded-start-0 rounded-pill p-3"
        data-bs-toggle="tab"
        data-bs-target="#manage-categories">
        <i className="bi bi-bookmark fs-5 d-inline-block me-2" />
        Manage Categories
      </button>
    </li>
    <li className="nav-item pe-2" role="presentation">
      <button
        type="button"
        className="nav-link rounded-start-0 rounded-pill p-3"
        data-bs-toggle="tab"
        data-bs-target="#create-product">
        <i className="bi bi-plus-circle fs-5 d-inline-block me-2" />
        Create Product
      </button>
    </li>
    <li className="nav-item pe-2" role="presentation">
      <button
        type="button"
        className="nav-link rounded-start-0 rounded-pill p-3"
        data-bs-toggle="tab"
        data-bs-target="#manage-products">
        <i className="bi bi-wrench fs-5 d-inline-block me-2" />
        Manage Products
      </button>
    </li>
    <li className="nav-item pe-2" role="presentation">
      <button
        type="button"
        className="nav-link rounded-start-0 rounded-pill p-3"
        data-bs-toggle="tab"
        data-bs-target="#manage-orders">
        <i className="bi bi-cart-check fs-5 d-inline-block me-2"></i>
        Manage Orders
      </button>
    </li>
  </ul>
);

export default sidebar;
