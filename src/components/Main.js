import "../styles/_main.css";
import { useGlobalState } from '../GlobalStateContext';

export default function Main() {
  const { state, dispatch } = useGlobalState();
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  function Cards() {
    return state.filteredTshirts.map((tshirt) => {
      return (
        <div id={tshirt.id} className="card" key={tshirt.id}>
            <div className="card-wrapper">
                <p>{tshirt.name}</p>
                <img src={tshirt.imageURL} />
                <div>
                    <p>Rs. {tshirt.price}</p>
                    <button onClick={() => addToCart(tshirt)}> Add To Cart</button>
                </div>
            </div>
        </div>
      );
    });
  }
  return (
    <section className="main-content">
        <Cards />
    </section>
  );
}
