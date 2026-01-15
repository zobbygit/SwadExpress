import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({ success: false, message: "All fields required" });
    }

    await Contact.create({ name, email, message });

    return res.json({ success: true, message: "Message received" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    await Contact.create({
      name: "Newsletter",
      email,
      message: "Subscribed to newsletter",
    });

    return res.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};