import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#131921] via-[#232F3E] to-[#37475A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to <span className="text-yellow-400">Sunthik</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Shop the latest electronics, fashion, accessories and much more at
            amazing prices. Fast delivery, secure payments and trusted quality.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/products"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/cart"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              View Cart
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700"
            alt="Shopping"
            className="rounded-2xl shadow-2xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;