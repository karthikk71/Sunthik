import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#131921] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">
            Sunthik
          </h2>
          <p className="mt-4 text-gray-300 leading-7">
            Your trusted online shopping destination for Electronics,
            Fashion, Accessories and much more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-gray-300">
            <Link to="/" className="hover:text-yellow-400">
              Home
            </Link>

            <Link to="/cart" className="hover:text-yellow-400">
              Cart
            </Link>

            <Link to="/wishlist" className="hover:text-yellow-400">
              Wishlist
            </Link>

            <Link to="/orders" className="hover:text-yellow-400">
              Orders
            </Link>
          </div>
        </div>

        {/* Customer */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Customer Service
          </h3>

          <div className="flex flex-col gap-2 text-gray-300">
            <p>Help Center</p>
            <p>Returns</p>
            <p>Shipping</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-2 text-gray-300">
            <p>📧 karthikyadav700@gmail.com</p>
            <p>📞 +91 8328088506 </p>
            <p>📍 Hyderabad, India</p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">
        © 2026 Sunthik. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;