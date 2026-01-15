import { useAppContext } from "../context/AppContext";
import React from "react";
import { Mail, Lock, User, X } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin,setUser,axios,navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler=async(event)=>{

    try {
    event.preventDefault();
const {data}=await axios.post(`/api/user/${state}`,{
  name,email,password
});


if(data.success){
  navigate('/')
  setUser(data.user)
    setShowUserLogin(false)

}else{
toast.error(data.message)
}

      
    } catch (error) {
toast.error(error.message)
      
    }
 
  }

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
    >
      <form 
      onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-pink-100 p-8 space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowUserLogin(false)}
          type="button"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {state === "login" ? "Welcome Back" : "Join Us"}
            </span>
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {state === "login"
              ? "Sign in to your account"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Name Field - Register Only */}
          {state === "register" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 size-5 text-pink-400 pointer-events-none" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl text-gray-900 placeholder-gray-400 transition duration-200 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  type="text"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-5 text-pink-400 pointer-events-none" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-pink-50 border-2 border-pink-100 rounded-xl text-gray-900 placeholder-gray-400 transition duration-200 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                type="email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 transition duration-200 shadow-lg hover:shadow-pink-500/30"
        >
          {state === "register" ? "Create Account" : "Sign In"}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">
              {state === "login" ? "New here?" : "Already have an account?"}
            </span>
          </div>
        </div>

        {/* Toggle Link */}
        <p className="text-center text-gray-600">
          {state === "register" ? (
            <>
              Already have account?{" "}
              <span
                onClick={() => setState("login")}
                className="font-semibold text-pink-600 hover:text-pink-700 cursor-pointer transition"
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="font-semibold text-pink-600 hover:text-pink-700 cursor-pointer transition"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;