import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTransition, useTrail, animated } from "react-spring";
import { Link } from "gatsby";

const data = [0, 0, 0, 0, 0, 0, 0].fill({
  name: "Awesome T-Shirt",
  quantity: 5,
});

const Cart = ({ cartToggle, setCartToggle }) => {
  const [trail, api] = useTrail(data.length, () => ({
    opacity: 0,
    transform: "translateY(20px)",
  }));

  const cartTransition = useTransition(cartToggle, {
    from: { opacity: 0, transform: "translateX(450px)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(450px)" },
    reverse: cartToggle,
  });

  useEffect(() => {
    cartToggle
      ? api.start({ opacity: 1, transform: "translateY(0px)" })
      : api.start({ opacity: 0, transform: "translateY(-20px)" });
  }, [cartToggle, api]);

  return cartTransition(
    (styles, item) =>
      item && (
        <animated.section
          style={styles}
          className="cart position-fixed overflow-hidden shadow">
          <div className="card rounded-3">
            <header className="card-header bg-dark text-white p-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <span className="fs-4">My Cart</span>
                  <small className="badge bg-light text-dark ms-3 rounded-pill">
                    {data.length} Items
                  </small>
                </h5>
                <button
                  className="btn btn-dark"
                  onClick={() => setCartToggle(false)}>
                  <i className="bi bi-x-lg" />
                </button>
              </div>
            </header>
            <div className="card-body px-3">
              <ul className="list-group">
                {trail.map((styles, index) => (
                  <animated.li
                    style={styles}
                    key={index}
                    className="list-group-item shadow-sm rounded-3 position-relative cart-item">
                    <div className="row g-0">
                      <div className="col-3">
                        <img
                          src="https://picsum.photos/60"
                          alt="product"
                          height={60}
                          width={60}
                          className="img-thumbnail"
                        />
                      </div>
                      <div className="col-9 d-flex align-items-center">
                        <div className="card-body p-0">
                          <h5 className="card-title mb-0">
                            {data[index]["name"]}
                          </h5>
                          <p className="card-text">
                            <small className="text-muted">
                              Quantity: {data[index]["quantity"]}
                            </small>
                            &nbsp;
                            <small className="text-muted ms-2">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(1000)}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="delete-btn btn btn-sm position-absolute rounded-pill border border-1">
                      <i className="bi bi-dash-lg" />
                    </button>
                  </animated.li>
                ))}
              </ul>
            </div>
            <footer className="card-footer shadow-sm">
              <div className="fst-italic d-flex align-items-center justify-content-between">
                <span className="fs-4 fw-light">Total:</span>
                <h6 className="mb-0 ms-2 fs-4 px-2 text-muted">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(1000)}
                </h6>
              </div>
              <Link
                to="/checkout"
                className="checkout-btn btn btn-outline-dark w-100 p-2 fs-4 border border-2 my-2">
                <i className="bi bi-box-arrow-right me-2" />
                Checkout
              </Link>
            </footer>
          </div>
        </animated.section>
      ),
  );
};

Cart.propTypes = {
  cartToggle: PropTypes.bool.isRequired,
  setCartToggle: PropTypes.func.isRequired,
};

export default Cart;
