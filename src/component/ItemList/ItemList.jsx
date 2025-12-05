import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteItem } from '../../service/ItemService';
import { AppContext } from '../../Context/AppContext';
import './ItemList.css';

const ItemList = () => {
  const { item, setItem } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const filterItem = item.filter(items =>
    items.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const deleteByItemId = async itemId => {
    try {
      const response = await deleteItem(itemId);
      if (response.status == 204) {
        const updatedItem = item.filter(items => items.itemId !== itemId);
        setItem(updatedItem);
        toast.success('item deleted successfully.');
      } else {
        toast.error('unable to delete item.');
      }
    } catch (error) {
      console.error(error);
      toast.error('something went wrong.');
    }
  };

  return (
    <div
      className="category_list_container"
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            id="keyword"
            name="keyword"
            placeholder="search by keyword"
            className="form-control"
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2 ">
        {filterItem.map((itemImg, index) => (
          <div className="col-12" key={index}>
            <div className="p-2 bg-black shadow-sm rounded-2">
              <div className="d-flex align-items-center">
                <div style={{ marginRight: '15px' }}>
                  <img
                    src={itemImg.imgUrl}
                    alt={itemImg.name}
                    className="item_image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{itemImg.name}</h5>
                  <p className="mb-0 text-white">
                    Category - {itemImg.categoryName}
                  </p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    &#8377;{itemImg.price}
                  </span>
                </div>

                <div>
                  <button
                    className=" btn btn-danger btn-sm"
                    onClick={() => deleteByItemId(itemImg.itemId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
