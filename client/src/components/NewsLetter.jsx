import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      alert(error.message);
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

      <div className="w-full px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-pink-700 to-pink-900 rounded-3xl overflow-hidden text-white">
          
          {/* Content Section */}
          <div className="p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <p className="text-xs sm:text-sm text-pink-200 font-medium mb-4">Trusted by 12k+ developers</p>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-8">
              Join our newsletter & <br /> Stay Updated
            </h1>

            {/* Input and Button */}
            <div className="w-full max-w-sm flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                className="w-full h-12 bg-pink-400 rounded-full px-4 placeholder-pink-100 text-white text-sm sm:text-base outline-none"
              />

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full h-12 bg-pink-600 hover:bg-pink-700 rounded-full transition font-semibold text-sm sm:text-base disabled:opacity-70"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
