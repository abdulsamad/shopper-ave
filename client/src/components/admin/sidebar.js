import React from "react";
import { Link } from "@reach/router";

const isActive = ({ isCurrent }) =>
  isCurrent
    ? { className: "nav-link rounded-start-0 rounded-pill p-3 active" }
    : null;

const Sidebar = () => (
  <aside className="bg-l-gradient-dark fixed-bottom col-lg-2 admin-left">
    <ul className="nav nav-pills nav-justified flex-lg-column border-0 py-2">
      <li className="nav-item pe-2">
        <Link
          to="/admin"
          getProps={isActive}
          className="nav-link rounded-start-0 rounded-pill p-3">
          <i className="bi bi-house-door fs-5 d-inline-block me-2" />
          Home
        </Link>
      </li>
      <li className="nav-item pe-2">
        <Link
          to="/admin/create-category"
          getProps={isActive}
          className="nav-link rounded-start-0 rounded-pill p-3">
          <i className="bi bi-bookmark-plus fs-5 d-inline-block me-2" />
          Create Category
        </Link>
      </li>
      <li className="nav-item pe-2">
        <Link
          to="/admin/manage-categories"
          getProps={isActive}
          className="nav-link rounded-start-0 rounded-pill p-3">
          <i className="bi bi-bookmark fs-5 d-inline-block me-2" />
          Manage Categories
        </Link>
      </li>
      <li className="nav-item pe-2">
        <Link
          to="/admin/create-product"
          getProps={isActive}
          className="nav-link rounded-start-0 rounded-pill p-3">
          <i className="bi bi-plus-circle fs-5 d-inline-block me-2" />
          Create Product
        </Link>
      </li>
      <li className="nav-item pe-2">
        <Link
          to="/admin/manage-products"
          getProps={isActive}
          className="nav-link rounded-start-0 rounded-pill p-3">
          <i className="bi bi-wrench fs-5 d-inline-block me-2" />
          Manage Products
        </Link>
      </li>
      <li className="nav-item pe-2">
        <Link
          to="/admin/manage-orders"
          getProps={isActive}
          className="nav-link rounded-start-0 rounded-pill p-3">
          <i className="bi bi-cart-check fs-5 d-inline-block me-2"></i>
          Manage Orders
        </Link>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
