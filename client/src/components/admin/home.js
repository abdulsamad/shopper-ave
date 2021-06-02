import React from "react";

const Home = () => {
  const topStats = (
    <div className="row">
      <div className="col">
        <div className="card shadow rounded-3 border-0 border-start border-primary border-5">
          <div className="card-body text-center">
            <h4 className="card-title">Total Registered Users</h4>
            <p className="card-text display-4 text-secondary">
              {new Intl.NumberFormat().format(20000)}
            </p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow rounded-3 border-0 border-start border-primary border-5">
          <div className="card-body text-center">
            <h4 className="card-title">Total Items Ordered</h4>
            <p className="card-text display-4 text-secondary">
              {new Intl.NumberFormat().format(10000)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const recentlyJointUsers = (
    <div className="col">
      <table className="table table-striped table-hoverable table-bordered text-center caption-top">
        <caption>Recently Joined users</caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>John Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Sam Smith</td>
            <td>sam@example.com</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const adminDetails = (
    <div className="col">
      <div className="card shadow-sm border-0 admin-details">
        <header className="card-header bg-primary border-0 position-relative d-flex align-items-center">
          <h5 className="card-title m-0">
            <i class="bi bi-person" /> Profile Details
          </h5>
          <img
            className="rounded-pill position-absolute"
            src="https://picsum.photos/70"
            alt="admin-profile"
          />
        </header>
        <div className="card-body d-flex align-items-center">
          <p className="card-text">
            <div className="fs-5">
              <strong className="fw-normal">Name:&nbsp;</strong>
              <em>John Doe</em>
            </div>
            <div className="fs-5">
              <strong className="fw-normal">Email:&nbsp;</strong>
              <em>john@example.com</em>
            </div>
            <span className="badge bg-danger fs-6 mt-3 rounded-pill">
              Admin Area
            </span>
          </p>
        </div>
        <footer className="card-footer">
          <button
            type="button"
            className="btn btn-outline-dark text-center w-100">
            Update Profile
          </button>
        </footer>
      </div>
    </div>
  );

  const topRatedProduct = (
    <div className="col">
      <table className="table table-striped table-hoverable table-bordered text-center caption-top">
        <caption>Top Rated Products</caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Ratings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>
              4.5&nbsp;
              <i class="bi bi-star-fill" />
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>
              none &nbsp;
              <i class="bi bi-star" />
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>
              4.5&nbsp;
              <i class="bi bi-star-fill" />
            </td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>
              4.5&nbsp;
              <i class="bi bi-star-fill" />
            </td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>
              4.5&nbsp;
              <i class="bi bi-star-fill" />
            </td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>
              4.5&nbsp;
              <i class="bi bi-star-fill" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div
      className="tab-pane fade show active"
      id="admin-home"
      role="tabpanel"
      aria-labelledby="home-tab">
      {topStats}
      <div className="row mt-5 mb-2">
        {recentlyJointUsers}
        {adminDetails}
      </div>
      <div className="row">
        <div className="col"></div>
        {topRatedProduct}
      </div>
    </div>
  );
};

export default Home;
