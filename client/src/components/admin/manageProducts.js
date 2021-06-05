import React from "react";

const ManageProducts = () => {
  return (
    <section className="admin-manage-products">
      <div className="text-center">
        <h3>All Products</h3>
        <table className="table">
          <thead className="align-middle">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Stock</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            <tr>
              <th scope="row">1</th>
              <td>Mens Wear Jacket Large</td>
              <td>5</td>
              <td>
                <button type="button" className="btn btn-info text-white w-100">
                  Update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger text-white w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-product-modal">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Modal for Delete  */}
      <div className="modal fade" tabindex="-1" id="delete-product-modal">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Are you sure you want to delete this product?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
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

export default ManageProducts;
