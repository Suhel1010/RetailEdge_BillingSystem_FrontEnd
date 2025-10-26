import React from 'react';

const ItemForm = () => {
  return (
    <div
      className="item-form-container"
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
    >
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
                    placeholder="Product Name"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="form-control"
                  >
                    <option value="">-- select category--</option>
                    <option value="category 1">category 1</option>
                    <option value="category 1">category 1</option>
                  </select>
                </div>
                <div className="mb-1">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="&#8377;200.00"
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

                <button type="submit" className="btn btn-primary w-100">
                  save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
