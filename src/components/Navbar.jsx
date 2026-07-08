import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-7"
        }`}
      >
        <div className="flex w-full items-center justify-between px-6 lg:px-20">
          {/* Logo */}
          <Link
            to="/"
            className={`logo text-xl font-semibold tracking-wide transition-all duration-500 uppercase ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            DORNEE ATELIER
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-10 lg:flex">
            <Link
              to="/"
              className={`group relative text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Home
              <span
                className={`absolute -bottom-2 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-black" : "bg-white"
                }`}
              />
            </Link>
            <Link
              to="/menus"
              className={`group relative text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >Services
              
              <span
                className={`absolute -bottom-2 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-black" : "bg-white"
                }`}
              />
            </Link>
            <Link
              to="/about-us"
              className={`group relative text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              About Us
              <span
                className={`absolute -bottom-2 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-black" : "bg-white"
                }`}
              />
            </Link>
            <Link
              to="/contact"
              className={`group relative text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Contact
              <span
                className={`absolute -bottom-2 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-black" : "bg-white"
                }`}
              />
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-100"
              }`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden transition-colors duration-300 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            {mobileOpen ? (
              <X size={28} className="text-red-600" />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-full bg-white transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium text-black transition-transform duration-300 hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/menus"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium text-black transition-transform duration-300 hover:scale-105"
          >
             Services
          </Link>
          <Link
            to="/about-us"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium text-black transition-transform duration-300 hover:scale-105"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-medium text-black transition-transform duration-300 hover:scale-105"
          >
            Contact
          </Link>

          <button className="mt-4 rounded-full bg-black px-8 py-3 text-white">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;