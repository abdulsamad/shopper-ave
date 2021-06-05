import React from "react";

const ManageOrders = () => {
  return (
    <section className="admin-manage-orders">
      <div className="text-center">
        <h3>All Orders</h3>
        <table className="table">
          <thead className="align-middle">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th colSpan={2}>Actions</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            <tr>
              <th scope="row">1</th>
              <td>John Doe</td>
              <td>Mens Wear Jacket Large</td>
              <td>5</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info text-white w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#more-info-modal">
                  More Info
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger text-white w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-order-modal">
                  Cancel
                </button>
              </td>
              <td>Delivered</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>John Doe</td>
              <td>Mens Wear Jacket Large</td>
              <td>5</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info text-white w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#more-info-modal">
                  More Info
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger text-white w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-order-modal">
                  Cancel
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-outline-success w-100">
                  <i className="bi bi-check" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Modal for More Info and Delete */}
      <div className="modal fade" tabindex="-1" id="more-info-modal">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Infromation</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" tabindex="-1" id="delete-order-modal">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Are you sure you want to cancel order?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                No
              </button>
              <button type="button" className="btn btn-danger text-white">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageOrders;
