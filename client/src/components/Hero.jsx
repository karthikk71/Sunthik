function Hero() {
  return (
    <div className="bg-orange-100 h-[400px] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-800">
        Welcome to Sunthik
      </h1>

      <p className="mt-4 text-xl text-gray-600">
        Best Deals | Fast Delivery | Trusted Shopping
      </p>

      <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold">
        Shop Now
      </button>
    </div>
  );
}

export default Hero;