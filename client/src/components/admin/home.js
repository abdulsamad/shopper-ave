import React from "react";

const home = () => {
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

  const recentUsers = (
    <div className="col">
      <table className="table table-striped table-hoverable table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry the Bird</td>
            <td>@twitter</td>
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
        {recentUsers}
        <div className="col"></div>
      </div>
    </div>
  );
};

export default home;
