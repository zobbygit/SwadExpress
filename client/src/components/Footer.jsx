import { assets, footerLinks } from "../assets/assets";

const Footer = () => {


    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-32 bg-pink-400/20">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src={assets.logo3} alt="Logo" />
                    <p className="max-w-[410px] mt-6">SwadExpress delivers fresh food and daily essentials right to your doorstep.
Fast, reliable, and packed with authentic taste you’ll love.
Order smart, eat better, and enjoy express delivery every time.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
          <p className="py-4 text-center text-sm md:text-base text-gray-800">
  {new Date().getFullYear()} © <a href="/" className="hover:text-gray-400 transition">SwadExpress</a>. All rights reserved.
</p>

        </div>
    );
};
export default Footer;