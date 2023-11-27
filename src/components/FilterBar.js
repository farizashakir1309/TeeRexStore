import "../styles/_filterbar.css"
import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../GlobalStateContext';

export default function FilterBar() {
  const { state, dispatch } = useGlobalState();

  const [colorFilters, setColorFilters] = useState([]);
  const [genderFilters, setGenderFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);

  const handlePriceRangeChange = (event) => {
    const value = event.target.id;

    const [minPrice, maxPrice] = value.split('-').map(parseFloat);

    // Dispatch an action to set the price range
    dispatch({
      type: 'SET_PRICE_RANGE',
      payload: { minPrice, maxPrice },
    });
    handleCheckBoxClick('price', value, event);
  };

  const handleCheckBoxClick = (field, value, event) => {
    if (event.target.checked) {
      dispatch({
        type: 'ADD_FILTER',
        payload: { field: field, value: value },
      });
    } else {
      dispatch({
        type: 'REMOVE_FILTER',
        payload: { field: field, value: value },
      });
    }
  };

  useEffect(() => {
    const getUniqueValues = (field) => {
      const values = new Set();
      state.tshirts.forEach((tshirt) => {
        values.add(tshirt[field]);
      });
      return Array.from(values);
    };

    setColorFilters(getUniqueValues('color'));
    setGenderFilters(getUniqueValues('gender'));
    setTypeFilters(getUniqueValues('type'));
  }, [state.tshirts]);

  const uniquePriceRanges = getUniquePriceRanges(state.tshirts);

  const renderFilters = (field, filters) => (
    <section key={field}>
      <h3>{field.charAt(0).toUpperCase() + field.slice(1)}</h3>
      <ul>
        {filters.map((value) => (
          <li key={value}>
            <label htmlFor={value}>
              <input
                type="checkbox"
                id={value}
                onChange={field === 'price' ? (event) => handlePriceRangeChange(event) : (event) => handleCheckBoxClick(field, value, event)}
              />
              {value}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <aside className="filter-bar">
      <h2>Filters</h2>
      {renderFilters('color', colorFilters)}
      {renderFilters('gender', genderFilters)}
      {renderFilters('type', typeFilters)}
      {renderFilters('price', uniquePriceRanges)}
    </aside>
  );
}

const getUniquePriceRanges = (tshirts) => {
  const prices = tshirts
    .map((tshirt) => parseFloat(tshirt.price))
    .filter((price) => !isNaN(price));

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const ranges = [];
  let startRange = minPrice;

  while (startRange <= maxPrice) {
    const endRange = startRange + 100; // Adjust the range size as needed
    ranges.push(`${startRange}-${endRange}`);
    startRange = endRange + 1;
  }

  return ranges;
};
