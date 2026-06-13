import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0A0E1A] to-[#04060C] text-neutral-300 font-sans py-16 px-6 md:px-12 border-t border-white/5 relative overflow-hidden select-none">
      
      {/* Decorative luxury abstract background glowing layers to match fluid marble feel */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-950/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 relative z-10">
        
        {/* Left Column: Monogram Logo (White) and Description */}
        <div className="col-span-1 md:col-span-4 space-y-5 text-left">
          <div className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg className="w-20 h-14 text-white cursor-pointer hover:scale-[1.02] transition-transform" viewBox="0 0 100 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* D Path - Outer Loop */}
              <path d="M12 8H36C52 8 60 18 60 32C60 46 52 56 36 56H12V8Z" stroke="currentColor" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter"/>
              {/* Inner loop of D */}
              <path d="M24 20H34C40 20 44 24 44 32C44 40 40 44 34 44H24V20Z" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"/>
              {/* C Path interlocking */}
              <path d="M72 18C66 12 56 12 50 18C42 26 42 38 50 46C56 52 66 52 72 46" stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
            </svg>
          </div>
          <p className="text-[13px] text-neutral-400 font-light leading-relaxed max-w-xs pr-4">
            Discover a world of exquisite fragrances and luxury essentials. Curated for the discerning individual.
          </p>
        </div>

        {/* Middle Column: Company Links */}
        <div className="col-span-1 md:col-span-3 space-y-4 text-left">
          <h4 className="text-[14px] font-bold text-white tracking-wide uppercase">
            Company
          </h4>
          <ul className="space-y-2.5 text-[13px] text-neutral-400 font-semibold">
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => alert("Contact support at assistance@dilkaperfumes.com")} className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#returns" className="hover:text-white transition-colors">
                Return Policy
              </a>
            </li>
            <li>
              <a href="#refund" className="hover:text-white transition-colors">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Newsletter & Social */}
        <div className="col-span-1 md:col-span-5 space-y-4 text-left">
          <h4 className="text-[14px] font-bold text-white tracking-wide uppercase">
            Newsletter
          </h4>
          <p className="text-[13px] text-neutral-400 font-medium">
            Stay updated with our latest arrivals and offers.
          </p>

          {/* Email Input & Subscribe Button */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-[#151926] border border-neutral-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all font-sans"
            />
            <button
              onClick={() => alert("Thank you for subscribing to our newsletter!")}
              className="px-6 py-3 bg-white text-[#0A0E1A] font-extrabold text-sm rounded-full hover:bg-neutral-200 transition-colors shadow-md whitespace-nowrap cursor-pointer"
            >
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-5 pt-4 text-neutral-400">
            <a href="#facebook" className="hover:text-white transition-all duration-200 transform hover:scale-110">
              <FiFacebook size={18} />
            </a>
            <a href="#instagram" className="hover:text-white transition-all duration-200 transform hover:scale-110">
              <FiInstagram size={18} />
            </a>
            <a href="#twitter" className="hover:text-white transition-all duration-200 transform hover:scale-110">
              <FiTwitter size={18} />
            </a>
            <a href="#linkedin" className="hover:text-white transition-all duration-200 transform hover:scale-110">
              <FiLinkedin size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto my-8 border-t border-neutral-800/80"></div>

      {/* Bottom Copyright & Payments */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-400 text-xs font-semibold relative z-10 pr-2">
        <div>
          &copy; {new Date().getFullYear()} Dilka Perfumes. All rights reserved.
        </div>

        {/* Payment Methods */}
        <div className="flex items-center space-x-2.5">
          <span className="text-[12px] text-neutral-500 font-bold uppercase tracking-wider mr-1.5">
            Payment Method :
          </span>
          
          {/* Tabby Logo Badge */}
          <div className="bg-[#ADF5D1] text-[#0A0E1A] px-2.5 py-1 rounded font-extrabold text-[9px] uppercase tracking-wider flex items-center justify-center border border-emerald-300 shadow-sm select-none">
            tabby
          </div>

          {/* Tamara Logo Badge */}
          <div className="bg-gradient-to-r from-[#FBC38D] to-[#FCA5A5] text-[#1E1B4B] px-2 py-1 rounded font-extrabold text-[9px] uppercase tracking-wider flex items-center justify-center border border-amber-200 shadow-sm select-none">
            tamara
          </div>

          {/* COD Logo Badge */}
          <div className="bg-[#EF4444]/95 text-white px-2 py-1 rounded font-extrabold text-[9px] uppercase tracking-widest flex items-center justify-center border border-red-400 shadow-sm select-none">
            COD
          </div>
        </div>
      </div>

    </footer>
  );
}
