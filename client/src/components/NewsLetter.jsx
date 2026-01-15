import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const { axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/contact/subscribe", { email });

      if (data.success) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="mt-24 pb-14 max-w-5xl py-16 md:pl-20 md:w-full mx-2 md:mx-auto p-4 flex flex-col md:flex-row items-center justify-between text-left 
        bg-gradient-to-b from-pink-700 to-pink-900 rounded-2xl md:p-10 text-white">

        <div>
          <p className="text-pink-200">Trusted by 12k+ developers</p>
          <h1 className="text-4xl md:text-[46px] max-md:mt-3 md:leading-[60px] max-w-md font-semibold
            bg-gradient-to-r from-white to-pink-300 text-transparent bg-clip-text">
            Join our newsletter & Stay Updated
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-pink-500 mt-6 md:mt-0 pl-4 h-11 text-sm rounded-full overflow-hidden w-[300px] md:w-auto">

          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none h-11 bg-transparent placeholder-pink-200 text-white flex-1"
          />

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="h-10 mr-1 px-4 md:px-6 rounded-full border border-pink-500 bg-pink-600 hover:bg-pink-500 transition w-[120px] md:w-auto"
          >
            {loading ? "..." : "Subscribe"}
          </button>

        </div>
      </div>
    </>
  );
};

export default NewsLetter;
