import React, { useContext, useState } from 'react';
import { addItem } from '../../service/ItemService';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets.';
import { AppContext } from '../../Context/AppContext';

const ItemForm = () => {
  const { categories, item, setItem, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    categoryId: '',
    price: '',
    description: '',
  });

  const onSubmitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('item', JSON.stringify(data));
    formData.append('file', image);
    try {
      if (!image) {
        toast.error('Please select image.');
        return;
      }
      const response = await addItem(formData);
      if (response.status === 200) {
        setItem([...item, response.data]);
        setCategories(prevCategory =>
          prevCategory.map(cate =>
            cate.categoryId === data.categoryId
              ? { ...cate, items: cate.items + 1 }
              : cate
          )
        );
        toast.success('item added successfully.');

        setData({
          name: '',
          categoryId: '',
          price: '',
          description: '',
        });
        setImage(false);
      } else {
        toast.error('unable to add category.');
      }
    } catch (e) {
      console.error(e);
      toast.error('Error adding item in category.');
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setData(data => ({ ...data, [name]: value }));
  };

  return (
    <div
      className="item-form-container"
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container ">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-1">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={e => setImage(e.target.files[0])}
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
                    onChange={onChangeHandler}
                    value={data.name}
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="category"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                  >
                    <option value="">-- select category--</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
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
                    onChange={onChangeHandler}
                    value={data.price}
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
                    onChange={onChangeHandler}
                    value={data.description}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3 "
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-grow spinner-grow-sm me-2"></span>
                    </>
                  ) : (
                    'save'
                  )}
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
