/* eslint-disable react/prop-types */
import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { fetchCategory } from '../service/CategoryService';
import { getItem } from '../service/ItemService';

export const AppContext = createContext(null);

export const AppContextProvider = props => {
  const [item, setItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({ token: [], role: [] });
  const [cartItem, setCartItem] = useState([]);

  const addToCart = items => {
    const existingItem = cartItem.find(cart => cart.name === items.name);
    if (existingItem) {
      setCartItem(
        cartItem.map(cart =>
          cart.name === items.name
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        )
      );
    } else {
      setCartItem([...cartItem, { ...items, quantity: 1 }]);
    }
  };

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem('token') && localStorage.getItem('role')) {
        SetAuthData(
          localStorage.getItem('token'),
          localStorage.getItem('role')
        );
      }
      const response = await fetchCategory();
      const itemResponse = await getItem();
      setCategories(response.data);
      setItem(itemResponse.data);
    }
    loadData();
  }, []);

  const SetAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const removeCart = itemId => {
    setCartItem(cartItem.filter(i => i.itemId !== itemId));
  };

  const updateCart = (itemId, newQuantity) => {
    setCartItem(
      cartItem.map(i =>
        i.itemId === itemId ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    SetAuthData,
    item,
    setItem,
    addToCart,
    cartItem,
    removeCart,
    updateCart,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
