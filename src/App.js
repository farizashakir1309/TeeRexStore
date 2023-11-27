import "./styles.css";
import { Routes, Route} from 'react-router-dom';
import {useState, useEffect} from "react";

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
      <div className="App">
        <Routes>
        </Routes>
      </div>
  );
}
