import React from 'react';

const UserForm = () => {
  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form action="">
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="yourname@gmail.com"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="*******************"
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary w-100">
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
