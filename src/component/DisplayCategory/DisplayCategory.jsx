/* eslint-disable react/prop-types */
import { assets } from '../../assets/assets..js';
import Category from '../Category/Category.jsx';
import './DisplayCategory.css';
import React from 'react';

const DisplayCategory = ({ categories, selectedCategories, setSelectedCategories }) => {
  return (
    <div className="row g-3" style={{ width: '100%', margin: '0' }}>
      <div className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
        <Category
          categoryName="All"
          imgUrl={assets.allThingsImage}
          numberOfItems={categories.reduce((sum, c) => sum + (c.items || 0), 0)}
          bgColor="#2a5c88ff"
          isSelected={selectedCategories === null}
          onClick={() => setSelectedCategories(null)}
        />
      </div>
      {categories.map(e => (
        <div key={e.categoryId} className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
          <Category
            categoryName={e.name}
            imgUrl={e.imgUrl}
            numberOfItems={e.items}
            bgColor={e.bgColor}
            isSelected={selectedCategories === e.categoryId}
            onClick={() => setSelectedCategories(e.categoryId)}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayCategory;
