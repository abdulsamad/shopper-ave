import React from "react";
import PropTypes from "prop-types";

const Cart = ({ cartToggle }) => {
  return (
    <section
      className={`cart position-fixed overflow-hidden ${
        cartToggle ? "visible cart__in-anim" : "invisible cart__out-anim"
      }`}>
      <div className="card rounded-3 shadow">
        <header className="card-header bg-dark text-white p-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fs-4">My Cart</h5>
            <h6 className="mb-0 fs-4 fw-bold fst-italic">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(1000)}
            </h6>
          </div>
        </header>
        <div className="card-body px-3">
          <ul className="list-group">
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item shadow-sm rounded-3">
              <div className="row g-0">
                <div className="col-3">
                  <img
                    src="https://picsum.photos/60"
                    alt="product"
                    className="img-thumbnail"
                  />
                </div>
                <div className="col-9 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-0">Awesome T-Shirt</h5>
                    <p className="card-text">
                      <small className="text-muted">Quantity: {4}</small>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <footer className="card-footer p-0 shadow-sm">
          <button className="btn w-100 p-2 fs-4">
            <i className="bi bi-box-arrow-right me-2" />
            Checkout
          </button>
        </footer>
      </div>
    </section>
  );
};

Cart.propTypes = {
  cartToggle: PropTypes.bool.isRequired,
};

export default Cart;
