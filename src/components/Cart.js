import React, { useState, useEffect } from 'react';
import "../styles/_cart.css";
import { useGlobalState } from '../GlobalStateContext';

export default function Cart() {
    const { state, dispatch } = useGlobalState();
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        calculateTotal();
    }, []);

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        calculateTotal();
    };

    const changeQuantity = (tshirt, newQuantity) => {
        dispatch({ type: 'CHANGE_QUANTITY', payload: { id: tshirt.id, quantity: newQuantity } });
        calculateTotal();
    };
    const calculateTotal = () => {
        let sum = 0;
        Array.from(state.cart.values()).forEach((item) => {
            sum += item.quantity * item.price;
        });
        setAmount(sum);
    }

    function Card() {
        const [showDialog, setShowDialog] = useState(false);
        const [newQuantity, setNewQuantity] = useState(1); // Initialize with the current quantity

        const handleQuantityChange = (quantity) => {
            setNewQuantity(quantity);
        };

        const handleDialogClose = () => {
            setShowDialog(false);
        };

        const handleUpdateQuantity = (tshirt) => {
            changeQuantity(tshirt, newQuantity);
            setShowDialog(false);
        };

        if (state.cart.size === 0) return <p>Your Cart Looks Empty!</p>;

        return Array.from(state.cart.values()).map((tshirt) => {
            return (
                <li key={tshirt.id}>
                    <img src={tshirt.imageURL} alt={tshirt.name} />
                    <p>{tshirt.name}</p>
                    <button onClick={() => setShowDialog(true)}>Quantity: {tshirt.quantity}</button>
                    <button onClick={() => removeFromCart(tshirt.id)}>Delete</button>
                    <p>{tshirt.price}</p>

                    {showDialog && (
                        <div className="quantity-dialog">
                            <div className="dialog-content">
                                <label htmlFor="quantity">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={newQuantity}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                />
                                <div className="button-group">
                                    <button onClick={() => handleUpdateQuantity(tshirt)}>Update</button>
                                    <button onClick={handleDialogClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            );
        });
    }

    return (
        <div className="cart-items">
            <h2>Shopping Cart</h2>
            <ul>
                <Card />
                <li className="amount">Total Amount: {amount}</li>
            </ul>
        </div>
    );
}
