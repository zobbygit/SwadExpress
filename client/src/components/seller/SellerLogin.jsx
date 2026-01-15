import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate,axios,setShowSellerLogin } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const {data}=await axios.post('/api/seller/login',{email,password})
      if(data.success){
        setIsSeller(true)
         setShowSellerLogin(false);
        navigate('/seller')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-4 overflow-hidden">

        {/* Built-in animation styles */}
        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-bg {
            background-size: 300% 300%;
            animation: gradientMove 10s ease infinite;
          }
        `}</style>

        {/* Animated background */}
        <div className="absolute inset-0 animated-bg bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 opacity-30"></div>

        {/* Dark blur overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <form
          onSubmit={onSubmitHandler}
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-pink-100 p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2 pt-2">
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Seller Login
              </span>
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Sign in to your seller account
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-5 text-pink-400 pointer-events-none" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="seller@example.com"
                className="w-full pl-11 pr-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl text-gray-900 placeholder-gray-400 transition duration-200 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                type="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 size-5 text-pink-400 pointer-events-none" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl text-gray-900 placeholder-gray-400 transition duration-200 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                type="password"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 transition duration-200 shadow-lg hover:shadow-pink-500/30"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
