import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useState } from "react";

const SellerLayout = () => {
    const {axios,navigate,setIsSeller}=useAppContext()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout=async()=>{
        try {
            const {data} = await axios.get('/api/seller/logout')
            if(data.success){
                toast.success(data.message)
                setIsSeller(false); 
                navigate('/')
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 border-b border-gray-300 py-3 bg-white sticky top-0 z-50">
                <Link to='/'>
                    <img src={assets.logo3} alt="logo" className="cursor-pointer w-28 sm:w-32 md:w-38" />
                </Link>
                <div className="flex items-center gap-3 sm:gap-5 text-gray-500">
                    <p className="text-sm sm:text-base hidden sm:block">Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-50 transition'>
                        Logout
                    </button>
                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-gray-600 p-2 text-2xl"
                    >
                        ☰
                    </button>
                </div>
            </div>

            <div className="flex min-h-[calc(100vh-64px)]">
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/40 z-30 md:hidden top-16"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`fixed md:static left-0 top-16 h-[calc(100vh-64px)] w-48 bg-white border-r border-gray-300 transition-transform duration-300 z-40 md:z-auto overflow-y-auto
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <nav className="pt-4 flex flex-col">
                        {sidebarLinks.map((item) => (
                            <NavLink 
                                to={item.path} 
                                key={item.name} 
                                end={item.path === "/seller"}
                                onClick={() => setSidebarOpen(false)}
                                className={({isActive})=> `flex items-center py-3 px-4 gap-3 transition-all
                                    ${isActive ? "border-r-4 bg-pink-500/10 border-pink-500 text-pink-500"
                                        : "hover:bg-gray-100/90 text-gray-700"
                                    }`
                                }
                            >
                                <img src={item.icon} alt="" className="w-5 h-5" />
                                <span className="text-sm">{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 w-full bg-gray-50 overflow-y-auto">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default SellerLayout;