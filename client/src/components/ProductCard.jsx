import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({product}) => {
    const {currency,addToCart,removeFromCart,cartItems,navigate}=useAppContext()

    return product &&(
        <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()} /${product._id}`); scrollTo(0,0)}} className="border border-gray-500/20 rounded-md px-2 sm:px-3 md:px-4 py-2 bg-white w-full">
            <div className="group cursor-pointer flex items-center justify-center px-1 sm:px-2">
                <img className="group-hover:scale-105 transition max-w-20 sm:max-w-24 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-xs sm:text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5 my-1">
                    {Array(5).fill('').map((_, i) => (
                       <img key={i} className="w-3 sm:w-3.5" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" />
                    ))}
                    <p className="text-xs sm:text-sm">(4)</p>
                </div>
                <div className="flex items-end justify-between gap-2 mt-3">
                    <p className="text-sm sm:text-base md:text-xl font-medium text-pink-500">
                        {currency}{product.offerPrice}{" "} 
                        <span className="text-gray-500/60 text-xs sm:text-xs md:text-sm line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e)=>{e.stopPropagation();}} className="text-pink-500">
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-pink-100 border border-pink-300 w-14 sm:w-16 md:w-20 h-8 sm:h-9 md:h-[34px] rounded text-xs sm:text-sm text-pink-600 cursor-pointer whitespace-nowrap" onClick={() => addToCart(product._id)} >
                                <img src={assets.cart_icon} alt="cart_icon" className="w-3 sm:w-4" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-1 sm:gap-2 w-14 sm:w-16 md:w-20 h-8 sm:h-9 md:h-[34px] bg-pink-500/25 rounded select-none">
                                <button onClick={() =>{removeFromCart(product._id)} } className="cursor-pointer text-sm sm:text-base px-1 sm:px-2 h-full" >
                                    -
                                </button>
                                <span className="w-4 sm:w-5 text-center text-xs sm:text-sm">{cartItems[product._id]}</span>
                                <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-sm sm:text-base px-1 sm:px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;