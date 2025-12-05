import { AppContext } from '../../Context/AppContext';
import Item from '../Item/Item';
import SearchBox from '../SearchBox/SearchBox';
import './DisplayItem.css';

import React, { useContext, useState } from 'react';

// eslint-disable-next-line react/prop-types
const DisplayItem = ({ selectedCategories }) => {
  const { item } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  const filterItem = item
    .filter(items => {
      if (!selectedCategories) return true;
      else return items.categoryId === selectedCategories;
    })
    .filter(items =>
      items.name.toLowerCase().includes(searchText.toLowerCase())
    );
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center ">
        <div></div>
        <div>
          <SearchBox onSearch={setSearchText} />
        </div>
      </div>
      <div className="row g-3">
        {filterItem.map((everyItem, index) => (
          <div key={index} className="col-md-4 col-sm-6">
            <Item
              itemName={everyItem.name}
              itemPrice={everyItem.price}
              itemImage={everyItem.imgUrl}
              itemId={everyItem.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItem;
