import "./styles.css";
import Home from "./components/Home";
import Cart from "./components/Cart.js";
import Nav from "./components/Nav";
import { Routes, Route} from 'react-router-dom';
import {useState, useEffect} from "react";
import { GlobalStateProvider } from './GlobalStateContext';

export default function App() {
  const [data, setData] = useState({});

  const fetchData = () => {
    fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
    .then((response)=> response.json() )
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.log(error));
  }

  useEffect(()=> {
    fetchData();
  },[]);

  return (
    <GlobalStateProvider>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/*" element={<Home data={data}/>} />
          <Route path="/home" element={<Home data={data}/>} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </GlobalStateProvider>
  );
}
