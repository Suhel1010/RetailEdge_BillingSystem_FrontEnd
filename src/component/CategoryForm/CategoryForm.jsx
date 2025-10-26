import React from 'react';

const CategoryForm = () => {
  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form action="">
              <div className="mb-1">
                <label htmlFor="image" className="form-label">
                  <img src="https://placehold.co/48x48" alt="" width={48} />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  hidden
                />
              </div>
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="category name"
                />
              </div>
              <div className="mb-1">
                <label htmlFor="name" className="form-label">
                  Description
                </label>
                <textarea
                  rows={5}
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="write description here ... "
                />
              </div>
              <div className="mb-1">
                <label htmlFor="bgcolor" className="form-label">
                  Background Color
                </label>
                <br />
                <input
                  type="color"
                  name="bgcolor"
                  id="bgcolor"
                  placeholder="#ffffff"
                />
              </div>
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

export default CategoryForm;
