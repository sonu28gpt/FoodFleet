import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    const { cartItems, addToCart, removeFromCart, url , currency } = useContext(StoreContext);

    // Validate props to prevent runtime errors
    if (!id || !name || !price || !image) {
        console.error("FoodItem is missing required props:", { id, name, price, image });
        return <div className="food-item-error">Invalid food item data</div>;
    }

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img
                    className="food-item-image"
                    src={image}
                    alt={name}
                    onError={(e) => {
                        e.target.src = assets.default_image; // Fallback image if the URL fails
                    }}
                />
                {!cartItems[id] ? (
                    <img
                        className="add"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            src={assets.remove_icon_red}
                            onClick={() => removeFromCart(id)}
                            alt="Remove from cart"
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            src={assets.add_icon_green}
                            onClick={() => addToCart(id)}
                            alt="Add more"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="food-item-desc">{desc || "No description available"}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
