import React from "react";

const ManageProducts = () => {
  return (
    <div className="admin-manage-products">
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
                  className="btn btn-danger text-white w-100">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
