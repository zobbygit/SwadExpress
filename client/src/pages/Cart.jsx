import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";
const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,user,setCartItems
  } = useAppContext();
  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };


const getUserAddress=async ()=>{
  try {
    const {data}=await axios.get('/api/address/get')
    if(data.success){
      setAddresses(data.addresses)
      if(data.addresses.length > 0){
        setSelectedAddress(data.addresses[0])
      }
      
    }

    else{
        toast.error(data.message)
      }
  } catch (error) {
        toast.error(error.message)
    
  }
}

const placeOrder = async ()=>{
try {
  if(!selectedAddress){
    return toast.error("Please Select an Address")
  }
if(paymentOption === "COD"){
  const {data}=await axios.post('/api/order/cod',{
    userId:user._id,
    items:cartArray.map(item=>({product:item._id,quantity:item.quantity})),
    address:selectedAddress._id
  })

  if(data.success){
toast.success(data.message)
setCartItems({})
navigate('/my-orders')
  }else{
    toast.error(data.message)
  }
}

else{
   const {data}=await axios.post('/api/order/stripe',{
    userId:user._id,
    items:cartArray.map(item=>({product:item._id,quantity:item.quantity})),
    address:selectedAddress._id
  })

  if(data.success){
window.location.replace(data.url)
  }else{
    toast.error(data.message)
  }
}



} catch (error) {
    toast.error(error.message)
  
}
}

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);


useEffect(()=>{
  if(user){
    getUserAddress()
  }
},[user])

  return products.length > 0 && cartItems ? (
    <div className="mt-16 px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl sm:text-3xl font-medium mb-4 sm:mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-pink-500">{getCartCount()} Items</span>
          </h1>

          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            {cartArray.map((product, index) => (
              <div key={index}>
                {/* Mobile View */}
                <div className="md:hidden bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-3 mb-3">
                    <div
                      onClick={() =>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`) ; scrollTo(0,0)}}
                      className="cursor-pointer w-20 h-20 flex items-center justify-center border border-gray-300 rounded overflow-hidden hover:shadow-md transition flex-shrink-0"
                    >
                      <img
                        className="max-w-full h-full object-cover"
                        src={product.image[0]}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base truncate">{product.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">Weight: {product.weight || "N/A"}</p>
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        {currency}{product.offerPrice * product.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <p className="text-sm">Qty:</p>
                      <select 
                        onChange={e => updateCartItem(product._id, Number(e.target.value))}
                        value={cartItems[product._id]}
                        className="outline-none border border-gray-300 px-2 py-1 text-sm rounded cursor-pointer"
                      >
                        {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9)
                          .fill("")
                          .map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                    <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer">
                      <img src={assets.remove_icon} className="w-5 h-5" alt="remove" />
                    </button>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-base font-medium py-4 border-b">
                  <div className="flex items-center gap-6">
                    <div
                      onClick={() =>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`) ; scrollTo(0,0)}}
                      className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden hover:shadow-md transition flex-shrink-0"
                    >
                      <img
                        className="max-w-full h-full object-cover"
                        src={product.image[0]}
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-base">{product.name}</p>
                      <div className="font-normal text-gray-500/70 mt-2">
                        <p className="text-sm">Weight: {product.weight || "N/A"}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-sm">Qty:</p>
                          <select onChange={e => updateCartItem(product._id,Number(e.target.value))}
                          value={cartItems[product._id]}
                          className="outline-none border border-gray-300 px-2 py-1 text-sm rounded cursor-pointer">
                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9)
                              .fill("")
                              .map((_, index) => (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center">
                    {currency}{product.offerPrice * product.quantity}
                  </p>
                  <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
                    <img src={assets.remove_icon} className="w-6 h-6" alt="remove" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={()=> {navigate("/products");scrollTo(0,0)}} className="group cursor-pointer flex items-center mt-6 sm:mt-8 gap-2 text-pink-500 font-medium text-sm sm:text-base">
            <img className="group-hover:-translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="arrow" />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100/40 border border-gray-300/70 rounded-lg p-4 sm:p-5 lg:sticky lg:top-20 lg:h-fit">
            <h2 className="text-lg sm:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-4 sm:my-5" />

            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-medium uppercase text-gray-700">Delivery Address</p>
              <div className="relative flex justify-between items-start mt-2 gap-2">
                <p className="text-gray-500 text-xs sm:text-sm flex-1">
                  {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}
                </p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-pink-500 hover:underline cursor-pointer text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="absolute top-16 py-1 bg-white border border-gray-300 text-xs sm:text-sm w-full z-10 rounded shadow-lg">
                    {addresses.map((address, index) => (
                      <p
                        key={index}
                        onClick={() => { setSelectedAddress(address); setShowAddress(false); }}
                        className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm"
                      >
                        {address.street}, {address.city}, {address.state}, {address.country}
                      </p>
                    ))}
                    <p
                      onClick={() => navigate("/add-address")}
                      className="text-pink-500 text-center cursor-pointer p-2 hover:bg-pink-500/10 text-xs sm:text-sm font-medium"
                    >
                      Add address
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm font-medium uppercase text-gray-700 mt-4 sm:mt-6">Payment Method</p>

              <select 
                onChange={e => setPaymentOption(e.target.value)} 
                className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded text-sm hover:border-gray-400 focus:ring-1 focus:ring-pink-500 cursor-pointer"
              >
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2 sm:space-y-3 text-sm sm:text-base">
              <p className="flex justify-between">
                <span>Price</span>
                <span className="font-medium">{currency}{getCartAmount()}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-pink-600 font-medium">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span className="font-medium">{currency}{(getCartAmount()*2/100).toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-base sm:text-lg font-medium mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300">
                <span>Total Amount:</span>
                <span>{currency}{(getCartAmount() + getCartAmount()*2/100).toFixed(2)}</span>
              </p>
            </div>

            <button 
              onClick={placeOrder} 
              className="w-full py-2.5 sm:py-3 mt-4 sm:mt-6 cursor-pointer bg-pink-500 text-white font-medium hover:bg-pink-600 transition rounded text-sm sm:text-base active:scale-95"
            >
              {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default Cart;