import { createContext, useContext, useReducer } from "react";

const GlobalStateContext = createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
  const initialState = {
    tshirts: [], // Your list of T-shirts
    filteredTshirts: [], // T-shirts currently displayed after applying filters
    filters: {}, // Object to store applied filters
    cart: new Map(), // Initialize cart as a Map
    minPrice: 0,
    maxPrice: 1000,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          tshirts: action.payload,
          filteredTshirts: action.payload,
        };
      case 'SEARCH':
        const searchedTshirts = searchTshirts(state.tshirts, action.payload);
        return {
          ...state,
          filters: {},
          filteredTshirts: searchedTshirts,
        };
      case 'SET_PRICE_RANGE':
        const { minPrice, maxPrice } = action.payload;
        const updatedPriceRange = {
          ...state,
          minPrice,
          maxPrice,
        };
        return {
          ...updatedPriceRange
        };

      case 'ADD_TO_CART':
        const { id } = action.payload;
        if (!state.cart.has(id)) {
          const updatedCart = new Map(state.cart);
          updatedCart.set(id, action.payload);
          return { ...state, cart: updatedCart };
        } else {
          console.warn(
            'Item already in the cart. Consider updating quantity or showing a message.'
          );
          return state;
        }
      case 'CHANGE_QUANTITY':
        const changedCart = new Map(state.cart);
        changedCart.get(action.payload.id).quantity = action.payload.quantity;
        return {...state, cart: changedCart};

      case 'REMOVE_FROM_CART':
        const updatedCart = new Map(state.cart);
        updatedCart.delete(action.payload);
        return { ...state, cart: updatedCart };

      case 'ADD_FILTER':
        const { field: addField, value: addValue } = action.payload;
        const addedFilters = { ...state.filters, [addField]: addValue };
        const addedFilteredTshirts = filterTshirts(
          state.tshirts,
          addedFilters
        );
        return {
          ...state,
          filters: addedFilters,
          filteredTshirts: addedFilteredTshirts,
        };

      case 'REMOVE_FILTER':
        const { field: removeField } = action.payload;
        const {
          [removeField]: removedFilter,
          ...remainingFilters
        } = state.filters;
        const remainingFilteredTshirts = filterTshirts(
          state.tshirts,
          remainingFilters
        );
        return {
          ...state,
          filters: remainingFilters,
          filteredTshirts: remainingFilteredTshirts,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Adjust the filterTshirts function
const filterTshirts = (tshirts, filters) => {
    return tshirts.filter((tshirt) => {
        return Object.entries(filters).every(([field, value]) => {
        if (field === 'price') {
            const price = parseFloat(tshirt[field]);
            const [minPrice, maxPrice] = value.split('-').map(parseFloat);
            return isNaN(price) || (price >= minPrice && price <= maxPrice);
        } else {
            return tshirt[field] === value;
        }
        });
    });
};
const searchTshirts = (tshirts, searchText) => {
  if(searchText === '') return tshirts;
  return tshirts.filter((tshirt) => {
    if(searchText.toLowerCase().includes(tshirt.name.toLowerCase()) || 
      searchText.toLowerCase().includes(tshirt.color.toLowerCase()) || 
      searchText.toLowerCase().includes(tshirt.type.toLowerCase())) {
      return tshirt;
    }
  });
};


export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
