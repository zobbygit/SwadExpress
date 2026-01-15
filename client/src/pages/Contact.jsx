import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Contact = () => {
  const { axios } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/contact/send", form);

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left */}
        <div className="bg-pink-500 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-pink-100 mb-8">
            Have a question or need support? Send us a message.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3"><Phone /> +91 7003026496</div>
            <div className="flex items-center gap-3"><Mail /> iamzohaib777@gmail.com.com</div>
            <div className="flex items-center gap-3"><MapPin /> Kolkata, India</div>
          </div>
        </div>

        {/* Right */}
        <div className="p-10">
          <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border px-4 py-2 rounded-lg"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="4"
              required
              className="w-full border px-4 py-2 rounded-lg resize-none"
            />

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2.5 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
