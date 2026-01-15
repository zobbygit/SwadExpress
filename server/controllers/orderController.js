import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe"
import User from "../models/User.js";
/* ======================
   PLACE ORDER (COD)
====================== */
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;              // ✅ from auth middleware
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate amount safely
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // 2% COD charge
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false
    });

    return res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};


export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;              // ✅ from auth middleware
    const { items, address } = req.body;
    const {origin}=req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }
let productData=[]
    // Calculate amount safely
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
  return res.json({ success: false, message: "Product not found" });
}
productData.push({
  name:product.name,
  price:product.offerPrice,
  quantity:item.quantity,
})

      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // 2% COD charge

   const order= await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
  
    });

//Stripe
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const line_items = productData.map(item => ({
  price_data: {
    currency: "inr",
    product_data: { name: item.name },
    unit_amount: Math.round(item.price * 1.02 * 100), // 2% fee
  },
  quantity: item.quantity,
}));

const session = await stripeInstance.checkout.sessions.create({
  line_items,
  mode: "payment",
  success_url: `${origin}/loader?next=my-orders`,
  cancel_url: `${origin}/cart`,
  metadata: {
    orderId: order._id.toString(),
    userId,
  },
});
    return res.json({ success: true,url:session.url});

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//stripe webhooks to verify payments and actions

export const stripeWebhooks=async(request,response)=>{
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const sig=request.headers["stripe-signature"]
let event;
try {
  event=stripeInstance.webhooks.constructEvent(
    request.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  )
} catch (error) {
  response.status(400).send(`Webhook Error: &{error.message}`)
}


//handle event

switch (event.type) {
  case "payment_intent.succeeded":{
    const paymentIntent=event.data.object;
    const paymentIntentId=paymentIntent.id;
const session=await stripeInstance.checkout.sessions.list({
  payment_intent:paymentIntentId,
});
const {orderId,userId}=session.data[0].metadata
await Order.findByIdAndUpdate(orderId,{isPaid:true})
await User.findByIdAndUpdate(userId,{cartItems:{}})
break;

  }
      case "payment_intent.failed":{
    const paymentIntent=event.data.object;
    const paymentIntentId=paymentIntent.id;
const session=await stripeInstance.checkout.sessions.list({
  payment_intent:paymentIntentId,
});
const {orderId}=session.data[0].metadata
await Order.findByIdAndDelete(orderId)
    break;

      

}

  default:
    console.error(`Unhandled event type &{event.type}`)
    break;
}
response.json({received:true})
}

/* ======================
   USER ORDERS
====================== */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;     // ✅ secure

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

/* ======================
   ALL ORDERS (SELLER)
====================== */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};
