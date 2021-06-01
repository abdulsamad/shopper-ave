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
            <td>4.5</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>4.5</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>4.5</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>4.5</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>4.5</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>MKBHD Hoodie</td>
            <td>Jacket</td>
            <td>4.5</td>
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
      <div className="row my-5">
        {recentlyJointUsers}

        {topRatedProduct}
      </div>
    </div>
  );
};

export default Home;
