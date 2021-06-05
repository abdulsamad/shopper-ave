import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSpring, useTrail, animated } from "react-spring";

const data = [0, 0, 0, 0, 0].fill({
  name: "Awesome T-Shirt",
  quantity: 5,
});

const Cart = ({ cartToggle }) => {
  const [trail, api] = useTrail(data.length, () => ({
    opacity: 0.5,
    transform: "translateY(5px)",
  }));

  const styles = useSpring({
    opacity: cartToggle ? 1 : 0,
    transform: cartToggle ? "translateX(0px)" : "translateX(40px)",
  });

  useEffect(() => {
    cartToggle
      ? api.start({ opacity: 1, transform: "translateY(0px)" })
      : api.start({ opacity: 0.5, transform: "translateY(-5px)" });
  }, [cartToggle, api]);

  return (
    cartToggle && (
      <animated.section
        style={styles}
        className="cart position-fixed overflow-hidden shadow">
        <div className="card rounded-3">
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
              {trail.map((styles, index) => (
                <animated.li
                  style={styles}
                  key={index}
                  className="list-group-item shadow-sm rounded-3">
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
                        <h5 className="card-title mb-0">
                          {data[index]["name"]}
                        </h5>
                        <p className="card-text">
                          <small className="text-muted">
                            Quantity: {data[index]["quantity"]}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </animated.li>
              ))}
            </ul>
          </div>
          <footer className="card-footer p-0 shadow-sm">
            <button className="checkout-btn btn w-100 p-2 fs-4">
              <i className="bi bi-box-arrow-right me-2" />
              Checkout
            </button>
          </footer>
        </div>
      </animated.section>
    )
  );
};

Cart.propTypes = {
  cartToggle: PropTypes.bool.isRequired,
};

export default Cart;
